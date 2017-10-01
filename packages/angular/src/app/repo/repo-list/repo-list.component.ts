import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Repo } from '../repo';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css'],

})
export class RepoListComponent implements OnInit {
  repos: Repo[];
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data
      .subscribe((data: {repos: Repo[]}) => {
        this.repos = data.repos;
      });
  }
}
