import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoLanguageListComponent } from './repo-language-list.component';

describe('RepoLanguageListComponent', () => {
  let component: RepoLanguageListComponent;
  let fixture: ComponentFixture<RepoLanguageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoLanguageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoLanguageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
