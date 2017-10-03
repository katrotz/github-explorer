import 'rxjs/add/operator/switchMap';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { Repo } from '../repo';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css'],

})
export class RepoListComponent implements OnDestroy, OnInit {
  /**
   * Subject object that allows to unsubscribe from all observables on component destroy
   * The component uses only routing observables which are automatically cleaned up by the framework,
   * trying to be explicit
   * @type {Subject<void>}
   */
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  /**
   * The github user
   */
  githubLogin: string;

  /**
   * The list of repos belonging to the githubLogin
   */
  repos: Repo[];

  /**
   * The list of filtered respositories
   */
  filteredRepos: Repo[];

  /**
   * The repositories filter
   */
  reposFilter: string;

  /**
   * Is the component in an error state.
   * TODO: Could be done more than that like displaying the error code|state|origin etc.
   * @type {boolean}
   */
  errorState = false;

  /**
   * Show the repositories as cards (alternatively show as table)
   * @type {boolean}
   */
  showAsCards = true;

  constructor(private route: ActivatedRoute, private githubService: GithubService) {}

  ngOnInit() {
    this.reposFilter = '';

    this.showAsCards = this.githubService.getShowReposAsCards();

    // Initialize the component from the resources resolved during routing
    this.route.data
      .takeUntil(this.ngUnsubscribe)
      .subscribe((data: {repos: Repo[] | Response}) => {
        this.setRepos(data.repos);
      });

    // Initialize the component with the routing parameters
    this.route.paramMap
      .takeUntil(this.ngUnsubscribe)
      .subscribe((params) => this.githubLogin = params.get('user'));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Sets the component error state. A failed request, an error or a boolean that marks the component as failed can be provided
   * @param {Response|Error|boolean} errorState
   * @returns {RepoListComponent}
   */
  setErrorState(errorState: Response | Error | boolean): RepoListComponent {
    if (errorState instanceof Response)
      this.errorState = !errorState.ok;
    else if (errorState instanceof Error)
      this.errorState = true;
    else
      this.errorState = Boolean(errorState);

    return this;
  }

  /**
   * Sets the repositories list bound to the component
   * @param {Repo[]} repos The repositories list
   * @returns {RepoListComponent}
   */
  setRepos(repos: Repo[] | Response): RepoListComponent {
    if (repos instanceof Response) {
      this.setErrorState(repos);
    } else {
      this.setErrorState(false);
    }

    this.repos = (repos instanceof Response) ? [] : repos;

    return this.updateFilteredRepos();
  }

  /**
   * Updates the filtered repositories bound to the component
   * @returns {RepoListComponent}
   */
  updateFilteredRepos(): RepoListComponent {
    this.filteredRepos = this.repos.filter((repo: Repo) => repo.name.includes(this.reposFilter));

    return this;
  }

  /**
   * Callback on repositories filter change
   * @param {string} value The repositories filter
   * @returns {boolean}
   */
  onSearchApply(value: string): boolean {
    this.reposFilter = value;
    this.updateFilteredRepos();

    return false;
  }

  /**
   * Stores the showAsCards flag
   * @param {boolean} value
   * @returns {RepoListComponent}
   */
  setShowAsCards(value: boolean): RepoListComponent {
    this.showAsCards = this.githubService
      .setShowReposAsCards(value)
      .getShowReposAsCards();

    return this;
  }
}
