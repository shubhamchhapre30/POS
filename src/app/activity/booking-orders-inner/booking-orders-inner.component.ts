import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {Router,ActivatedRoute} from '@angular/router';
import {DetailService} from "../../services/detail.service";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {environment} from '../../../environments/environment';
@Component({
  selector: 'app-booking-orders-inner',
  templateUrl: './booking-orders-inner.component.html',
  styleUrls: ['./booking-orders-inner.component.css']
})
export class BookingOrdersInnerComponent implements OnInit {
  orders:any = [];
  total_pay = 0;
  total_order_count:number = 0;
  attribute_menus:any = [];
  modalRef: BsModalRef;
  sub_menu_id:any;
  quantity:any;
  updating_order_id:number;
  restaurant_id:any;
  main_menu_id:any;
  path:any = environment.api_url;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  tax_list:any = [];
  tax_rate_order:any = localStorage.getItem('tax_rate');
  tax_amount:any=0;
  modalRef1: BsModalRef;
  constructor(private modalService: BsModalService,public route:ActivatedRoute ,public service:DataService,public router:Router,public detail_service:DetailService) { }

  ngOnInit() {
    this.invoice_calcuate();
    if(this.orders == ''){
      this.router.navigateByUrl('/booking-order');
    } 
    let data = JSON.parse(localStorage.getItem('info'));
    this.restaurant_id = data[0].restaurant_id;
    let menu_id = this.route.snapshot.queryParamMap.get('id'); 
    this.main_menu_id = this.route.snapshot.queryParamMap.get('main_menu_id');
    this.sub_menu_id = menu_id;
    let info=  {
      "menu_id":menu_id,
      "sub_menu_id":menu_id,
      "restaurant_id":this.restaurant_id
    }
    this.detail_service.get_submenu_inner_option(info).subscribe(
      data=>{
        data.attributes.forEach(element => {
          element.attribute.forEach(element1 => {
              element1.attribute_type = false;
          });
        });
        this.attribute_menus = data.attributes;
      }
    )
    this.detail_service.get_tax_list(this.restaurant_id).subscribe(
      data=>{
        this.tax_list = data.tax_list;
      }
    )
  } 

  invoice_calcuate(){
    this.orders = this.service.total_order;
    this.service.total_amount.subscribe(data => {
      this.total_pay = data;
      this.total_order_count = this.orders.length;
    });
    this.service.tax_amount.subscribe(data=>{
      this.tax_amount = data;
    });
  }


  save_item(value,status){
    if(status){
      this.service.remove_extra(value.attr_id,this.sub_menu_id);
      this.attribute_menus.forEach(element => {
        element.attribute.forEach(element1 => {
          if(value.attr_id == element1.attr_id){
            element1.attribute_type = false;
          }
        });
      });
    }else{
      this.service.add_extra(value,this.sub_menu_id);
      this.orders = this.service.total_order;
      this.attribute_menus.forEach(element => {
        element.attribute.forEach(element1 => {
          if(value.attr_id == element1.attr_id){
            element1.attribute_type = true;
          }
        });
      });
    }
  }

  open_quantity_modal(template,item_id,quantity){ 
    this.updating_order_id = item_id;
    this.quantity = quantity;
    this.modalRef = this.modalService.show(template);
  }

  close_modal(){ 
    this.modalRef.hide();
  }

  add_quantity(){
    this.quantity +=1;
  }

  minus_quantity(){
    this.quantity -=1;
  }

  save_quantity(){
    let status = this.service.update_quantity(this.updating_order_id,this.quantity);
    if(status){
      this.updating_order_id = null;
      this.quantity = 0;
      this.modalRef.hide();
    }
  }

  remove_item(item_id = ''){
    if(item_id !=''){
      this.service.remove_order(item_id);
    }else{
      this.service.remove_order(this.updating_order_id);
      this.modalRef.hide();
      this.updating_order_id = null;
      this.quantity = 0;
    }
  }
  
  search_filter(value){
    this.detail_service.get_search_submenu_inner_items(this.restaurant_id,this.sub_menu_id,value).subscribe(
      data=>{
        this.attribute_menus = '';
        if(data.attributes){
          data.attributes.forEach(element => {
            element.attribute.forEach(element1 => {
                element1.attribute_type = false;
            });
          });
          this.attribute_menus = data.attributes;
        }
      }
    )
  }

  open_tax_modal(template){
    this.modalRef1 = this.modalService.show(template,this.config);
  }

  close_tax_modal(){
    this.modalRef1.hide();
  }

  selected_tax(){
    localStorage.setItem('tax_rate',this.tax_rate_order);
    this.service.calculate_tax(this.total_pay);
    this.modalRef1.hide();
  }
}
