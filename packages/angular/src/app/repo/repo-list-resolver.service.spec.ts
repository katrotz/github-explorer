import { TestBed, inject } from '@angular/core/testing';

import { RepoListResolverService } from './repo-list-resolver.service';

describe('RepoListResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepoListResolverService]
    });
  });

  it('should be created', inject([RepoListResolverService], (service: RepoListResolverService) => {
    expect(service).toBeTruthy();
  }));
});
