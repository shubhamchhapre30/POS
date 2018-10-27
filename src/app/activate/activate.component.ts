import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { CookieService } from 'ngx-cookie-service';
import { DetailService } from '../services/detail.service';
@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css'],
})
export class ActivateComponent implements OnInit {
  activation: boolean = true;
  set_passcode: boolean = false;
  confirm_passcode: boolean = false;
  @ViewChild('input1') inputEl: ElementRef;
  @ViewChild('input2') inputE2: ElementRef;
  @ViewChild('input3') inputE3: ElementRef;
  activation_code: FormGroup;
  set_code: FormGroup;
  confirm_code: FormGroup;
  password: any = [];
  user_id:any;
  constructor(public cookieService: CookieService, public service: DataService, public builder: FormBuilder, public toastr: ToastsManager, vcr: ViewContainerRef, public router: Router, public detail_service: DetailService) {
    this.toastr.setRootViewContainerRef(vcr);
    let status: any = this.cookieService.get('access');
    if (status) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  ngOnInit() {
    this.activation_code = this.builder.group({
      code_1: [null, Validators.required],
      code_2: [null, Validators.required],
      code_3: [null, Validators.required],
      code_4: [null, Validators.required]
    });

    this.set_code = this.builder.group({
      set_code_1: [null, Validators.required],
      set_code_2: [null, Validators.required],
      set_code_3: [null, Validators.required],
      set_code_4: [null, Validators.required]
    });

    this.confirm_code = this.builder.group({
      confirm_code_1: [null, Validators.required],
      confirm_code_2: [null, Validators.required],
      confirm_code_3: [null, Validators.required],
      confirm_code_4: [null, Validators.required]
    });

  }

  ngAfterViewInit() {
    this.inputEl.nativeElement.focus();
  }

  set_option(type, value) {
    if (type == 'set_passcode') {
      this.detail_service.check_activation(this.activation_code.value).subscribe(
        data => {
            if(data.user_id){
              this.user_id = data.user_id
              this.set_passcode = true;
              this.confirm_passcode = false;
              this.activation = false;  
            }else{
              this.toastr.error('Your code is wrong.', '');
            }

        }
      )
    } else if (type == 'confirm_passcode') {
      this.set_passcode = false;
      this.confirm_passcode = true;
      this.activation = false;
      let array = JSON.stringify(this.set_code.value);
      JSON.parse(array, (key, value) => {
        this.password.push(value);
      });
    } else {
      this.set_passcode = false;
      this.confirm_passcode = true;
      this.activation = false;
      let status: boolean = this.checkPasswordMatch(this.confirm_code.value);
      if (status) {
        let json = {
          user_id:this.user_id,
          password:this.set_code.value
        }
        this.detail_service.set_passcode(json).subscribe(data=>{ 
          localStorage.setItem('info',JSON.stringify(data.info));
          this.service.set_access(true);
          this.router.navigateByUrl('/dashboard');
        })
      } else {
        this.toastr.error('Password are not matched.', '');
      }
    }
  }

  keytab(event) {
    if (event.keyCode != 8) {
      let nextInput = event.srcElement.nextElementSibling;
      if (nextInput == null) {
        return;
      } else {
        nextInput.focus();
      }
    } else {
      let preInput = event.srcElement.previousElementSibling;
      if (preInput == null) {
        return;
      } else {
        preInput.focus();
      }
    }
  }

  checkPasswordMatch(a) {
    let array = JSON.stringify(a);
    let array1: any = [];
    JSON.parse(array, (key, value) => {
      array1.push(value);
    });
    for (var i = 0; i < 4; ++i) {
      if (array1[i] !== this.password[i]) return false;
    }
    return true;
  }

  combine_data(data){
    let code = '';
    let array = JSON.stringify(data);
      JSON.parse(array, (key, value) => {
        code += value;
      });console.log(code);
    return code;
  }
}
