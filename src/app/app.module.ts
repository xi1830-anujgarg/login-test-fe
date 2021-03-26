import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { loginReducer } from './ngrx-store/reducers/login.reducer';
import { Store, StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({loginNgx: loginReducer})
  ],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule { }
