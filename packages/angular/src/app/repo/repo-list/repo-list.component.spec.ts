import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

import { RepoListComponent } from './repo-list.component';
import { GithubService } from '../github.service';

describe('RepoListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RepoListComponent
      ],
      imports: [
        HttpModule,
        RouterTestingModule
      ],
      providers: [
        GithubService
      ]
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(RepoListComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
