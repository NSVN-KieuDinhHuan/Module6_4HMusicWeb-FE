import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppLayoutComponent} from './layout/app-layout/app-layout.component';


const routes: Routes = [
  // {
  //   path: 'playlist',
  //   component: AppLayoutComponent,
  //   loadChildren: () => import('./playlist/playlist.module').then(module => module.PlaylistModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
