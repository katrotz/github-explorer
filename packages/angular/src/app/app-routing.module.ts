import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';

export const appRoutes: Routes = [
  {
    path: 'repos',
    loadChildren: 'app/repo/repo.module#RepoModule'
  },
  {
    path: '',
    redirectTo: '/repos/heremaps', // Defaults to `heremaps` user
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: false,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    PreloadAllModules
  ]
})
export class AppRoutingModule {}
