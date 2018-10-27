import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {PrintingService} from '../services/printing.service';
declare var qz: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[PrintingService]
})
export class DashboardComponent implements OnInit {

  constructor(public cookieService: CookieService,public service:DataService,public router:Router,public printer:PrintingService) {
    let status:any = this.cookieService.get('access');
    if(status == false){
      this.router.navigateByUrl('');
    }
   }

  ngOnInit() {
    // qz.websocket.connect()
    // this.printer.getPrinters().subscribe(printers=>{
    //   console.log(printers);
    // });
    
  }

}
