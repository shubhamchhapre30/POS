import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {DetailService} from '../services/detail.service';
import {DataService} from '../services/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login_form: FormGroup;
  iserror:boolean= false;
  error:any = ''
  constructor(public dataservice:DataService,public router:Router,public builder:FormBuilder,public service:DetailService) {
    this.login_form = this.builder.group({
      email:[null,[Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password:[null,Validators.required]
    });
   }

  ngOnInit() {
  }

  login(data){
    this.service.login(data).subscribe(
      data=>{
        if(data.status == 'success'){
          localStorage.setItem('info',JSON.stringify(data.info));
          localStorage.setItem('tax_rate','0.0');
          this.dataservice.set_access(true);
          this.router.navigateByUrl('/dashboard');
        }else{
          this.iserror = true;
          this.error = data.info;
        }
      }
    )
  }
}
