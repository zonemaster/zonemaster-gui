import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'romanize'
})
export class RomanizePipe implements PipeTransform {

  transform(value: any): any {

    if (!+value) {
      return value;
    }

    const digits = value.toString().split('');
    const key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM',
      '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC',
      '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
    let roman = '';
    let i = 3;
    let res;

    while (i--) {
      roman = (key[+digits.pop() + (i * 10)] || '') + roman;
      res = Array(+digits.join('') + 1).join('M') + roman;
    }

    return res;
  }
}
