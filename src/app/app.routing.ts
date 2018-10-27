import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes, Params } from '@angular/router';
import { ActivateComponent } from './activate/activate.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainmenuComponent } from './activity/mainmenu/mainmenu.component';
import { BookingComponent } from './activity/booking/booking.component';
import { BookingOrdersComponent } from './activity/booking-orders/booking-orders.component';
import {PaymentComponent} from "./activity/payment/payment.component";
import {LoginComponent} from './login/login.component';
import {BookingOrdersInnerComponent} from './activity/booking-orders-inner/booking-orders-inner.component';
import {TransactionComponent} from './main_component/transaction/transaction.component';
import {CustomersComponent} from './main_component/customers/customers.component';
import {OrdersComponent} from './main_component/orders/orders.component';
const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'activation', component: ActivateComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'mainmenu', component: MainmenuComponent },
    { path: 'booking', component: BookingComponent },
    { path: 'booking-order',component: BookingOrdersComponent },
    { path: 'payment',component:PaymentComponent},
    { path: 'booking-order-inner',component: BookingOrdersInnerComponent},
    { path: 'transaction',component:TransactionComponent},
    { path: 'orders',component:OrdersComponent},
    { path: 'customers',component:CustomersComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);