import {Component, EventEmitter, OnInit, Input, Output, SimpleChanges, OnChanges} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators } from '@angular/forms';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() is_advanced_options_enabled;
  @Input() domain_check_progression;
  @Input() showProgressBar;
  @Input() profiles;

  @Output() onDomainCheck = new EventEmitter<object>();
  @Output() onfetchFromParent = new EventEmitter<string>();
  @Output() onOpenOptions = new EventEmitter<boolean>();

  private NSFormConfig = {
    ns: [''],
    ip: ['']
  };
  private digestFormConfig = {
    keytag: [''],
    algorithm: [''],
    digtype: [''],
    digest: ['']
  };
  public NSForm: FormGroup;
  public digestForm: FormGroup;
  public ns_list;
  public ds_list;
  public history = {};
  public test = {};
  public form = {ipv4: true, ipv6: true, profile: 'default', domain: ''};
  public checkboxForm: FormGroup;
  public disable_check_button = false;

  constructor(private formBuilder: FormBuilder, private alertService: AlertService) {}

  ngOnInit() {
    const group = [];

    group.push(new FormGroup({
      key: new FormControl('ipv4'),
      value: new FormControl('IPv4'),
      checked: new FormControl(true)
    }));
    group.push(new FormGroup({
      key: new FormControl('ipv6'),
      value: new FormControl('IPv6'),
      checked: new FormControl(true)
    }));

    const formControlArray = new FormArray(group);

    this.checkboxForm = new FormGroup({
      items: formControlArray,
      selectedItems: new FormControl(this.mapItems(formControlArray.value), Validators.required)
    });

    formControlArray.valueChanges.subscribe((v) => {
      this.checkboxForm.controls['selectedItems'].setValue(this.mapItems(v));
    });

    this.NSForm = this.formBuilder.group({
      itemRows: this.formBuilder.array([this.initItemRows(this.NSFormConfig)])
    });

    this.digestForm = this.formBuilder.group({
      itemRows: this.formBuilder.array([this.initItemRows(this.digestFormConfig)])
    });
  }

  @Input()
  set parentData(data: object) {
    this.disable_check_button = false;
    if (this.NSForm) {
      this.deleteRow('NSForm', -1);
      data['ns_list'].map(ns => {
        this.addNewRow('NSForm', ns);
      });

      this.deleteRow('digestForm', -1);
      data['ds_list'].map(digest => {
        this.addNewRow('digestForm', digest);
      });
    }
  }

  public addNewRow(form, value = null) {
    const control = <FormArray>this[form].controls['itemRows'];

    if (value !== null) {
      control.push(this.initItemRows(value));
    } else if (form === 'NSForm') {
      control.push(this.initItemRows(this.NSFormConfig));
    } else if (form === 'digestForm') {
      control.push(this.initItemRows(this.digestFormConfig));
    }
  }

  public deleteRow(form, index: number) {
    const control = <FormArray>this[form].controls['itemRows'];
    if (index === -1) {
      console.log(control.length);
      for ( let i = control.length - 1; i >= 0; i--) {
        control.removeAt(i);
      }
    } else {
      control.removeAt(index);
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

    if (this.form['domain'] === '') {
      this.alertService.error('Domain name required');
      return false;
    }

    this.disable_check_button = true;
    this.onfetchFromParent.emit(this.form['domain']);
  }

  public runDomainCheck() {

    this.form['ds_info'] = [];
    this.form['nameservers'] = [];

    if (this.NSForm.value.itemRows.length > 0 && this.NSForm.value.itemRows[0].name !== '') {
      this.form['nameservers'] = this.NSForm.value.itemRows;
    }

    if (this.digestForm.value.itemRows.length > 0 && this.digestForm.value.itemRows[0].keytag !== '' ) {
      if (this.digestForm.value.itemRows[0].digest !== '' ) {
        this.form['ds_info'] = this.digestForm.value.itemRows;
      } else {
        this.alertService.error('Digest required');
      }
    } else if (this.digestForm.value.itemRows.length > 0 && this.digestForm.value.itemRows[0].digest !== '') {
      this.alertService.error('Keytag required');
    }

    let atLeastOneChecked = false;
    const protocols = this.checkboxForm.value.items;
    for (const el of protocols) {
      this.form[el.key] = el.checked;
      atLeastOneChecked += el.checked;
    }

    if (this.form['domain'] === '') {
      this.alertService.error('Domain name required');
      return false;
    } else if (!atLeastOneChecked) {
      this.alertService.error('Choose at least one protocol');
    }

    this.onDomainCheck.emit(this.form);
  }

  public toggleOptions() {
    this.is_advanced_options_enabled = !this.is_advanced_options_enabled
    this.onOpenOptions.emit(this.is_advanced_options_enabled);
  }
}
