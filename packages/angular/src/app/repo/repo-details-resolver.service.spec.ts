import { TestBed, inject } from '@angular/core/testing';

import { RepoDetailsResolverService } from './repo-details-resolver.service';

describe('RepoDetailsResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepoDetailsResolverService]
    });
  });

  it('should be created', inject([RepoDetailsResolverService], (service: RepoDetailsResolverService) => {
    expect(service).toBeTruthy();
  }));
});
