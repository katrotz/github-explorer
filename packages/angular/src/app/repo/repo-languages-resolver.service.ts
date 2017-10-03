import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { GithubService } from './github.service';
import { RepoLanguage } from './repo-language';

@Injectable()
export class RepoLanguagesResolverService implements Resolve<RepoLanguage> {
  constructor(private githubService: GithubService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RepoLanguage> {
    const userId = route.paramMap.get('user');
    const repoId = route.paramMap.get('repo');

    return this.githubService.fetchRepoLanguages(repoId, userId)

      .map(repo => {
        if (repo) return repo;

        throw new Error(`Failed to resolve repo languages for repo "${repoId}", user "${userId}"`);
      })

      .catch(error => {
        this.router.navigate(['/']);
        throw error;
      });
  }
}
