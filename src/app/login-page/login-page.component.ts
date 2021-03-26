import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginFailed, loginSuccess, submit } from '../ngrx-store/actions/login.action';
import { HttpApiService } from '../service/http-api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm : FormGroup;
  serverError = false;
  errorMsg = "Username or password incorrect";
  constructor( private fb: FormBuilder,
    public apiService: HttpApiService,
    public route: Router,
    private store: Store<{ loginNgx: any}>) { 
  }

  ngOnInit(): void {
    this.inItForm();
    this.store.select('loginNgx').subscribe(data => {
      console.log(data);
    })
  }
  inItForm() {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9~`!@#$%^&*()_+=-?/.>,<;:]{6,20}$')])
  }); 
  }
  submitForm(){
    if(this.loginForm.status === 'VALID'){  
      const req = this.loginForm.value
      this.store.dispatch(submit());
      this.apiService.login(req).subscribe(res => {
        if(res.status){
          this.serverError = false
          this.store.dispatch(loginSuccess());
          this.route.navigate(['dashboard']);
        } else {
          this.store.dispatch(loginFailed());
          this.errorMsg = "Username or password incorrect";
          this.serverError = true;
        }
      }, 
      err => {
        this.store.dispatch(loginFailed());
        this.errorMsg = "Somthing went wrong on server";
        this.serverError = true;
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
