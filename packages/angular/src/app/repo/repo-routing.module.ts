import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RepoComponent } from './repo/repo.component';
import { RepoListComponent } from './repo-list/repo-list.component';
import { RepoDetailsComponent } from './repo-details/repo-details.component';
import { RepoListResolverService } from './repo-list-resolver.service';
import { RepoDetailsResolverService } from './repo-details-resolver.service';
import { RepoLanguagesResolverService } from './repo-languages-resolver.service';

const repoRoutes: Routes = [
  {
    path: '',
    component: RepoComponent,
    children: [
      {
        path: ':user',
        component: RepoListComponent,
        resolve: {
          repos: RepoListResolverService
        }
      },
      {
        path: ':user/:repo',
        component: RepoDetailsComponent,
        resolve: {
          repo: RepoDetailsResolverService,
          languages: RepoLanguagesResolverService
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(repoRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RepoRoutingModule { }
