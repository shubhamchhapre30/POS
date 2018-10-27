import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ActivatedRoute } from '@angular/router';
import { DetailService } from "../../services/detail.service";
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
@Component({
  selector: 'app-booking-orders',
  templateUrl: './booking-orders.component.html',
  styleUrls: ['./booking-orders.component.css']
})
export class BookingOrdersComponent implements OnInit {
  items:any = [];
  total_items:any = [];
  orders:any = [];
  total_pay = 0;
  total_order_count:number = 0;
  modalRef: BsModalRef;
  quantity:any;
  updating_order_id:number;
  menu_id:any;
  path:any = environment.api_url;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  tax_list:any = [];
  tax_rate_order:any = localStorage.getItem('tax_rate');
  tax_amount:any=0;
  modalRef1: BsModalRef;
  constructor(public router:Router,public detail_service:DetailService,public service :DataService,private modalService: BsModalService,public route:ActivatedRoute) { }

  ngOnInit() {
    this.invoice_calcuate();
    let data = JSON.parse(localStorage.getItem('info'));
    let restaurant_id = data[0].restaurant_id;
    this.menu_id = this.route.snapshot.queryParamMap.get('id'); 
    this.detail_service.get_sub_menu_list(this.menu_id,restaurant_id).subscribe(
      data=>{
        this.total_items = data.sub_menu;
        this.total_items.forEach(element => {
          this.items.push(element);
        });
      }
    );
    if(this.menu_id == null){
        this.router.navigateByUrl('/booking');
    }
    this.detail_service.get_tax_list(restaurant_id).subscribe(
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
  filter_item(value){
    this.items.length = 0;
    if(value !=''){
      value = value.toLowerCase();
      this.total_items.forEach(element => {
       let searchText = element.sub_menu_name.toLowerCase();
        if(searchText.indexOf(value) != -1){
          this.items.push(element);
        }
      });
    }else{
      this.total_items.forEach(element => {
        if(element.sub_menu_name.includes(element.sub_menu_name)){
          this.items.push(element);
        }
      });
    }
  }
  add_item(order){
    this.service.set_order(order);
    let menu_id = order.sub_menu_id;
    if(order.is_menu >0){
      this.router.navigate(['/booking-order-inner'],{queryParams: {id:menu_id,main_menu_id:this.menu_id}});
    }
  }

  clear_orders(){
    this.service.clear_orders();
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
