import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



// Import containers
import { DefaultLayoutComponent } from './containers';
import { SessionLayoutComponent } from './containers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';


//LAYOUT IMPORT
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
////-----END



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData, DatePipe } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from 'ngx-envconfig';


// SOCIAL LOGIN
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';
 

// LEAFLET
//import { LeafletModule } from '@asymmetrik/ngx-leaflet';


const APP_CONTAINERS = [
  DefaultLayoutComponent,
  SessionLayoutComponent
];

registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    NzBreadCrumbModule,
    AppRoutingModule,
    IconsProviderModule,
    NzNotificationModule,
    NzLayoutModule,
    NzMenuModule,
    NzAvatarModule,
    NzGridModule,
    NzFormModule,
    NzDropDownModule,
    NzSpaceModule,
    ConfigModule.forRoot({state: 'developpement'}),
   

    
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    DatePipe,
    { provide: NZ_I18N, useValue: fr_FR },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('610847905018-m4peuak70jqasfb8njk0iuca3r3vi9ad.apps.googleusercontent.com'),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('752629048617009'),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
