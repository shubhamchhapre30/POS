import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundNumber'
})
export class RoundNumberPipe implements PipeTransform {

  transform(value: any): any { 
    let price =  value +'';
            if(price.indexOf(".") != -1){
                return price;
            }else{
                return price+'.00';
            }
    // return value;
  }

}
