import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from '../register/register.component';
import {LoginComponent} from '../login/login.component';
import {UpdateComponent} from '../user/update/update.component';
import {AppLayoutComponent} from '../../layout/app-layout/app-layout.component';
import {ChangePasswordComponent} from '../change-password/change-password.component';
import {AppNavbarComponent} from '../../layout/app-navbar/app-navbar.component';


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
    },
  // {
  //   path: 'auth',
  //   component: AppNavbarComponent,
  //   children: [
  //     {path: 'changePassword/:id', component: ChangePasswordComponent}
  //   ]
  // }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
