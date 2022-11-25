import { Component, OnInit, Input, ElementRef, ViewChild, OnDestroy, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from 'file-saver';
import { Subscription } from 'rxjs';
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

  @Input('testId') testId: string;
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
  public navHeight: Number;
  private levelSeverity = ['INFO', 'NOTICE', 'WARNING', 'ERROR', 'CRITICAL'];
  private header = ['Module', 'Level', 'Message'];
  private navHeightSubscription: Subscription;

  private routeParamsSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private alertService: AlertService,
              private dnsCheckService: DnsCheckService,
              private navigationService: NavigationService,
              private location: Location,
              private titleService: Title,
              @Inject(LOCALE_ID) private language: string) {

    let data = this.router.getCurrentNavigation().extras.state || {};
    this.displayForm = data.displayForm === undefined ? false : data.displayForm;

    // When redirected from the domain check page we display the notification here as the other component has been destroyed
    if (this.displayForm) {
      this.alertService.success($localize `Test completed`);
    }
  }

  ngOnInit() {
    console.log(this.testId);

    this.routeParamsSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      this.testId = params['testId'];
      this.displayResult(this.testId);
    });

    this.navHeightSubscription = this.navigationService.height.subscribe((newHeight: Number) => {
      this.navHeight = newHeight;
    });
  }

  ngOnDestroy() {
    this.navHeightSubscription.unsubscribe();

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

  public onModuleKeyDownEvent(event, moduleKey) {
    switch (event.key) {
      case 'Enter':
        this.isCollapsed[moduleKey] = !this.isCollapsed[moduleKey];
        break;
    }
  }

  public onFilterLevelKeyDownEvent(event, level) {
    switch (event.key) {
      case 'Enter':
        this.togglePillFilter(level);
        break;
    }
  }

  public moduleCollapsed(headerRef) {
    let headerRect = headerRef.getBoundingClientRect();

    if (headerRect.top < 0) {
      let style = window.getComputedStyle(headerRef);
      window.scrollBy(0, headerRect.top - parseInt(style.top, 10) )
    }
  }

   private displayResult(testId: string, resetCollapsed = true) {
     this.dnsCheckService.getTestResults(testId).then(data => {
      // TODO clean

      this.test = {
        id: data['hash_id'],
        creation_time: new Date(data['created_at']),
        location: document.location.origin + this.location.prepareExternalUrl(`/result/${testId}`)
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
      this.alertService.error($localize `No data for this test`)
    });
  }

  public getHistory() {
    if (!this.history) {
      this.alertService.info($localize `History information request is in progress`);

      this.dnsCheckService.getTestHistory(this.historyQuery).then(data => {
        this.history = data as any[];
        if (this.history.length === 0) {
          this.alertService.info($localize `No result for this query`);
        } else {
          this.openModal(this.historyModal);
        }
      });
    } else {
      this.openModal(this.historyModal);
    }
  }

  private exportedName(extension) {
    return `zonemaster_result_${this.form.domain}_${this.test.id}.${extension}`
  }

  public exportJson() {
    const blob = new Blob([JSON.stringify(this.result)], {
      type: 'application/javascript'
    });

    saveAs(blob, this.exportedName('json'));
  }

  public exportHTML() {
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
      <html lang="${this.language}">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
          <title>${this.form.domain} • Zonemaster Test Result</title>
          <style>
            th,td {
              text-align: left;
              font-weight: normal;
              padding: 0.75rem;
            }
            thead {
              background-color: #212529;
              color: #fff;
            }
            body td {
              border-top: 1px solid #dee2e6;
            }
            body {
              color: #212529;
              font-family: sans;
              margin-left: 20px;
            }
            table {
              border: none;
            }
            tbody tr:nth-child(odd) {
              background-color: rgba(0,0,0,.05);
            }
            h2 {
              font-weight: normal;
              font-size: 2rem;
              margin: .5rem 0;
            }
          </style>
        </head>
        <body>
          <header>
            <h2>${this.form.domain}</h2><i>${formatDate(this.test.creation_time, 'yyyy-MM-dd HH:mm zzzz', 'en')}</i>
          </header>
          <table cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <th scope="col">${$localize `Module`}</th>
                <th scope="col">${$localize `Level`}</th>
                <th scope="col">${$localize `Message`}</th>
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

    saveAs(blob, this.exportedName('html'));
  }

  public exportText() {
    const csvData = this.ConvertTo([...this.result].slice(0), 'txt');
    const blob = new Blob([csvData], {
      type: 'text/plain;charset=utf-8'
    });

    saveAs(blob, this.exportedName('txt'));
  }

  public exportCSV() {
    const csvData = this.ConvertTo([...this.result].slice(0), 'csv');
    const blob = new Blob([csvData], {
      type: 'text/csv;charset=utf-8'
    });
    saveAs(blob, this.exportedName('csv'));
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
