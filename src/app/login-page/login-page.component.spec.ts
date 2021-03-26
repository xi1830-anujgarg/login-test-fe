import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActionsSubject, ReducerManager, ReducerManagerDispatcher, StateObservable, Store, StoreModule } from '@ngrx/store';
import { HttpApiService } from '../service/http-api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { LoginPageComponent } from './login-page.component';
import { observable, Observable, of } from 'rxjs';
import { loginReducer } from '../ngrx-store/reducers/login.reducer';
export const submitAPIData: any = {
  status:false
};
const httpServiceMock = {
  login() {
    return {status:false};
  }
};
describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let httpTestingController: HttpTestingController;
  let dataAccessService: HttpApiService;
  let baseUrl = "/auth";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, 
        RouterTestingModule.withRoutes([]),
      StoreModule.forRoot({loginNgx: loginReducer})],
      declarations: [ LoginPageComponent ],
      providers:[FormBuilder,HttpClient, HttpHandler, Store, StateObservable, ActionsSubject, ReducerManager, ReducerManagerDispatcher, HttpApiService,{provide: HttpApiService, useValue: httpServiceMock}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    dataAccessService = TestBed.get(HttpApiService);
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should setup form validation', () => {
    component.inItForm();
    expect(component.loginForm.status).toEqual('INVALID');
  });
  it('Correct creds', fakeAsync( () => {
    const val: any = {}
   spyOn(dataAccessService, 'login').and.returnValue(of(val));
    component.loginForm.controls.username.setValue('MTN_user')
    component.loginForm.controls.password.setValue('MTN281#^@*')
    component.submitForm();
    expect(dataAccessService.login).toHaveBeenCalled();
    expect(component.serverError).toEqual(true);
  }));
  it('Should be Valid', fakeAsync( () => {
    const val: any = {}
   spyOn(dataAccessService, 'login').and.returnValue(of(val));
    component.loginForm.controls.username.setValue('sdsd')
    component.loginForm.controls.password.setValue('asdszza')
    component.submitForm();
    expect(component.loginForm.status).toEqual('VALID');
    expect(dataAccessService.login).toHaveBeenCalled();
  }));
  it('Should be Invalid', fakeAsync( () => {
    const val: any = {}
   spyOn(dataAccessService, 'login').and.returnValue(of(val));
    component.loginForm.controls.username.setValue('')
    component.loginForm.controls.password.setValue('')
    component.submitForm();
    expect(component.loginForm.status).toEqual('INVALID');
  }));
  it('Worng creds', fakeAsync( () => {
    const val: any = {}
   spyOn(dataAccessService, 'login').and.returnValue(of(val));
    component.loginForm.controls.username.setValue('sdsd')
    component.loginForm.controls.password.setValue('asdssa')
    component.submitForm();
    expect(dataAccessService.login).toHaveBeenCalled();
    expect(component.serverError).toEqual(true);
  }));
});
