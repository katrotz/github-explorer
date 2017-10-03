import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, XHRBackend } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { RepoLanguagesResolverService } from './repo-languages-resolver.service';
import { GithubService } from './github.service';

describe('RepoLanguagesResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule
      ],
      providers: [
        RepoLanguagesResolverService,
        GithubService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([RepoLanguagesResolverService], (service: RepoLanguagesResolverService) => {
    expect(service).toBeTruthy();
  }));
});
