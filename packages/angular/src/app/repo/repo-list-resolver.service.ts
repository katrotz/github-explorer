import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { GithubService } from './github.service';
import { Repo } from './repo';

@Injectable()
export class RepoListResolverService implements Resolve<Repo[] | Response> {
  constructor(private githubService: GithubService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Repo[] | Response> {
    const userId = route.paramMap.get('user');

    return this.githubService.fetchRepos(userId)

      .map(repo => {
        if (repo) return repo;

        throw new Error(`Failed to resolve repos list for user ${userId}`);
      })

      .catch((response) => {
        return Observable.of(response);
      });
  }
}
