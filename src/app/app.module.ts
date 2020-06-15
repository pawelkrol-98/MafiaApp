import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './home';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorInterceptor, JwtInterceptor} from './helpers';
import {NgxWidgetGridModule} from 'ngx-widget-grid';
import { DebtorListComponent } from './debtors/debtor-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { AddDebtorComponent } from './debtors/add-debtor/add-debtor.component';
import { MapComponent } from './map/map.component';
import { EditDebtorComponent } from './debtors/edit-debtor/edit-debtor.component';
import { KillersListComponent } from './killers/killers-list.component';
import { AddKillerComponent } from './killers/add-killer/add-killer.component';
import { EditKillerComponent } from './killers/edit-killer/edit-killer.component';
import { SetTargetComponent } from './killers/set-target/set-target.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DebtorListComponent,
    AddDebtorComponent,
    MapComponent,
    EditDebtorComponent,
    KillersListComponent,
    AddKillerComponent,
    EditKillerComponent,
    SetTargetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxWidgetGridModule,
    FormsModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
