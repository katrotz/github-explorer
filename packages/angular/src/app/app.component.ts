import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ]
})
export class AppComponent {
  constructor(private router: Router) {}

  /**
   * Callback that reacts on github user change in the app header
   * @param {string} githubLogin The new github user
   * @returns {boolean}
   */
  onGithubLoginChange(githubLogin: string): boolean {
    this.router.navigate(['/repos', githubLogin]);

    return false;
  }
}
