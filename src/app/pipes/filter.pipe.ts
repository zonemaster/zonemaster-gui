import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
    transform(
        items: any[],
        searchQuery: string,
        isModules: boolean = false,
        modules: any[] = []
    ): any[] {
        if (!items) {
            return [];
        }
        if (!searchQuery) {
            return items;
        }

        searchQuery = searchQuery.toLowerCase();

        const res = items.filter((it) => {
            if (isModules) {
                return (
                    modules[it].filter((el) =>
                        this.filterByType(el, searchQuery)
                    ).length > 0
                );
            } else {
                return this.filterByType(it, searchQuery);
            }
        });

        return res;
    }

    private filterByType(it, searchQuery) {
        if (typeof it === 'string') {
            return it.toLowerCase().includes(searchQuery);
        } else {
            let found = false;
            for (const i in it) {
                if (typeof it[i] === 'string') {
                    found += it[i].toLowerCase().includes(searchQuery);
                } else {
                    found += it[i].includes(searchQuery);
                }
            }
            return found;
        }
    }
}
