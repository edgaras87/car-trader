import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchResultPageComponent } from './search-result-page/search-result-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdvertPageComponent } from './advert-page/advert-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MyAdsComponent } from './my-ads/my-ads.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';

import { LoginComponent } from './login/login.component';
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthInterceptService } from './services/auth-intercept.service';

import { SpecificationService } from './services/specification.service';

import { ContainerComponent } from './advert-form/container/container.component';
import { GeneralInfoFormPageIComponent } from './advert-form/segments/general/general-info-form-page-i/general-info-form-page-i.component';
import { GeneralInfoFormPageIIComponent } from './advert-form/segments/general/general-info-form-page-ii/general-info-form-page-ii.component';
import { InitialComponent } from './advert-form/initial/initial.component';
import { MenuComponent } from './advert-form/segments/menu/menu.component';
import { GeneralInfoFormPageIiiComponent } from './advert-form/segments/general/general-info-form-page-iii/general-info-form-page-iii.component';
import { EquipmentInfoFormPageIComponent } from './advert-form/segments/equipment/equipment-info-form-page-i/equipment-info-form-page-i.component';
import { EquipmentInfoFormPageIiComponent } from './advert-form/segments/equipment/equipment-info-form-page-ii/equipment-info-form-page-ii.component';
import { EquipmentInfoFormPageIiiComponent } from './advert-form/segments/equipment/equipment-info-form-page-iii/equipment-info-form-page-iii.component';
import { EquipmentInfoFormPageIvComponent } from './advert-form/segments/equipment/equipment-info-form-page-iv/equipment-info-form-page-iv.component';
import { EquipmentInfoFormPageVComponent } from './advert-form/segments/equipment/equipment-info-form-page-v/equipment-info-form-page-v.component';

import { DetailsInfoFormPageIComponent } from './advert-form/segments/details/details-info-form-page-i/details-info-form-page-i.component';
import { DetailsInfoFormPageIiComponent } from './advert-form/segments/details/details-info-form-page-ii/details-info-form-page-ii.component';

import { ContactInfoFormPageIComponent } from './advert-form/segments/contact/contact-info-form-page-i/contact-info-form-page-i.component';
import { ContactInfoFormPageIiComponent } from './advert-form/segments/contact/contact-info-form-page-ii/contact-info-form-page-ii.component';

import { DatePipe, registerLocaleData } from '@angular/common';


import localeEU from '@angular/common/locales/eu';

import { SignupComponent } from './signup/signup.component';
import { ImagekitioAngularModule } from 'imagekitio-angular';

import { GoogleAddressSearchComponent } from './google-address-search/google-address-search.component';
import { CommaNumberPipe } from './pipes/comma-number.pipe';
import { CascadingSelectOptionComponent } from './advert-form/initial/cascading-select-option/cascading-select-option.component';
import { EnginePowerDirective } from './directives/engine-power.directive';
import { ShowEnginePowerPipe } from './pipes/show-engine-power.pipe';
import { CalcEnginePowerPipe } from './pipes/calc-engine-power.pipe';

import { CommaNumberDirective } from './directives/comma-number.directive';
import { StringToNumberDirective } from './directives/string-to-number.directive';
import { AllowOnlyNumbersDirective } from './directives/allow-only-numbers.directive';
import { NavigationService } from './services/navigation.service';
import { BackButtonDirective } from './directives/back-button.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdvertService } from './services/advert.service';
import { FirebaseService } from './services/firebase.service';
import { SelectorOptionsService } from './services/selector-options.service';

import { GlobalErrorHandler } from './error-handling/global-error-handler';




import { SimpleNotificationsModule } from 'angular2-notifications';

import { ServerErrorInterceptor } from './error-handling/server-error.interceptor';
import { ScrollService } from './services/scroll.service';
import { NavigationPaths } from './enums/navigation-paths.enum';











registerLocaleData(localeEU)



const routes: Routes = [
  {
    path: NavigationPaths.HOME,
    component: MainPageComponent
  },
  {
    path: NavigationPaths.AD_SEARCH,
    component: SearchResultPageComponent,
  },
  {
    path: `${NavigationPaths.AD_SEARCH}/:id`,
    component: AdvertPageComponent
  },
  {
    path: NavigationPaths.AD_CREATE,
    component: ContainerComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: `${NavigationPaths.AD_EDIT}/:id`,
    component: ContainerComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: NavigationPaths.ADS_LIST,
    component: MyAdsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: NavigationPaths.LOGIN,
    component: LoginComponent
  },
  {
    path: NavigationPaths.SIGNUP,
    component: SignupComponent
  },
  { path: '**', redirectTo: NavigationPaths.HOME },
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainPageComponent,
    SearchResultPageComponent,
    AdvertPageComponent,
    MyAdsComponent,
    LoginComponent,
    SignupComponent,


    ContainerComponent,
    MenuComponent,

    InitialComponent,
    CascadingSelectOptionComponent,

    GeneralInfoFormPageIComponent,
    GeneralInfoFormPageIIComponent,
    GeneralInfoFormPageIiiComponent,

    EquipmentInfoFormPageIComponent,
    EquipmentInfoFormPageIiComponent,
    EquipmentInfoFormPageIiiComponent,
    EquipmentInfoFormPageIvComponent,
    EquipmentInfoFormPageVComponent,

    DetailsInfoFormPageIComponent,
    DetailsInfoFormPageIiComponent,

    ContactInfoFormPageIComponent,
    ContactInfoFormPageIiComponent,


    GoogleAddressSearchComponent,

    ShowEnginePowerPipe,
    CalcEnginePowerPipe,
    CommaNumberPipe,
    CommaNumberDirective,
    EnginePowerDirective,
    StringToNumberDirective,
    AllowOnlyNumbersDirective,
    BackButtonDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    SimpleNotificationsModule.forRoot(),

    ReactiveFormsModule,

    // firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,

    //https://stackoverflow.com/questions/40983055/how-to-reload-the-current-route-with-the-angular-2-router#:~:text=This%20can%20now,is%20active%20already.
    //RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
    //RouterModule.forRoot(routes,{ scrollPositionRestoration: 'top' }),
    RouterModule.forRoot(routes),


    ImagekitioAngularModule.forRoot({
      publicKey: environment.imagekit.publicKey,
      urlEndpoint: environment.imagekit.urlEndpoint,
      //authenticationEndpoint: environment.authenticationEndpoint
    })

  ],

  providers: [

    AdvertService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptService,
      multi: true
    },
    FirebaseService,
    NavigationService,
    //RestService
    SelectorOptionsService,
    SpecificationService,
    UserService,
    DatePipe,
    CommaNumberPipe,
    CalcEnginePowerPipe,
    //NotificationService,
    ScrollService,


    {
      provide: LOCALE_ID,
      useValue: 'eu' // 'de-DE' for Germany, 'fr-FR' for France ...  'eu' for europe
    },

    // error handling

    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },

    // catching 401 unauthorized and redirecting to /login
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true
    }



  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
