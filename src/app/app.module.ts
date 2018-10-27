import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsModalModule } from 'ng2-bs3-modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ActivateComponent } from './activate/activate.component';
import { routing } from './app.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { DataService } from './services/data.service';
import { CookieService } from 'ngx-cookie-service';
import { MainmenuComponent } from './activity/mainmenu/mainmenu.component';
import { SidebarComponent } from './activity/sidebar/sidebar.component';
import { BookingComponent } from './activity/booking/booking.component';
import { BookingOrdersComponent } from './activity/booking-orders/booking-orders.component';
import { GetInitial } from './pipe/getInitial.pipe';
import { PaymentComponent } from './activity/payment/payment.component';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DetailService } from "./services/detail.service";
import { CapitalizeFirstPipe } from './pipe/capitalizeFirstletter.pipe';
import { LoginComponent } from './login/login.component';
import { BookingOrdersInnerComponent } from './activity/booking-orders-inner/booking-orders-inner.component';
import { RoundNumberPipe } from './pipe/round-number.pipe';
import { TransactionComponent } from './main_component/transaction/transaction.component';
import { OrdersComponent } from './main_component/orders/orders.component';
import { CustomersComponent } from './main_component/customers/customers.component';
import { PrinterComponent } from './main_component/printer/printer.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ActivateComponent,
    DashboardComponent,
    MainmenuComponent,
    SidebarComponent,
    BookingComponent,
    BookingOrdersComponent,
    PaymentComponent,
    CapitalizeFirstPipe,
    LoginComponent,
    BookingOrdersInnerComponent,
    RoundNumberPipe,
    GetInitial,
    TransactionComponent,
    OrdersComponent,
    CustomersComponent,
    PrinterComponent
  ],
  imports: [
    BsModalModule,
    BrowserModule,
    RouterModule,
    routing,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [DataService, CookieService, DetailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
