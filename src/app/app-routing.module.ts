import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutMainComponent} from './layout/layout-main/layout-main.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutMainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../app/greeting/greeting.module').then(m => m.GreetingModule)
      },
      {
        path: 'deliveryServices',
        loadChildren: () => import('../app/delivery-services/delivery-services.module').then(m => m.DeliveryServicesModule)
      },
      {
        path: 'messages',
        loadChildren: () => import('../app/messages/messages.module').then(m => m.MessagesModule)
      },
      {
        path: 'contacts',
        loadChildren: () => import('../app/contacts/contacts.module').then(m => m.ContactsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
