import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MessagesPageComponent} from './components/messages-page/messages-page.component';
import {CreateMessageFormComponent} from './components/create-message-form/create-message-form.component';
import {MessageDetailsComponent} from './components/message-details/message-details.component';

const routes: Routes = [
  {
    path: '',
    component: MessagesPageComponent
  },
  {
    path: 'new',
    component: CreateMessageFormComponent
  },
  {
    path: 'details/:id',
    component: MessageDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
