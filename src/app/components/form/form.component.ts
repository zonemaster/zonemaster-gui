import {Component, EventEmitter, OnInit, Input, Output, SimpleChanges, OnChanges, SimpleChange} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn} from '@angular/forms';
import {AlertService} from '../../services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { deepStrictEqual } from 'assert';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {
  @Input() is_advanced_options_enabled;
  @Input() domain_check_progression;
  //@Input() showProgressBar;
  @Input() toggleFinished;
  @Input() profiles;

  @Output() onDomainCheck = new EventEmitter<object>();
  @Output() onfetchFromParent = new EventEmitter<string>();
  @Output() onOpenOptions = new EventEmitter<boolean>();

  private formConfig = {
    'nameservers': () => {
      return new FormGroup({
        ns: new FormControl(''),
        ip: new FormControl('')
      })
    },
    'ds_info': () => {
      return new FormGroup({
        keytag: new FormControl(''),
        algorithm: new FormControl(-1),
        digtype: new FormControl(-1),
        digest: new FormControl('')
      }, {
        validators: FormComponent.allOrNoneDSFieldsValidator
      })
    }
  }

  private _showProgressBar: boolean;

  public history = {};
  public test = {};
  public disable_check_button = false;
  public newForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private alertService: AlertService,
    private translateService: TranslateService) {}

  ngOnInit() {
    this.generate_form();
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    if ('toggleFinished' in changes) {
      this.resetFullForm();
    }
  }

  private static atLeastOneProtocolValidator(control: AbstractControl) {
    const ipv4_enabled = control.get('ipv4');
    const ipv6_enabled = control.get('ipv6');
    return (ipv4_enabled && ipv4_enabled.value === true) || (ipv6_enabled && ipv6_enabled.value === true) ? null : {
      noProtocol: true
    };
  };

  private static allOrNoneDSFieldsValidator(control: AbstractControl) {
    const keytag = control.get('keytag');
    const algorithm = control.get('algorithm');
    const digest = control.get('digest');
    const digtype = control.get('digtype');

    if (keytag.value || digest.value || (algorithm.value > -1) || (digtype.value > -1)) {
      if (!keytag.value) keytag.setErrors({required: true});
      if (!digest.value) digest.setErrors({required: true});
      if (algorithm.value <= 0) algorithm.setErrors({required: true});
      if (digtype.value <= 0) digtype.setErrors({required: true});
    } else { // reset errors on children
      keytag.setErrors(null);
      digest.setErrors(null);
      algorithm.setErrors(null);
      digtype.setErrors(null);
      control.markAsUntouched();
      control.markAsPristine();
    }

    return null;
  };


  public generate_form() {
    this.newForm = new FormGroup({
      domain: new FormControl('', Validators.required),
      ipv4: new FormControl(true),
      ipv6: new FormControl(true),
      profile: new FormControl(this.profiles[0] || 'default'),
      nameservers: new FormArray([
        this.formConfig['nameservers']()
      ]),
      ds_info: new FormArray([
        this.formConfig['ds_info']()
      ]),
    }, {
      validators: FormComponent.atLeastOneProtocolValidator
    });
  }

  get domain() { return this.newForm.get('domain'); }

  @Input()
  set parentData(data: object) {
    this.disable_check_button = false;
    if (this.newForm) {
      this.deleteRow('nameservers', -1);
      data['ns_list'].forEach(ns => {
        this.addNewRow('nameservers', ns);
      });

      this.deleteRow('ds_info', -1);
      data['ds_list'].forEach(digest => {
        this.addNewRow('ds_info', digest);
      });
    }
  }

  @Input()
  set formError(errors: Array<any>) {
    console.log('FORM ERROR', errors);
    if (!errors) {
      return;
    }
    for (let error of errors) {
      let path = error.path.split('/');
      path.shift(); // First element is ""
      console.log(path);
      let currentForm: AbstractControl = this.newForm;
      for (let segment of path) {
        console.log(segment);
        currentForm = currentForm.get(segment);
      }
      currentForm.setErrors({'serverError': error.message})
    }
  }

  @Input()
  set showProgressBar(show: boolean) {
    this._showProgressBar = show;
    if (!this.newForm) return;
    this.disableForm(show);
  }

  get showProgressBar() {
    return this._showProgressBar;
  }

  public resetDomainForm() {
    this.newForm.controls.domain.reset('');
  }

  public resetFullForm() {
    this.generate_form();
  }


  public addNewRow(formName, value = null) {
    const control = <FormArray>this.newForm.get(formName);

    if (value !== null) {
      control.push(this.formBuilder.group(value));
    } else {
      control.push(this.formConfig[formName]());
    }
  }

  public deleteRow(formName, index: number) {
    const control = <FormArray>this.newForm.get(formName);
    if (index === -1) {
      for ( let i = control.length - 1; i >= 0; i--) {
        control.removeAt(i);
      }
    } else {
      control.removeAt(index);
      if (control.length === 0) {
        this.addNewRow(formName);
      }
    }

  }

  public initItemRows(value) {
    return this.formBuilder.group(value);
  }

  private mapItems(items) {
    const selectedItems = items.filter((l) => l.checked).map((l) => l.key);
    return selectedItems.length ? selectedItems : null;
  }

  private displayDataFromParent() {

    if (this.newForm.value.domain === '') {
      this.translateService.get('Domain name required').subscribe((res: string) => {
        this.alertService.error(res);
      });
      return false;
    }

    this.disable_check_button = true;
    this.onfetchFromParent.emit(this.newForm.value.domain);
  }

  private disableForm(disable = true) {
    this.disable_check_button = disable;
    if (disable) {
      this.domain.disable();
    } else {
      this.domain.enable();
    }
  }

  public runDomainCheck() {
    this.newForm.markAllAsTouched();
    let param = this.newForm.value;

    param.nameservers = param.nameservers
      .filter(ns => ns.ip || ns.ns)
      .map(x => {
        if (!x.ip) {
          delete x.ip;
        }
        return x;
      });

    param.ds_info = param.ds_info
      .filter(ds => ds.keytag || ds.algorithm > 0 || ds.digtype > 0 || ds.digest)
      .map(ds => {return {
        keytag: Number(ds.keytag),
        algorithm: Number(ds.algorithm),
        digtype: Number(ds.digtype),
        digest: ds.digest
      }});

    if (this.newForm.valid) {
      this.onDomainCheck.emit(param);
    }

/*
    this.form['ds_info'] = [];
    this.form['nameservers'] = [];

    if (this.NSForm.value.itemRows.length > 0 && this.NSForm.value.itemRows[0].ns !== '') {
      this.form['nameservers'] = this.NSForm.value.itemRows.map(x => {
        if (!x["ip"]) {
          delete x["ip"];
        }
        return x;
      });
    }

    if (this.digestForm.value.itemRows.length > 0 && this.digestForm.value.itemRows[0].keytag !== '' ) {
      if (this.digestForm.value.itemRows[0].digest !== '' ) {
        this.form['ds_info'] = this.digestForm.value.itemRows.map(x => {
          x['keytag'] = Number(x['keytag']);
          x['algorithm'] = Number(x['algorithm']);
          x['digtype'] = Number(x['digtype']);
          return x;
        });
      } else {
        this.translateService.get('Digest required').subscribe((res: string) => {
          this.alertService.error(res);
        });
      }
    } else if (this.digestForm.value.itemRows.length > 0 && this.digestForm.value.itemRows[0].digest !== '') {
      this.translateService.get('Keytag required').subscribe((res: string) => {
        this.alertService.error(res);
      });
      return false;
    }

    let atLeastOneChecked = false;
    const protocols = this.checkboxForm.value.items;
    for (const el of protocols) {
      this.form[el.key] = el.checked;
      atLeastOneChecked += el.checked;
    }

    if (this.form['domain'] === '') {
      this.translateService.get('Domain name required').subscribe((res: string) => {
        this.alertService.error(res);
      });
      return false;
    } else if (!atLeastOneChecked) {
      this.translateService.get('Choose at least one protocol').subscribe((res: string) => {
        this.alertService.error(res);
      });
    }*/
  }

  public toggleOptions() {
    this.is_advanced_options_enabled = !this.is_advanced_options_enabled
    this.onOpenOptions.emit(this.is_advanced_options_enabled);
  }
}
