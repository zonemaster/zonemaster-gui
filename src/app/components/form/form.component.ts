import {
<<<<<<< HEAD
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators } from '@angular/forms';
import {AlertService} from '../../services/alert.service';
import { TranslateService } from '@ngx-translate/core';
=======
    Component,
    EventEmitter,
    OnInit,
    Input,
    Output,
    SimpleChanges,
    OnChanges,
    SimpleChange,
} from '@angular/core';
import {
    FormGroup,
    FormControl,
    FormArray,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { AlertService } from '../../services/alert.service';
>>>>>>> 8affa5bbcc1f2dffd9ecdbe77f247d20dfa99e53

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnChanges {
<<<<<<< HEAD
<<<<<<< bb5caba10031bf7219d844076d50f5bd48eac8e4
  @Input() is_advanced_options_enabled;
  @Input() domain_check_progression;
  @Input() showProgressBar;
  @Input() toggleFinished;
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

  constructor(private formBuilder: FormBuilder, private alertService: AlertService,
    private translateService: TranslateService) {}

  ngOnInit() {
    this.generate_form();
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    if ('toggleFinished' in changes) {
      this.resetFullForm();
=======
=======
>>>>>>> 8affa5bbcc1f2dffd9ecdbe77f247d20dfa99e53
    @Input() is_advanced_options_enabled;
    @Input() domain_check_progression;
    @Input() showProgressBar;
    @Input() toggleFinished;
    @Input() profiles;

    @Output() eventDomainCheck = new EventEmitter<object>();
    @Output() eventFetchFromParent = new EventEmitter<string>();
    @Output() eventOpenOptions = new EventEmitter<boolean>();

    private NSFormConfig = {
        ns: [''],
        ip: [''],
    };
    private digestFormConfig = {
        keytag: [''],
        algorithm: [''],
        digtype: [''],
        digest: [''],
    };
    public NSForm: FormGroup;
    public digestForm: FormGroup;
    public ns_list;
    public ds_list;
    public history = {};
    public test = {};
    public form = { ipv4: true, ipv6: true, profile: 'default', domain: '' };
    public checkboxForm: FormGroup;
    public disable_check_button = false;

    constructor(
        private formBuilder: FormBuilder,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.generate_form();
<<<<<<< HEAD
>>>>>>> fix(linter): align code with linters rules
    }
  }

  public generate_form() {

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
=======
>>>>>>> 8affa5bbcc1f2dffd9ecdbe77f247d20dfa99e53
    }

    ngOnChanges(changes: { [property: string]: SimpleChange }) {
        if ('toggleFinished' in changes) {
            this.resetFullForm();
        }
    }

    public generate_form() {
        const group = [];

        group.push(
            new FormGroup({
                key: new FormControl('ipv4'),
                value: new FormControl('IPv4'),
                checked: new FormControl(true),
            })
        );
        group.push(
            new FormGroup({
                key: new FormControl('ipv6'),
                value: new FormControl('IPv6'),
                checked: new FormControl(true),
            })
        );

        const formControlArray = new FormArray(group);

        this.checkboxForm = new FormGroup({
            items: formControlArray,
            selectedItems: new FormControl(
                this.mapItems(formControlArray.value),
                Validators.required
            ),
        });

        formControlArray.valueChanges.subscribe((v) => {
            this.checkboxForm.controls['selectedItems'].setValue(
                this.mapItems(v)
            );
        });

        this.NSForm = this.formBuilder.group({
            itemRows: this.formBuilder.array([
                this.initItemRows(this.NSFormConfig),
            ]),
        });

        this.digestForm = this.formBuilder.group({
            itemRows: this.formBuilder.array([
                this.initItemRows(this.digestFormConfig),
            ]),
        });
    }

<<<<<<< HEAD
  }

<<<<<<< bb5caba10031bf7219d844076d50f5bd48eac8e4
  public initItemRows(value) {
    return this.formBuilder.group(value);
  }
=======
    public addNewRow(form, value = null) {
        const control = this[form].controls['itemRows'] as FormArray;
>>>>>>> fix(linter): align code with linters rules

  private mapItems(items) {
    const selectedItems = items.filter((l) => l.checked).map((l) => l.key);
    return selectedItems.length ? selectedItems : null;
  }

<<<<<<< bb5caba10031bf7219d844076d50f5bd48eac8e4
  private displayDataFromParent() {
=======
    public deleteRow(form, index: number) {
        const control = this[form].controls['itemRows'] as FormArray;
        if (index === -1) {
            for (let i = control.length - 1; i >= 0; i--) {
                control.removeAt(i);
            }
        } else {
            control.removeAt(index);
            if (control.length === 0) {
                this.addNewRow(form);
            }
        }
    }
>>>>>>> fix(linter): align code with linters rules

    if (this.form['domain'] === '') {
      this.translateService.get('Domain name required').subscribe((res: string) => {
        this.alertService.error(res);
      });
      return false;
=======
    @Input()
    set parentData(data: object) {
        this.disable_check_button = false;
        if (this.NSForm) {
            this.deleteRow('NSForm', -1);
            data['ns_list'].map((ns) => {
                this.addNewRow('NSForm', ns);
            });

            this.deleteRow('digestForm', -1);
            data['ds_list'].map((digest) => {
                this.addNewRow('digestForm', digest);
            });
        }
    }

    public resetDomainForm() {
        this.form['domain'] = '';
>>>>>>> 8affa5bbcc1f2dffd9ecdbe77f247d20dfa99e53
    }

    public resetFullForm() {
        this.resetDomainForm();
        this.generate_form();
    }

    public addNewRow(form, value = null) {
        const control = this[form].controls['itemRows'] as FormArray;

        if (value !== null) {
            control.push(this.initItemRows(value));
        } else if (form === 'NSForm') {
            control.push(this.initItemRows(this.NSFormConfig));
        } else if (form === 'digestForm') {
            control.push(this.initItemRows(this.digestFormConfig));
        }
    }

<<<<<<< HEAD
<<<<<<< bb5caba10031bf7219d844076d50f5bd48eac8e4
    if (this.NSForm.value.itemRows.length > 0 && this.NSForm.value.itemRows[0].ns !== '') {
      this.form['nameservers'] = this.NSForm.value.itemRows;
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
    }

    let atLeastOneChecked = false;
    const protocols = this.checkboxForm.value.items;
    for (const el of protocols) {
      this.form[el.key] = el.checked;
      atLeastOneChecked += el.checked;
=======
        this.disable_check_button = true;
        this.eventFetchFromParent.emit(this.form['domain']);
    }

    public runDomainCheck() {
        this.form['ds_info'] = [];
        this.form['nameservers'] = [];

        if (
            this.NSForm.value.itemRows.length > 0 &&
            this.NSForm.value.itemRows[0].ns !== ''
        ) {
            this.form['nameservers'] = this.NSForm.value.itemRows;
        }

        if (
            this.digestForm.value.itemRows.length > 0 &&
            this.digestForm.value.itemRows[0].keytag !== ''
        ) {
            if (this.digestForm.value.itemRows[0].digest !== '') {
                this.form['ds_info'] = this.digestForm.value.itemRows.map(
                    (x) => {
                        x['keytag'] = Number(x['keytag']);
                        x['algorithm'] = Number(x['algorithm']);
                        x['digtype'] = Number(x['digtype']);
                        return x;
                    }
                );
            } else {
                this.alertService.error('Digest required');
            }
        } else if (
            this.digestForm.value.itemRows.length > 0 &&
            this.digestForm.value.itemRows[0].digest !== ''
        ) {
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

        this.eventDomainCheck.emit(this.form);
    }

    public toggleOptions() {
        this.is_advanced_options_enabled = !this.is_advanced_options_enabled;
        this.eventOpenOptions.emit(this.is_advanced_options_enabled);
>>>>>>> fix(linter): align code with linters rules
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
=======
    public deleteRow(form, index: number) {
        const control = this[form].controls['itemRows'] as FormArray;
        if (index === -1) {
            for (let i = control.length - 1; i >= 0; i--) {
                control.removeAt(i);
            }
        } else {
            control.removeAt(index);
            if (control.length === 0) {
                this.addNewRow(form);
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
        if (this.form['domain'] === '') {
            this.alertService.error('Domain name required');
            return false;
        }

        this.disable_check_button = true;
        this.eventFetchFromParent.emit(this.form['domain']);
>>>>>>> 8affa5bbcc1f2dffd9ecdbe77f247d20dfa99e53
    }

    public runDomainCheck() {
        this.form['ds_info'] = [];
        this.form['nameservers'] = [];

        if (
            this.NSForm.value.itemRows.length > 0 &&
            this.NSForm.value.itemRows[0].ns !== ''
        ) {
            this.form['nameservers'] = this.NSForm.value.itemRows;
        }

        if (
            this.digestForm.value.itemRows.length > 0 &&
            this.digestForm.value.itemRows[0].keytag !== ''
        ) {
            if (this.digestForm.value.itemRows[0].digest !== '') {
                this.form['ds_info'] = this.digestForm.value.itemRows.map(
                    (x) => {
                        x['keytag'] = Number(x['keytag']);
                        x['algorithm'] = Number(x['algorithm']);
                        x['digtype'] = Number(x['digtype']);
                        return x;
                    }
                );
            } else {
                this.alertService.error('Digest required');
            }
        } else if (
            this.digestForm.value.itemRows.length > 0 &&
            this.digestForm.value.itemRows[0].digest !== ''
        ) {
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

        this.eventDomainCheck.emit(this.form);
    }

    public toggleOptions() {
        this.is_advanced_options_enabled = !this.is_advanced_options_enabled;
        this.eventOpenOptions.emit(this.is_advanced_options_enabled);
    }
}
