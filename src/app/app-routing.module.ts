import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WeaponComponent } from './weapon/weapon.component';
import { WeaponDetailComponent } from './weapon-detail/weapon-detail.component';
import { NewScenarioComponent } from './new-scenario/new-scenario.component';

const routes: Routes = [
  { path: '', redirectTo: '/scenarios', pathMatch: 'full' },
  { path: 'newscenario', component: NewScenarioComponent },
  { path: 'scenarios', component: FrontpageComponent },
  { path: 'scenario/:id', component: DashboardComponent },
  { path: 'weapons', component: WeaponComponent },
  { path: 'detail/:id', component: WeaponDetailComponent },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'user-detail', loadChildren: './user-detail/user-detail.module#UserDetailPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
