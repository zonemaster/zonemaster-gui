import {Component, EventEmitter, OnInit, Input, Output, SimpleChanges, OnChanges, SimpleChange, OnDestroy} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
  AbstractControl} from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() is_advanced_options_enabled;
  @Input() domain_check_progression;
  @Input() toggleFinished;
  @Input() profiles;

  @Output() onDomainCheck = new EventEmitter<object>();
  @Output() onfetchFromParent = new EventEmitter<string>();
  @Output() onOpenOptions = new EventEmitter<boolean>();

  private formConfig = {
    'nameservers': {
        ns: '',
        ip: ''
    },
    'ds_info': {
      keytag: '',
      algorithm: -1,
      digtype: -1,
      digest: ''
    }
  };

  private formOpts = {
    'ds_info': {
      validators: FormComponent.allOrNoneDSFieldsValidator
    },
    'nameservers':  {
      validators: FormComponent.nsRequiredValidator
    }
  };

  private _showProgressBar: boolean;
  private langChangeSubscription: Subscription;

  public history = {};
  public test = {};
  public disable_check_button = false;
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, private translateService: TranslateService) {}

  ngOnInit() {
    this.langChangeSubscription = this.translateService.onLangChange.subscribe((_: LangChangeEvent) => {
      if (this.form.touched) {
        this.runDomainCheck(false);
      }
    });
    this.generate_form();
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    if ('toggleFinished' in changes) {
      this.resetFullForm();
    }
  }

  ngOnDestroy() {
    this.langChangeSubscription.unsubscribe();
  }

  private static atLeastOneProtocolValidator(control: AbstractControl) {
    const ipv4_disabled = control.get('disable_ipv4');
    const ipv6_disabled = control.get('disable_ipv6');
    return (ipv4_disabled && ipv4_disabled.value === true) && (ipv6_disabled && ipv6_disabled.value === true) ? {
      noProtocol: true
    } : null;
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

  private static nsRequiredValidator(control: AbstractControl) {
    const ns = control.get('ns');
    const ip = control.get('ip');
    if (ip.value && !ns.value)  {
      return ns.setErrors({ required: true });
    } else if (!ip.value && !ns.value) { // reset errros on children
      ns.setErrors(null);
      control.markAsUntouched();
      control.markAsPristine();
    }
    return  null;
  };

  public generate_form() {
    this.form = new FormGroup({
      domain: new FormControl('', Validators.required),
      disable_ipv4: new FormControl(false),
      disable_ipv6: new FormControl(false),
      profile: new FormControl(this.profiles[0] || 'default'),
      nameservers: new FormArray([]),
      ds_info: new FormArray([]),
    }, {
      validators: FormComponent.atLeastOneProtocolValidator
    });

    this.addNewRow('nameservers');
    this.addNewRow('ds_info');
  }

  get domain() { return this.form.get('domain'); }

  @Input()
  set parentData(data: object) {
    this.disable_check_button = false;
    if (this.form) {
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
    if (!errors) {
      return;
    }
    this.disable_check_button = false;
    for (let error of errors) {
      let path = error.path.split('/');
      path.shift(); // First element is ""
      let currentForm: AbstractControl = this.form;
      for (let segment of path) {
        currentForm = currentForm.get(segment);
      }
      currentForm.setErrors({'serverError': error.message})
    }
  }

  @Input()
  set showProgressBar(show: boolean) {
    this._showProgressBar = show;
    if (!this.form) return;
    this.disableForm(show);
  }

  get showProgressBar() {
    return this._showProgressBar;
  }

  public resetDomainForm() {
    this.form.controls.domain.reset('');
  }

  public resetFullForm() {
    this.generate_form();
  }

  public addNewRow(formName, value = null) {
    const control = <FormArray>this.form.get(formName);

    if (value !== null) {
      control.push(this.formBuilder.group(value, this.formOpts[formName]));
    } else {
      control.push(this.formBuilder.group(this.formConfig[formName], this.formOpts[formName]));
    }
  }

  public deleteRow(formName, index: number) {
    const control = <FormArray>this.form.get(formName);
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

  private displayDataFromParent() {
    this.domain.markAsTouched();
    if (this.domain.invalid) {
      return false;
    }

    this.disable_check_button = true;
    this.onfetchFromParent.emit(this.form.value.domain);
  }

  private disableForm(disable = true) {
    this.disable_check_button = disable;
    if (disable) {
      this.domain.disable();
    } else {
      this.domain.enable();
    }
  }

  public runDomainCheck(submitValid = true) {
    this.form.markAllAsTouched();
    let param = this.form.value;

    if (param.ipv4 === true) delete param.ipv4;

    if (param.disable_ipv4) param.ipv4 = false;
    if (param.disable_ipv6) param.ipv6 = false;
    delete param.disable_ipv4;
    delete param.disable_ipv6;

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

    if (submitValid == this.form.valid) {
      this.onDomainCheck.emit(param);
    }
  }

  public toggleOptions() {
    this.is_advanced_options_enabled = !this.is_advanced_options_enabled
    this.onOpenOptions.emit(this.is_advanced_options_enabled);
  }
}
