import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GithubService } from './github.service';
import { RepoListResolverService } from './repo-list-resolver.service';
import { RepoDetailsResolverService } from './repo-details-resolver.service';
import { RepoRoutingModule } from './repo-routing.module';
import { RepoListComponent } from './repo-list/repo-list.component';
import { RepoDetailsComponent } from './repo-details/repo-details.component';
import { RepoLanguageListComponent } from './repo-language-list/repo-language-list.component';
import { RepoComponent } from './repo/repo.component';

@NgModule({
  imports: [
    CommonModule,
    RepoRoutingModule
  ],
  declarations: [
    RepoListComponent,
    RepoDetailsComponent,
    RepoLanguageListComponent,
    RepoComponent
  ],
  providers: [
    GithubService,
    RepoListResolverService,
    RepoDetailsResolverService
  ]
})
export class RepoModule { }
