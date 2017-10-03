import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Repo } from './repo';
import { RepoLanguage } from './repo-language';

@Injectable()
export class GithubService {
  private reposUrl = 'https://api.github.com/users/:user/repos?access_token=1bbd3efc7a1187128e7181b1ef00c6ef8ce15cf2';
  private repoDetailsUrl = 'https://api.github.com/repos/:user/:repo?access_token=1bbd3efc7a1187128e7181b1ef00c6ef8ce15cf2';
  private repoLanguagesUrl = 'https://api.github.com/repos/:user/:repo/languages?access_token=1bbd3efc7a1187128e7181b1ef00c6ef8ce15cf2';

  /**
   * Stores a UI flag to avoid setting it by the user every time the list repositories route is visited
   * IMPORTANT: This flag does not belong in any way to this service nor this service should know anything about the
   * components it is used in.
   * Just took a shortcut to avoid including any local storage library or to create a new service for UI settings just
   * to store this flag.
   * @type {boolean}
   */
  private showAsCards = true;

  constructor(private http: Http) { }

  /**
   * Retrieves the github owned by a github user
   * @param {string} user The github login
   * @returns {Observable<Repo[]>}
   */
  fetchRepos(user: string): Observable<Repo[]> {
    const url = this.replacePlaceholders(this.reposUrl, { user });

    return this.http.get(url)
      .map((response) => response.json() as Repo[]);
  }

  /**
   * Retrieves the github repository details belonging to a github user
   * @param {string} repo The repository name
   * @param {string} user The github login
   * @returns {Observable<Repo>}
   */
  fetchRepoDetails(repo: string, user: string): Observable<Repo> {
    const url = this.replacePlaceholders(this.repoDetailsUrl, { repo, user });

    return this.http.get(url)
      .map((response) => response.json() as Repo);
  }

  /**
   * Retrieves the github repository languages
   * @param {string} repo The repository name
   * @param {string} user The github login
   * @returns {Observable<RepoLanguage>}
   */
  fetchRepoLanguages(repo: string, user: string): Observable<RepoLanguage> {
    const url = this.replacePlaceholders(this.repoLanguagesUrl, { repo, user });

    return this.http.get(url)
      .map((response) => response.json() as RepoLanguage);
  }

  /**
   * Gets the show repos as cards
   * @returns {boolean}
   */
  getShowReposAsCards(): boolean {
    return this.showAsCards;
  }

  /**
   * Stores the show repositories as cards flag
   * @param {boolean} value
   * @returns {GithubService}
   */
  setShowReposAsCards(value: boolean): GithubService {
    this.showAsCards = Boolean(value);

    return this;
  }

  /**
   * Builds a url by replacing the url placeholder
   * @param {string} url The input url
   * @param {Object} placeholders The placeholders mapping
   * @returns {string}
   */
  private replacePlaceholders(url: string, placeholders: object): string {
    return Object.keys(placeholders)
      .reduce((acc, key) => acc.replace(new RegExp(`:${key}`, 'g'), placeholders[key] || ''), url);
  }
}
