import { RouteReuseStrategy } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { WeaponComponent } from './weapon/weapon.component';
import { WeaponDetailComponent } from './weapon-detail/weapon-detail.component';
import { MessageComponent } from './message/message.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { NewScenarioComponent } from './new-scenario/new-scenario.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
      AppComponent,
      WeaponComponent,
      WeaponDetailComponent,
      DashboardComponent,
      NewScenarioComponent,
      MessageComponent,
      FrontpageComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
