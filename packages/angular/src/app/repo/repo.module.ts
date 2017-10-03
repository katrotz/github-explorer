import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepoRoutingModule } from './repo-routing.module';
import { RepoComponent } from './repo/repo.component';
import { RepoListComponent } from './repo-list/repo-list.component';
import { RepoDetailsComponent } from './repo-details/repo-details.component';
import { GithubService } from './github.service';
import { RepoListResolverService } from './repo-list-resolver.service';
import { RepoDetailsResolverService } from './repo-details-resolver.service';
import { RepoLanguagesResolverService } from './repo-languages-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    RepoRoutingModule
  ],
  declarations: [
    RepoListComponent,
    RepoDetailsComponent,
    RepoComponent
  ],
  providers: [
    GithubService,
    RepoListResolverService,
    RepoDetailsResolverService,
    RepoLanguagesResolverService
  ]
})
export class RepoModule { }
