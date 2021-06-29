import {Component, EventEmitter, OnInit, Input, Output, SimpleChanges, OnChanges, SimpleChange} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
  AbstractControl} from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {
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
    }
  };

  private _showProgressBar: boolean;

  public history = {};
  public test = {};
  public disable_check_button = false;
  public newForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

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
      nameservers: new FormArray([]),
      ds_info: new FormArray([]),
    }, {
      validators: FormComponent.atLeastOneProtocolValidator
    });

    this.addNewRow('nameservers');
    this.addNewRow('ds_info');
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
    if (!errors) {
      return;
    }
    this.disable_check_button = false;
    for (let error of errors) {
      let path = error.path.split('/');
      path.shift(); // First element is ""
      let currentForm: AbstractControl = this.newForm;
      for (let segment of path) {
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
      control.push(this.formBuilder.group(value, this.formOpts[formName]));
    } else {
      control.push(this.formBuilder.group(this.formConfig[formName], this.formOpts[formName]));
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

  private displayDataFromParent() {
    this.domain.markAsTouched();
    if (this.domain.invalid) {
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
  }

  public toggleOptions() {
    this.is_advanced_options_enabled = !this.is_advanced_options_enabled
    this.onOpenOptions.emit(this.is_advanced_options_enabled);
  }
}
