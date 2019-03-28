import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
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
      itemRows: this.formBuilder.array([this.initItemRows(this.NSFormConfig)]) // here
    });

    this.digestForm = this.formBuilder.group({
      itemRows: this.formBuilder.array([this.initItemRows(this.digestFormConfig)]) // here
    });
  }

  @Input()
  set parentData(data: object) {
    if (this.NSForm) {
      this.deleteRow('NSForm', 0);
      data['ns_list'].map(ns => {
        this.addNewRow('NSForm', ns);
      });

      this.deleteRow('digestForm', 0);
      data['ds_list'].map(digest => {
        this.addNewRow('digestForm', digest);
      });
    }
  }

  public addNewRow(form, value= null) {
    const control = <FormArray>this[form].controls['itemRows'];
    if (value !== null) {
      control.push(this.initItemRows(value));
    } else if (form === 'NSForm') {
      control.push(this.initItemRows(this.NSFormConfig));
    } else if (form === 'digestForm') {
      control.push(this.initItemRows(this.digestFormConfig));
    }
  }

  private displayDataFromParent() {
    this.onfetchFromParent.emit(this.form['domain']);
  }

  public deleteRow(form, index: number) {
    const control = <FormArray>this[form].controls['itemRows'];
    control.removeAt(index);
  }

  public initItemRows(value) {
    return this.formBuilder.group(value);
  }

  private mapItems(items) {
    const selectedItems = items.filter((l) => l.checked).map((l) => l.key);
    return selectedItems.length ? selectedItems : null;
  }

  public runDomainCheck() {
    if (this.is_advanced_options_enabled) {
      this.form['nameservers'] = (this.NSForm.value.itemRows[0].ip !== '' ? this.NSForm.value.itemRows : []);
      this.form['ds_info'] = (this.digestForm.value.itemRows[0].keytag !== '' ? this.digestForm.value.itemRows : []);
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
}
