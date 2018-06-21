import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCategories'
})
export class FilterByCategoriesPipe implements PipeTransform {
  transform(items: any[], searchQuery: object, searchQueryLength: number, attr: string,
            isModules: boolean = false, modules: any[] = []): any[] {
    if (!items) {
      return [];
    }

    if (!searchQuery || searchQuery['all']) {
      return items;
    }

    const activeCat: any = [...Object.keys(searchQuery).slice(1, -1).filter(el => searchQuery[el])];

    const res = items.filter( it => {
      if (isModules) {
        return (modules[it].filter(el =>
          activeCat.includes(el[attr].toLowerCase())
        ).length > 0);
      } else {
        return activeCat.includes(it[attr].toLowerCase());
      }
    });
    return res;
  }
}
