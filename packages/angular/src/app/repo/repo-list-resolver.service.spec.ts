import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, XHRBackend } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { RepoListResolverService } from './repo-list-resolver.service';
import { GithubService } from './github.service';

describe('RepoListResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule
      ],
      providers: [
        RepoListResolverService,
        GithubService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([RepoListResolverService], (service: RepoListResolverService) => {
    expect(service).toBeTruthy();
  }));
});
