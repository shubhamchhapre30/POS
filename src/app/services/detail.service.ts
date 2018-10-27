import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
let login_url = environment.api_url+'api/login';
let activation_url = environment.api_url+'api/activation';
let set_passcode_url = environment.api_url+'api/set_passcode';
let get_main_menu_list_url = environment.api_url+'api/get_main_menu_list';
let get_sub_menu_list_url = environment.api_url+'api/get_sub_menu_list';
let get_all_main_menu_url = environment.api_url+'api/get_all_main_menu';
let get_submenu_inner_url = environment.api_url+'api/get_submenu_inner';
let get_search_menu_list_items_url = environment.api_url+'api/get_search_menu_list_items';
let get_search_submenu_inner_items_url = environment.api_url+'api/get_search_submenu_inner_items';
let get_tax_list_url = environment.api_url+'api/get_tax_list';
@Injectable()
export class DetailService {

  constructor(public http:HttpClient) { }

  check_activation(code){
    let myParams = new HttpParams()
        .set('code', JSON.stringify(code))
      return this.http.post(activation_url,myParams).catch(this.handler)
  }

  handler(error){
    return Observable.throw(error.json().error || 'server error');
  }

  set_passcode(data){
    let body = new HttpParams()
        .set('user_id',data.user_id)
        .set('password',JSON.stringify(data.password));
      return this.http.post(set_passcode_url,body).catch(this.handler);
  }

  get_main_menu_list(restaurant_id){
    let myParams = new HttpParams()
        .set('restaurant_id', restaurant_id)
      return this.http.get(get_main_menu_list_url,{params:myParams}).catch(this.handler)
  }

  get_sub_menu_list(menu_id,restaurant_id){
    let myParams = new HttpParams()
        .set('menu_id',menu_id)
        .set('restaurant_id', restaurant_id)
      return this.http.get(get_sub_menu_list_url,{params:myParams}).catch(this.handler)
  }
  
  get_all_main_menu(restaurant_id){
    let myParams = new HttpParams()
      .set('restaurant_id', restaurant_id)
    return this.http.get(get_all_main_menu_url,{params:myParams}).catch(this.handler)
  }

  login(data){
    let myParams = new HttpParams()
        .set('email',data.email)
        .set('password', window.btoa(data.password));
      return this.http.post(login_url,myParams).catch(this.handler)
  }

  get_submenu_inner_option(data){
    let myParams = new HttpParams()
        .set('menu_id',data.menu_id)
        .set('restaurant_id',data.restaurant_id)
        .set('sub_menu_id',data.sub_menu_id);
      return this.http.get(get_submenu_inner_url,{params:myParams}).catch(this.handler)
  }

  get_search_menu_list_items(restaurant_id,search_value){
    let myParams = new HttpParams()
    .set('restaurant_id',restaurant_id)
    .set('search',search_value);
    return this.http.get(get_search_menu_list_items_url,{params:myParams}).catch(this.handler)
  }

  get_search_submenu_inner_items(restaurant_id,sub_menu_id,search_value){
    let myParams = new HttpParams()
    .set('restaurant_id',restaurant_id)
    .set('sub_menu_id',sub_menu_id)
    .set('menu_id',sub_menu_id)
    .set('search',search_value);
    return this.http.get(get_search_submenu_inner_items_url,{params:myParams}).catch(this.handler)
  }

  get_tax_list(restaurant_id){
    let myParams = new HttpParams()
      .set('restaurant_id',restaurant_id)
      return this.http.get(get_tax_list_url,{params:myParams}).catch(this.handler);
  }
}
