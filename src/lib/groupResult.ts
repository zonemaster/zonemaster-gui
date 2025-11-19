import type { ResultDataResult, ResultLevel } from '@/lib/client.ts';
import type { Module, ModuleSummary } from '@/types.ts';

const severityLevels: Record<ResultLevel, number> = {
    INFO: 0,
    NOTICE: 1,
    WARNING: 2,
    ERROR: 3,
    CRITICAL: 4,
};

export function groupResult(results: ResultDataResult[]) {
    const testCasesCount: Record<ResultLevel | 'ALL', number> = {
        ALL: 0,
        INFO: 0,
        NOTICE: 0,
        WARNING: 0,
        ERROR: 0,
        CRITICAL: 0,
    };
    const moduleSummary: ModuleSummary = {};

    const modules = [];
    const modulesMap: Record<string, Module> = {};

    for (const entry of results) {
        const currentModule = entry.module;
        const currentTestcase = entry.testcase;
        const currentLevel = entry.level;
        const numLevel = severityLevels[entry.level];

        if (!(currentModule in modulesMap)) {
            modulesMap[currentModule] = {
                name: currentModule,
                testcases: [],
                testcasesMap: {},
            };

            modules.push(modulesMap[currentModule]);
        }

        if (!(currentTestcase in modulesMap[currentModule].testcasesMap)) {
            modulesMap[currentModule].testcasesMap[currentTestcase] = {
                id: currentTestcase,
                entries: [],
                level: 'INFO',
            };

            modulesMap[currentModule].testcases.push(
                modulesMap[currentModule].testcasesMap[currentTestcase],
            );
        }

        modulesMap[currentModule].testcasesMap[currentTestcase].entries.push(
            entry,
        );

        if (
            numLevel >
            severityLevels[
                modulesMap[currentModule].testcasesMap[currentTestcase].level
            ]
        ) {
            modulesMap[currentModule].testcasesMap[currentTestcase].level =
                currentLevel;
        }
    }

    for (const module in modulesMap) {
        modulesMap[module].testcases.sort((testcase1, testcase2) => {
            // sort messages by descending severity level, unspecified messages always on top
            if (testcase1.id.toUpperCase() == 'UNSPECIFIED') {
                return 1;
            }
            if (testcase2.id.toUpperCase() == 'UNSPECIFIED') {
                return 1;
            }
            return (
                severityLevels[testcase2.level] -
                severityLevels[testcase1.level]
            );
        });

        moduleSummary[module] = Object.entries(
            Object.groupBy(modulesMap[module].testcases, ({ level }) => level),
        ).map(([level, entries]) => ({
            level: level as ResultLevel,
            count: entries.length,
        }));

        for (const testcase in modulesMap[module].testcasesMap) {
            const level = modulesMap[module].testcasesMap[testcase].level;

            testCasesCount[level]++;
            testCasesCount['ALL']++;

            modulesMap[module].testcasesMap[testcase].entries.sort(
                (msg1, msg2) => {
                    // sort messages by descending severity level
                    return (
                        severityLevels[msg2.level] - severityLevels[msg1.level]
                    );
                },
            );
        }
    }

    return {
        counts: testCasesCount,
        moduleSummary,
        modulesMap,
        modules,
    };
}
