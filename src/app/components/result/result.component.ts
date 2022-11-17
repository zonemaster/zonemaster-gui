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
  public severity_icons = {
    'info': 'fa-check',
    'notice': 'fa-exclamation',
    'warning': 'fa-exclamation-triangle',
    'error': 'fa-times-circle',
    'critical': 'fa-times-circle'
  }
  public searchQueryLength = 0;
  public test: any = {params: {ipv4: false, ipv6: false}};
  public isCollapsed = [];
  public testCasesCount = {
    all: 0,
    info: 0,
    notice: 0,
    warning: 0,
    error: 0,
    critical: 0,
  };
  public testCasesCountByModule = {};
  public resultFilter = {
    all: true,
    info: false,
    notice: false,
    warning: false,
    error: false,
    critical: false,
    search: ''
  };
  public severityLevels = {
    info: 0,
    notice: 1,
    warning: 2,
    error: 3,
    critical: 4,
  };
  public testCaseDescriptions = {};
  public historyQuery: object;
  public history: any[];
  public language: string;
  public navHeight: Number;
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
      this.fetchResults(this.resultID, this.language);
    });

    this.navHeightSubscription = this.navigationService.height.subscribe((newHeight: Number) => {
      this.navHeight = newHeight;
    });

    this.langChangeSubscription = this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.fetchResults(this.resultID, event.lang, false);
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

  public onCallapsableKeyDownEvent(event, testCaseId) {
    switch (event.key) {
      case 'Enter':
        this.isCollapsed[testCaseId] = !this.isCollapsed[testCaseId];
        break;
    }
  }

  private fetchResults(domainCheckId: string, language: string, resetCollapsed = true) {
     this.dnsCheckService.getTestResults({id: domainCheckId, language}).then(data => {

      this.test = {
        id: data['hash_id'],
        creation_time: new Date(data['created_at']),
        location: document.location.origin + this.location.prepareExternalUrl(`/result/${domainCheckId}`)
      };

      this.historyQuery = data['params'];
      this.result = data['results'];
      this.form = data['params'];
      this.testCaseDescriptions = data['testcase_descriptions'];

      this.testCasesCount = this.displayResults(this.result, resetCollapsed);

      this.testCasesCountByModule = {};

      for (const module of this.modules) {
        const levels = {};
        for (const testcase of module.testcases) {
          const level = testcase.level;

          if (!(level in levels)) {
            levels[level] = 0;
          }

          levels[level] ++;
        }

        this.testCasesCountByModule[module.name] = levels;
      }

      this.titleService.setTitle(`${this.form.domain} · Zonemaster`);
    }, error => {
      this.translateService.get('No data for this test').subscribe((res: string) => {
        this.alertService.error(res)
      });
    });
  }

  private displayResults(results: Array<Object>, resetCollapsed: boolean) {
    const testCasesCount = {
      'all': 0,
      'info': 0,
      'notice': 0,
      'warning': 0,
      'error': 0,
      'critical': 0,
    }

    this.modules = [];
    const modulesMap = {};

    for (const entry of results) {
      const currentModule = entry['module'];
      const currentTestcase = entry['testcase'];
      const currentLevel = entry['level'].toLowerCase();
      const numLevel = this.severityLevels[currentLevel];

      entry['level'] = currentLevel;

      if (!(currentModule in modulesMap)) {
        modulesMap[currentModule] = {name: currentModule, testcases: [], testcasesMap: {}}

        this.modules.push(modulesMap[currentModule]);
      }

      if (!(currentTestcase in modulesMap[currentModule].testcasesMap)) {
        modulesMap[currentModule].testcasesMap[currentTestcase] = {
          id: currentTestcase,
          entries: [],
          level: 'info'
        }

        modulesMap[currentModule].testcases.push(modulesMap[currentModule].testcasesMap[currentTestcase]);

        if (resetCollapsed || !(currentTestcase in this.isCollapsed)) {
          this.isCollapsed[currentTestcase] = true;
          this.isCollapsed[currentModule] = true;
        }
      }

      modulesMap[currentModule].testcasesMap[currentTestcase].entries.push(entry);

      if (numLevel > this.severityLevels[modulesMap[currentModule].testcasesMap[currentTestcase].level]) {
        modulesMap[currentModule].testcasesMap[currentTestcase].level = currentLevel;
      }
    }

    for (const module in modulesMap) {
      console.log(modulesMap[module].testcases);
      modulesMap[module].testcases.sort((testcase1, testcase2) => {
        // sort messages by descending severity level, unspecified messages always on top
        if (testcase1.id == 'UNSPECIFIED') {
          return 1;
        }
        if (testcase2.id == 'UNSPECIFIED') {
          return 1;
        }
        return this.severityLevels[testcase2.level] - this.severityLevels[testcase1.level];
      })
      console.log(modulesMap[module].testcases);
      for (const testcase in modulesMap[module].testcasesMap) {
        const level = modulesMap[module].testcasesMap[testcase].level;

        testCasesCount[level] ++;
        testCasesCount['all'] ++;
        modulesMap[module].testcasesMap[testcase].entries.sort((msg1, msg2) => {
          // sort messages by descending severity level
          return this.severityLevels[msg2.level] - this.severityLevels[msg1.level];
        })
      }
    }

    this.isCollapsed['UNSPECIFIED'] = false;

    return testCasesCount;
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

        saveAs(blob, this.exportedName('html'));
      });
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

  public togglePillFilter(name) {
    this.resultFilter[name] = !this.resultFilter[name];
    const atLeastOneActive = Object.keys(this.resultFilter).slice(1, -1).filter(el => this.resultFilter[el]);
    this.searchQueryLength = atLeastOneActive.length;

    if (atLeastOneActive.length < 1) {
      this.resultFilter['all'] = true;
    } else if (name === 'all') {
      for (const index of Object.keys(this.resultFilter).slice(1, -1)) {
        this.resultFilter[index] = false;
      }
      this.resultFilter['all'] = true;
      this.searchQueryLength = -1;
    } else {
      this.resultFilter['all'] = false;
    }

    this.filterResults()
  }

  public filterResults() {
    const filteredResults = this.filterResultsSearch(
      this.filterResultsLevel(this.result, this.resultFilter),
      this.resultFilter['search']
    );
    this.displayResults(filteredResults, false);
  }

  private filterResultsLevel(results: any[], levelFilter: Object) {
    if (levelFilter['all']) {
      return results;
    } else {
      const levels = Object.entries(levelFilter)
        .filter(([_key, value]) => value === true)
        .map(([key, _value]) => key);

      return results.filter(entry => levels.includes(entry.level.toLowerCase()));
    }
  }

  private filterResultsSearch(results: any[], query: string) {
    if (!query) {
      return results;
    }
    const queryLower = query.toLocaleLowerCase()
    return results.filter(entry => entry.message.toLowerCase().includes(queryLower));
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
