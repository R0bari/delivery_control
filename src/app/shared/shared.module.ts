import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {MainHeadComponent} from './main-head/main-head.component';
import {RouterModule} from '@angular/router';
import {TableHeaderComponent} from './table-header/table-header.component';
import {CardComponent} from './card/card.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [MainMenuComponent, MainHeadComponent, TableHeaderComponent, CardComponent],
  exports: [
    MainMenuComponent,
    MainHeadComponent,
    TableHeaderComponent,
    CardComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class SharedModule {
}
