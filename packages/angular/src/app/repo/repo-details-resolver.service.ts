import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { GithubService } from './github.service';
import { Repo } from './repo';

@Injectable()
export class RepoDetailsResolverService implements Resolve<Repo> {
  constructor(private githubService: GithubService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Repo> {
    const userId = route.paramMap.get('user');
    const repoId = route.paramMap.get('repo');

    return this.githubService.fetchRepoDetails(repoId, userId)

      .map(repo => {
        if (repo) return repo;

        throw new Error(`Failed to resolve repo ${repoId} for user ${userId}`);
      })

      .catch(error => {
        this.router.navigate(['/']);
        throw error;
      });
  }
}
