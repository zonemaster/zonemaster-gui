import { Component, OnInit, Input, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { saveAs } from 'file-saver';
import { combineLatest, Subscription } from 'rxjs';
import { DnsCheckService } from '../../services/dns-check.service';
import { AlertService } from '../../services/alert.service';
import { NavigationService } from '../../services/navigation.service';
import { formatDate, Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnDestroy {

  @Input('resultID') resultID: string;
  @ViewChild('resultView', {static: false}) resultView: ElementRef;
  @ViewChild('historyModal', {static: false}) historyModal: ElementRef;

  public displayForm = false;
  public form = {ipv4: true, ipv6: true, profile: 'default_profile', domain: ''};
  public result = [];
  public modules: any;
  public module_items: any = {};
  public modulesKeys;
  public searchQueryLength = 0;
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
  public navHeight: Number;
  private levelSeverity = ['INFO', 'NOTICE', 'WARNING', 'ERROR', 'CRITICAL'];
  private header = ['Module', 'Level', 'Message'];
  private navHeightSubscription: Subscription;

  private langChangeSubscription: Subscription;
  private routeParamsSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private alertService: AlertService,
              public translateService: TranslateService,
              private dnsCheckService: DnsCheckService,
              private navigationService: NavigationService,
              private location: Location,
              private titleService: Title) {

    let data = this.router.getCurrentNavigation().extras.state || {};
    this.displayForm = data.displayForm === undefined ? false : data.displayForm;

    // When redirected from the domain check page we display the notification here as the other component has been destroyed
    if (this.displayForm) {
      this.translateService.get(`Domain checked completed`).subscribe((res: string) => {
        this.alertService.success(res);
      });
    }
  }

  ngOnInit() {
    this.language = this.translateService.currentLang;
    console.log(this.resultID);

    this.routeParamsSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      this.resultID = params['resultID'];
      this.displayResult(this.resultID, this.language);
    });

    this.navHeightSubscription = this.navigationService.height.subscribe((newHeight: Number) => {
      this.navHeight = newHeight;
    });

    this.langChangeSubscription = this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.displayResult(this.resultID, event.lang, false);
      this.language = event.lang;
    });
  }

  ngOnDestroy() {
    this.navHeightSubscription.unsubscribe();
    this.langChangeSubscription.unsubscribe();

    if (this.routeParamsSubscription) {
      this.routeParamsSubscription.unsubscribe();
    }
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
        creation_time: new Date(data['creation_time'] + 'Z'),
        location: document.location.origin + this.location.prepareExternalUrl(`/result/${domainCheckId}`)
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

      for (const module in this.module_items) {
        this.module_items[module].sort((msg1, msg2) => {
          // sort messages by descending severity level
          return this.levelSeverity.indexOf(msg2.level) - this.levelSeverity.indexOf(msg1.level);
        })
      }

      this.form = data['params'];
      this.ns_list = data['ns_list'];
      this.ds_list = data['ds_list'];

      this.titleService.setTitle(`${this.form.domain} · Zonemaster`);
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

    combineLatest([...this.header.map(s => this.translateService.get(s))])
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

        const result = `
          <!doctype html>
          <html class="no-js" lang="${this.language}">
            <head>
              <meta charset="UTF-8">
              <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge"><![endif]-->
              <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
              <title>Zonemaster TEST</title>
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" media="all">
            </head>
            <body style="margin-left: 20px;">
              <header>
               <h2>${this.form.domain}</h2><i>${formatDate(this.test.creation_time, 'yyyy-MM-dd HH:mm zzzz', 'en')}</i>
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

  // inspired from
  // https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript#30810322
  public copyLinkToClipboard(str) {
    var btnClipboard = document.getElementsByClassName("btn-clipboard")[0];
    var icon = btnClipboard.firstElementChild;

    var resetIcon = function(oldIcon) {
      setTimeout(function() {
        icon.classList.remove(oldIcon);
        icon.classList.add("fa-clipboard");
      }, 2000);
    };

    var textArea = document.createElement("textarea");
    textArea.value = str;

    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    var res = document.execCommand('copy');

    if (res === true) {
      icon.classList.remove("fa-clipboard");
      icon.classList.add("fa-check");

      resetIcon("fa-check");
    } else {
      icon.classList.remove("fa-clipboard");
      icon.classList.add("fa-remove");

      resetIcon("fa-remove");
    }

    document.body.removeChild(textArea);
  }

}
