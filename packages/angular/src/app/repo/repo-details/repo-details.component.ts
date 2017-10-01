import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Repo } from '../repo';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.css']
})
export class RepoDetailsComponent implements OnInit {
  repo: Repo;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data
      .subscribe((data: {repo: Repo}) => {
        this.repo = data.repo;
      });
  }
}
