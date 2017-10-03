import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

import { RepoDetailsComponent } from './repo-details.component';
import { GithubService } from '../github.service';

describe('RepoDetailsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RepoDetailsComponent
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
    const fixture = TestBed.createComponent(RepoDetailsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
