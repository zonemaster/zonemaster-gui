import { Component, OnInit, OnChanges, Input, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { saveAs } from 'file-saver';
import { combineLatest } from 'rxjs';
import {DnsCheckService} from '../../services/dns-check.service';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnChanges, AfterViewInit {

  @Input('resultID') resultID: string;
  @ViewChild('resultView', {static: false}) resultView: ElementRef;
  @ViewChild('historyModal', {static: false}) historyModal: ElementRef;
  @ViewChildren('test') testEl: QueryList<ElementRef>;

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
  private header = ['Module', 'Level', 'Message'];

  constructor(private activatedRoute: ActivatedRoute,
              private modalService: NgbModal,
              private alertService: AlertService,
              public translateService: TranslateService,
              private dnsCheckService: DnsCheckService) {
     this.directAccess = (this.activatedRoute.snapshot.data[0] === undefined) ? false :
       this.activatedRoute.snapshot.data[0]['directAccess'];
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
          this.displayResult(this.resultID, event.lang, false);
        }
        this.language = event.lang;
      });
    }
  }

  ngOnChanges() {
    this.displayResult(this.resultID, this.translateService.currentLang);
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.displayResult(this.resultID, event.lang, false);
      this.language = event.lang;
    });
  }

  ngAfterViewInit() {
    this.testEl.changes.subscribe((event) => {
      this.testEl.forEach(item => {
        //observer.observe(item.nativeElement);
      })
    })
  }

  public openModal(content) {
    this.modalService.open(content).result.then((result) => {
      console.log(result)
    }, (reason) => {
      console.log(reason);
    });
  }

  public moduleCollapsed(headerRef) {
    let headerRect = headerRef.getBoundingClientRect();

    if (headerRect.top < 0) {
      let style = window.getComputedStyle(headerRef);
      window.scrollBy(0, headerRect.top - parseInt(style.top, 10) )
    }
  }

   private displayResult(domainCheckId: string, language: string, resetCollapsed = true) {
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

      for (let moduleName of this.modulesKeys) {
        if (resetCollapsed || !(moduleName in this.isCollapsed)) {
          this.isCollapsed[moduleName] = true;
        }
        this.module_items[moduleName] = [];
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
      this.translateService.get('No data for this test').subscribe((res: string) => {
        this.alertService.error(res)
      });
    });
  }

  public getHistory() {

    if (!this.history) {
      this.translateService.get('History information request is in progress').subscribe((res: string) => {
        this.alertService.info(res);
      });

      this.dnsCheckService.getTestHistory(this.historyQuery).then(data => {
        this.history = data as any[];
        if (this.history.length === 0) {
          this.translateService.get('No result for this query').subscribe((res: string) => {
            this.alertService.info(res);
          });
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
    let toTranslate = ['Module', 'Level', 'Message'];
    combineLatest([...toTranslate.map(s => this.translateService.get(s))])
      .subscribe(([moduleStr, levelStr, messageStr]) => {
        let tbodyContent = '';
        for (let item of this.result) {
          tbodyContent += `
            <tr>
              <td>${item.module}</td>
              <td>${item.level}</td>
              <td>${item.message}</td>
            </tr>
          `;
        }

        let resultHeader = this.resultView.nativeElement.querySelector('.result-header').cloneNode(true).innerHTML;

        const result = `
          <!doctype html>
          <html class="no-js" lang="fr">
            <head>
              <meta charset="UTF-8">
              <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge"><![endif]-->
              <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
              <title>Zonemaster TEST</title>
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" media="all">
            </head>
            <body style="margin-left: 20px;">
              <header>
                ${resultHeader}
              </header>
              <table class="table table-striped">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">${moduleStr}</th>
                    <th scope="col">${levelStr}</th>
                    <th scope="col">${messageStr}</th>
                  </tr>
                </thead>
                <tbody>
                  ${tbodyContent}
                </tbody>
              </table>
            </body>
          </html>
        `;

        const blob = new Blob([result], {
          type: 'text/html;charset=utf-8'
        });

        saveAs(blob, `zonemaster_result_${this.test['location']}.html`);
      });
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

    for (const indexObj of this.header) {
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
      for (const index of this.header) {
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
