import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class DataService {
  private dataSource$ = new BehaviorSubject<boolean>(false);
  data = this.dataSource$.asObservable();
  total_order:any = [];
  private total_amount$ = new BehaviorSubject<number>(0);
  public total_amount = this.total_amount$.asObservable();
  private tax_amount$ = new BehaviorSubject<number>(0);
  public tax_amount = this.tax_amount$.asObservable();
  constructor(private cookieService: CookieService ) { 
    
  }

  set_access(value){
    this.dataSource$.next(value);
    this.cookieService.set( 'access', 'true' );
  }

  set_order(value){ 
    let name = value.sub_menu_name;
    let quantity = this.total_count(name);
    let price = quantity * value.price;
    let tax = quantity*value.tax;
    let array = {"item_id":value.sub_menu_id,"name":name,"quantity":quantity,"price":price,"tax":tax,'base_price':value.price,"extra":[]};
    if(this.check_order_exist(value.sub_menu_id)){
      this.total_order.forEach(element => {
        if(element.item_id == value.sub_menu_id){
          element.quantity = quantity;
          element.price = price;
        }
      });
    }else{
      this.total_order.push(array);
    }
    this.total_amount_to_pay();
  }

  total_count(name){
    let total = 1;
    this.total_order.forEach((element,index) => {
      if(name.indexOf(element.name) != -1){
        total = 0;
        total = element.quantity +1; 
      }
    });
    return total;
  }

  clear_orders(){
    this.total_order.length = 0;
  }

  total_amount_to_pay(){
    let total_amount:number = 0;
    this.total_order.forEach(element => {
      total_amount = total_amount + parseFloat(element.price);
      element.extra.forEach(element1 => {
        total_amount = total_amount + parseFloat(element1.price);
      });
    });
    this.total_amount$.next(total_amount);
    this.calculate_tax(total_amount);
  }

  update_quantity(item_id,value){
    this.total_order.forEach(element => {
      if(element.item_id == item_id){
        element.price = value * element.base_price;
        element.quantity = value;
        // element.tax = quantity * element.tax;
      }
    });
    this.total_amount_to_pay();
    return true;
  }

  remove_order(item_id){
    this.total_order.forEach((element,index) => {
      if(element.item_id == item_id){
          this.total_order.splice(index,1);
      }
    });
    this.total_amount_to_pay();
  }

  add_extra(data,sub_menu_id){
    this.total_order.forEach(element => {
      if(element.item_id == sub_menu_id){
        element.extra.push(data);
      }
    });
    this.total_amount_to_pay();
  }
   remove_extra(attr_id,sub_menu_id){
    this.total_order.forEach(element => {
      if(element.item_id == sub_menu_id){
        element.extra.forEach((element1,index) => {
          if(element1.attr_id == attr_id){
            element.extra.splice(index,1);
          }
        });
      }
    });
    this.total_amount_to_pay();
   }

   check_order_exist(id){
     let status = false;
     this.total_order.forEach(element => {
       if(element.item_id == id){
          status = true;
       }
     });
     return status;
   }

   calculate_tax(amount){
     let tax:any = localStorage.getItem('tax_rate');
     let amount1  = (amount*tax)/100;
     this.tax_amount$.next(amount1);
   }
}
