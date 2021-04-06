import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LayoutMainComponent} from './layout/layout-main/layout-main.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {CardComponent} from './shared/card/card.component';
import {LayoutGuestComponent} from './layout/layout-guest/layout-guest.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutMainComponent,
    LayoutGuestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
