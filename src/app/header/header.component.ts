import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {DataService} from '../services/data.service';
import {environment} from '../../environments/environment';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  login_status:any;
  user_info:any;
  Path:any = environment.api_url;
  constructor(public router:Router,public cookieService: CookieService,public service:DataService) { }

  ngOnInit() {
    this.login_status = this.cookieService.get('access');
    this.user_info = JSON.parse(localStorage.getItem('info'));
  }

  logout(){
    localStorage.removeItem('info');
    this.cookieService.deleteAll();
    this.service.clear_orders();
    this.router.navigateByUrl('');
  }

}
