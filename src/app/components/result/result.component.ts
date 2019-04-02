import { Component, OnInit, OnChanges, Input, ElementRef, ViewChild } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { saveAs } from 'file-saver';
import {DnsCheckService} from '../../services/dns-check.service';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnChanges {

  @Input('resultID') resultID: string;
  @ViewChild('resultView') resultView: ElementRef;
  @ViewChild('historyModal') historyModal: ElementRef;

  private closeResult: string;
  public directAccess = false;
  public form = {ipv4: true, ipv6: true, profile: 'default_profile', domain: ''};
  public result = [];
  public modules: any;
  public module_items: any = {};
  public modulesKeys;
  public searchQueryLength = 0;
  public resutlCollapsed = true;
  public test: any = {params: {ipv4: false, ipv6: false}};
  public isCollapsed = [];
  public ns_list;
  public ds_list;
  public level_items = {
    info: [],
    notice: [],
    warning: [],
    error: [],
    critical: [],
  };
  public result_filter = {
    all: true,
    info: false,
    notice: false,
    warning: false,
    error: false,
    critical: false,
    search: ''
  };
  public historyQuery: object;
  public history: any[];
  public language: string;
  private levelSeverity = ['INFO', 'NOTICE', 'WARNING', 'ERROR', 'CRITICAL'];

  constructor(private activatedRoute: ActivatedRoute,
              private modalService: NgbModal,
              private alertService: AlertService,
              private translateService: TranslateService,
              private dnsCheckService: DnsCheckService) {
     this.directAccess = (this.activatedRoute.snapshot.data[0] === undefined) ? false : this.activatedRoute.snapshot.data[0]['directAccess'];
  }

  ngOnInit() {
    this.language = this.translateService.currentLang;
    console.log(this.resultID);

    // Le result ID ne passe pas par la lorsque domaine.ts change une seconde fois l'ID !!!
    if (this.directAccess) {
      let notFirst = true;
      this.activatedRoute.params.subscribe((params: Params) => {
        this.resultID = params['resultID'];
        this.displayResult(this.resultID, this.language);
      });
      this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
        if (notFirst) {
          notFirst = !notFirst;
        } else {
          this.displayResult(this.resultID, event.lang);
        }
        this.language = event.lang;
      });
    }
  }

  ngOnChanges() {
    this.displayResult(this.resultID, this.translateService.currentLang);
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.displayResult(this.resultID, event.lang);
      this.language = event.lang;
    });
  }

  public openModal(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

   private displayResult(domainCheckId: string, language: string) {
     this.dnsCheckService.getTestResults({id: domainCheckId, language}).then(data => {
      // TODO clean

      this.test = {
        id: data['id'],
        creation_time: data['creation_time'],
        location: `${document.location.origin}/result/${domainCheckId}`
      };

      this.historyQuery = data['params'];

      this.result = data['results'];

      this.setItemsColors(this.result);
      this.setModulesColors(data['results']);

      this.modulesKeys = Object.keys(this.modules);
      for (let i = 0; i < this.modulesKeys.length; i++) {
        this.isCollapsed[i] = true;
        this.module_items[this.modulesKeys[i]] = [];
      }

      for (const item of data['results']) {
        this.module_items[item.module].push(item);
      }

      this.level_items = {
        info: [],
        notice: [],
        warning: [],
        error: [],
        critical: [],
      };
      for (const item of data['results']) {
        this.level_items[item['level'].toLowerCase()].push(item);
      }

      this.form = data['params'];
      this.ns_list = data['ns_list'];
      this.ds_list = data['ds_list'];
    }, error => {
      this.alertService.error('No data for this test');
    });
  }

  public getHistory() {

    if (!this.history) {
      this.alertService.info('History information request is in progress');
      this.dnsCheckService.getTestHistory(this.historyQuery).then(data => {
        this.history = data as any[];
        if (this.history.length === 0) {
          this.alertService.info('No result for this query');
        } else {
          this.openModal(this.historyModal);
        }
      });
    } else {
      this.openModal(this.historyModal);
    }
  }

  public exportJson() {
    const blob = new Blob([JSON.stringify(this.result)], {
      type: 'application/javascript'
    });

    saveAs(blob, `zonemaster_result_${this.test['location']}.json`);
  }
  public exportHTML() {
    const tempResutlCollapsed = this.resutlCollapsed;
    this.resutlCollapsed = false;
    setTimeout(() => {

    const clone = this.resultView.nativeElement.cloneNode(true);
    clone.querySelector('.result > div.row.d-block').remove();
    clone.querySelectorAll('.result > div.row > div.col-md-6')[1].remove();

    const result = `<!doctype html>
    <html class="no-js" lang="fr">
      <head>
        <meta charset="UTF-8">
        <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge"><![endif]-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
        <title>Zonemaster TEST</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" media="all">
      </head>
      <body style="margin-left: 20px;">
        ${clone.innerHTML}
      </body>
    </html>`;

    const blob = new Blob([result], {
      type: 'text/html;charset=utf-8'
    });

    saveAs(blob, `zonemaster_result_${this.test['location']}.html`);
    this.resutlCollapsed = tempResutlCollapsed;
    }, 100);
  }
  public exportText() {
    const csvData = this.ConvertTo([...this.result].slice(0), 'txt');
    const blob = new Blob([csvData], {
      type: 'text/plain;charset=utf-8'
    });

    saveAs(blob, `zonemaster_result_${this.test['location']}.txt`);
  }
  public exportCSV() {
    const csvData = this.ConvertTo([...this.result].slice(0), 'csv');
    const blob = new Blob([csvData], {
      type: 'text/csv;charset=utf-8'
    });
    saveAs(blob, `zonemaster_result_${this.test['location']}.csv`);
  }
  ConvertTo(objArray, extension: string) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';
    const header = ['Module', 'Level', 'Message'];

    for (const indexObj of header) {
      if (extension === 'csv') {
        row += indexObj + ';';
      } else {
        row += indexObj + ' \t';
      }
    }
    row = row.slice(0, -1);
    str += row + '\r\n';

    for (let i = 1; i < array.length; i++) {
      let line = '';
      for (const index of header) {
        if (line !== '') {
          if (extension === 'csv') {
            line += ';';
          } else {
            line += ' \t';
          }
        }
        line += array[i][index.toLowerCase()].trim();
      }
      str += line + '\r\n';
    }
    return str;
  }
  private setItemsColors(data): void {
    for (const item in data) {
      if (['WARNING'].includes(this.result[item].level)) {
        this.result[item].color = this.result[item].level.toLowerCase();
      } else if (['ERROR', 'CRITICAL'].includes(this.result[item].level)) {
        this.result[item].color = 'danger';
      } else if (['NOTICE'].includes(this.result[item].level)) {
        this.result[item].color = 'success';
      } else {
        this.result[item].color = '';
      }
    }
  }

  public setModulesColors(result): void {
      this.modules =  result.reduce((modules, item) => {
      if (typeof modules[item.module] === 'undefined') {
        modules[item.module] = '';
      }

      const itemLevel = this.levelSeverity.indexOf(item.level);
      const moduleLevel = this.levelSeverity.indexOf(modules[item.module]);
      const maxLevel = Math.max(moduleLevel, itemLevel);
      modules[item.module] = this.levelSeverity[maxLevel];
      return modules;
    }, {});
  }


  public togglePillFilter(name) {
    this.result_filter[name] = !this.result_filter[name];
    const atLeastOneActive = Object.keys(this.result_filter).slice(1, -1).filter(el => this.result_filter[el]);
    this.searchQueryLength = atLeastOneActive.length;

    if (atLeastOneActive.length < 1) {
      this.result_filter['all'] = true;
    } else if (name === 'all') {
      for (const index of Object.keys(this.result_filter).slice(1, -1)) {
        this.result_filter[index] = false;
      }
      this.result_filter['all'] = true;
      this.searchQueryLength = -1;
    } else {
      this.result_filter['all'] = false;
    }
  }

}
