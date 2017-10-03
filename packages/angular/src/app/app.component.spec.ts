import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  it('should redirect to repositories listing on github user change', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const navigateSpy = spyOn(app.router, 'navigate');

    const githubUserInput = fixture.debugElement.query(By.css('#github_login'));
    const githubUserForm = fixture.debugElement.query(By.css('form.search'));

    const githubUser = 'heremaps';

    githubUserInput.nativeElement.setAttribute('value', 'heremaps');
    githubUserForm.triggerEventHandler('submit', {});

    fixture.detectChanges();

    expect(githubUserInput.nativeElement.getAttribute('value')).toBe(githubUser);
    expect(navigateSpy).toHaveBeenCalledWith(['/repos', githubUser]);
  }));
});
