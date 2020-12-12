import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import {AuthInterceptor} from '../app/auth/auth-interceptor';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {Router, RouterModule} from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {CategoriesService} from './categories/categories.service'
import { AngularFireAuthModule } from '@angular/fire/auth';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ItemsComponent } from './items/items.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SearchItemComponent } from './search-item/search-item.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup, FormControl } from '@angular/forms';
import {HttpErrorInterceptor} from './auth/http-error-interceptor';
import {MatTableModule} from '@angular/material/table';

// // @ts-ignore
// import {MatInputModule} from '@angular/material';
// @ts-ignore
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ProductListComponent } from './product-list/product-list.component';
import {MatExpansionModule} from '@angular/material/expansion';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {ProductsService} from './product-list/product.service';
// import {CategoriesService} from './categories/categories.service.spec';
import {AuthService} from '../app/auth/auth.service';
import {AuthGuard} from '../app/auth/auth.guard';
import { SelectedListComponent } from './selected-list/selected-list.component';
import { LoginComponent } from './auth/login/login/login.component';
import { SignupComponent } from './auth/signup/signup/signup.component';
import { from } from 'rxjs';
import { DialogMessageComponent } from './auth/dialog-message/dialog-message.component';
import { UsersComponent } from './users/users/users.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {Location} from "@angular/common";
import { ForgotPasswordComponent } from '../app/auth/password/forgot-password/forgot-password.component';
import { CreateNewPasswordComponent } from './auth/password/create-new-password/create-new-password/create-new-password.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ItemFullPageComponent } from './item-full-page/item-full-page.component';
import { CartComponent } from './cart/cart/cart.component';
import { UserDetailsExpandComponent } from './users/user-details-expand/user-details-expand.component';
import { AgmCoreModule } from '@agm/core';
import { UserPaymentComponent } from './users/user-payment/user-payment.component';
import { ConfirmationComponent } from './users/confirmation/confirmation.component';
import { UserOrderHistoryComponent } from './users/user-order-history/user-order-history.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { OrdersComponent } from './order/orders-users/orders/orders.component';
import { CommentsComponent } from './comments/comments/comments.component';
import { CategoriesComponent } from './categories/categories/categories.component';
// import { OrdersUsersComponent } from './order/orders-users/orders-users.component';
//import {MatTableDataSource} from '@angular/material/table'
const config = {
  apiKey: '<your-key>',
  authDomain: '<your-project-authdomain>',
  databaseURL: '<your-database-URL>',
  projectId: '<your-project-id>',
  storageBucket: '<your-storage-bucket>',
  messagingSenderId: '<your-messaging-sender-id>'
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductComponent,
    ItemsComponent,
    SearchItemComponent,
    SearchPageComponent,
    ProductCreateComponent,
    HeaderComponent,
    ProductListComponent,
    SelectedListComponent,
    LoginComponent,
    SignupComponent,
    DialogMessageComponent,
    UsersComponent,
    UserProfileComponent,
    CreateUserComponent,
    ForgotPasswordComponent,
    CreateNewPasswordComponent,
    ContactUsComponent,
    ItemFullPageComponent,
    CartComponent,
    UserDetailsExpandComponent,
    UserPaymentComponent,
    ConfirmationComponent,
    UserOrderHistoryComponent,
    AccessDeniedComponent,
    OrdersComponent,
    CommentsComponent,
    CategoriesComponent,
  ],
  entryComponents:[DialogMessageComponent],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatTableModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    // MatTableDataSource,
    MatSelectModule,
    MatInputModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    MatGoogleMapsAutocompleteModule,
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyDL-p023QeVYd0AOsoKUeQdg-zkhG66Rro",
      libraries: ['places']
    }),
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'products', component: ProductComponent},
      {path: 'products/:name', component: ProductComponent},
      // {path: 'cpus', component: CpuComponent},

      {path: 'items/:name', component: ItemsComponent},
      {path: 'users', component: UsersComponent,canActivate:[AuthGuard]},
      {path: 'search/:searchKey', component: SearchPageComponent},
      {path:'edit/:_id',component:ProductCreateComponent,canActivate:[AuthGuard]},
      {path:'user/edit/:_id',component:SignupComponent,canActivate:[AuthGuard]},
      {path:'create',component:ProductCreateComponent,canActivate:[AuthGuard]},
      {path:'list',component:ProductListComponent,canActivate:[AuthGuard]},
      {path:'search/:name',component:SearchPageComponent},
      {path:'login',component:LoginComponent},
       {path:'signup',component:SignupComponent},
       {path:'profile',component:UserProfileComponent},
       {path:'forgot',component:ForgotPasswordComponent},
       {path:'create-new-password/:_id',component:CreateNewPasswordComponent},
       {path:'contact-us',component:ContactUsComponent},
       {path:'profile/:_id',component:UserProfileComponent},
       {path: 'item/:_id', component: ItemFullPageComponent},
       {path: 'cart', component: CartComponent},
       {path:'address',component:UserDetailsExpandComponent,canActivate:[AuthGuard]},
       {path:'payment',component:UserPaymentComponent,canActivate:[AuthGuard]},    
        {path:'confirmation',component:ConfirmationComponent,canActivate:[AuthGuard]},
        {path:'userOrderHistory/:_id',component:UserOrderHistoryComponent},
        {path:'accessDenied',component:AccessDeniedComponent},
        {path:'orders',component:OrdersComponent},
        {path:'comments',component:CommentsComponent},
        {path:'categories',component:CategoriesComponent}



       
       
      
    ]), BrowserAnimationsModule, MatCardModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [ProductsService,CategoriesService,AuthService,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  },Location],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit {
  constructor(private authService : AuthService){

  }
  ngOnInit(): void {
    this.authService.authAuthUser();
  }
}