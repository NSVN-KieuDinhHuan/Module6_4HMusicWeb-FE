import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from '../register/register.component';
import {LoginComponent} from '../login/login.component';
import {UpdateComponent} from '../user/update/update.component';
import {AppLayoutComponent} from '../../layout/app-layout/app-layout.component';


const routes: Routes = [{
    path: 'register',
    component: RegisterComponent
  }, {
    path: 'login',
    component: LoginComponent
  },
    {
      path: 'user',
      component: AppLayoutComponent,
      children: [
        {path: 'update/:id', component: UpdateComponent}
      ]
    }]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
