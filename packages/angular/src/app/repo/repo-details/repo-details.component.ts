import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { RepoDetails } from '../repo-details';
import { Repo } from '../repo';
import { RepoLanguage } from '../repo-language';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.css']
})
export class RepoDetailsComponent implements OnDestroy, OnInit {
  /**
   * Subject object that allows to unsubscribe from all observables on component destroy
   * The component uses only routing observables which are automatically cleaned up by the framework,
   * trying to be explicit
   * @type {Subject<void>}
   */
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  /**
   * The github repo languages
   */
  repoLanguages: Array<Object>;

  /**
   * The github repo object
   */
  repo: Repo;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Subscribe to the current active route data
    this.route.data
      .takeUntil(this.ngUnsubscribe)
      .subscribe((data: RepoDetails) => this.setRepo(data.repo).setLanguages(data.languages));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Updates the repo bound to the component
   * @param {Repo} repo
   * @returns {RepoDetailsComponent}
   */
  setRepo(repo: Repo): RepoDetailsComponent {
    this.repo = repo;

    return this;
  }

  /**
   * Updates the repo languages bound to the component
   * @param {RepoLanguage} languages
   * @returns {RepoDetailsComponent}
   */
  setLanguages(languages: RepoLanguage): RepoDetailsComponent {
    this.repoLanguages = [];

    const totalBytes = Object.keys(languages).reduce((acc, name) => (acc + languages[name]), 0);

    Object.keys(languages)
      .map((name) => {
        this.repoLanguages.push({
          name: name,
          bytes: languages[name],
          share: Math.round(10000 * languages[name] / totalBytes) / 100
        });
      });

    return this;
  }

  /**
   * Computes the CSS class for the issues label based on the issues count
   * @param {number} count The issues count
   * @returns {string}
   */
  issuesStatusClass(count: number): string {
    if (count === 0) return 'success';
    if (count < 5) return 'info';
    if (count < 10) return 'warning';
    if (count > 10) return 'danger';
  }
}
