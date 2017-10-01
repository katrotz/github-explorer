import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Repo } from './repo';
import { RepoDetails } from './repo-details';
import { RepoLanguage } from './repo-language';

@Injectable()
export class GithubService {
  private reposUrl = 'https://api.github.com/users/:user/repos';
  private repoDetailsUrl = 'https://api.github.com/repos/:user/:repo';
  private repoLanguagesUrl = 'https://api.github.com/repos/:user/:repo/languages';

  constructor(private http: Http) { }

  fetchRepos(user: string): Observable<Repo[]> {
    const url = this.replacePlaceholders(this.reposUrl, { user });

    return this.http.get(url)
      .map((response) => response.json() as Repo[]);
  }

  fetchRepoDetails(repo: string, user: string): Observable<Repo> {
    const url = this.replacePlaceholders(this.repoDetailsUrl, { repo, user });

    return this.http.get(url)
      .map((response) => response.json() as Repo);
  }

  fetchRepoLanguages(repo: string, user = 'heremaps'): Observable<RepoLanguage> {
    const url = this.replacePlaceholders(this.repoLanguagesUrl, { repo, user });

    return this.http.get(url)
      .map((response) => response.json() as RepoLanguage);
  }

  private replacePlaceholders(url: string, placeholders: object): string {
    return Object.keys(placeholders)
      .reduce((acc, key) => acc.replace(new RegExp(`:${key}`, 'g'), placeholders[key] || ''), url);
  }
}
