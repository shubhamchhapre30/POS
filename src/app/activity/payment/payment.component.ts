import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
declare let paypal:any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit {
  orders:any = [];
  total_pay = 0;
  total_order_count:number = 0;
  pay_amount:number = 1;
  paypal_config={
    env:'sandbox',
    client:{
      sandbox:'ARaHC1AxJOKDctOftAVI3kHR9UYZ14JrGEpAv-5lkS2PsIs2R1ZVq3V884CuUEfAZIqhZtK9GuM9NH4L',
      production:'<production key'
    },
    commit:true,
    payment:(data,action)=>{
      return action.payment.create({
        payment: {
          transactions: [
            {
              amount: {
                total: '0.01',
                currency: 'USD'
              }
            }
          ]
        }
      });
    },
    onAuthorize: function (data, actions) {
      return actions.payment.execute()
        .then(function () {
          window.alert('Payment Complete!');
        });
    }
  }
  constructor(public service:DataService) { }

  ngOnInit() {
    this.orders = this.service.total_order;
    this.service.total_amount.subscribe(data=>{
      this.total_pay = data;
      this.total_order_count  = this.orders.length;
    });
    paypal.Button.render(this.paypal_config,'#paypal-button-container');
  }

}
