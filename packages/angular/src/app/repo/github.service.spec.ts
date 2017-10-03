import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, XHRBackend } from '@angular/http';

import { RepoDetailsResolverService } from './repo-details-resolver.service';
import { GithubService } from './github.service';

describe('RepoDetailsResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        GithubService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([GithubService], (service: GithubService) => {
    expect(service).toBeTruthy();
  }));
});
