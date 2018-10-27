import { Component, OnInit,ViewChild } from '@angular/core';
import {DataService} from '../../services/data.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {DetailService} from '../../services/detail.service';
import {Router}  from '@angular/router';
import {environment} from '../../../environments/environment';
@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css']
})
export class MainmenuComponent implements OnInit {
  orders:any = [];
  modalRef: BsModalRef;
  quantity:any;
  updating_order_id:number;
  items:any = [];
  total_pay = 0;
  total_order_count:number = 0;
  restaurant_id:any;
  Path:any = environment.api_url;
  modalRef1: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  tax_list:any = [];
  tax_rate_order:any = localStorage.getItem('tax_rate');
  tax_amount:any=0;
  constructor(public router:Router,public detail_service:DetailService,private modalService: BsModalService,public service : DataService) {
     
  }

  ngOnInit() {
    this.invoice_calcuate();
    let data = JSON.parse(localStorage.getItem('info'));
    this.restaurant_id = data[0].restaurant_id;
    this.detail_service.get_all_main_menu(this.restaurant_id).subscribe(
      data=>{
        this.items = data.menus;
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

  add_item(order){
    this.service.set_order(order);
    let menu_id = order.sub_menu_id;
    if(order.is_menu >0){
      this.router.navigate(['/booking-order-inner'],{queryParams: {id:menu_id}});
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
    this.detail_service.get_search_menu_list_items(this.restaurant_id,value).subscribe(
      data=>{
        this.items = data.menus;
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
