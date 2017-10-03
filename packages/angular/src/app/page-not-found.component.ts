import { Component } from '@angular/core';

@Component({
  template: `<div class="row not-found-wrapper flex-items-xs-middle flex-items-xs-center">
    <div class="col-xs-4 align-center">
      <h1>404</h1>
      <p>Page not found <a [routerLink]="['/']">I am feeling lucky</a></p>
    </div>
  </div>`,
  styles: [
    '.not-found-wrapper {}',
    '.align-center {text-align: center;}'
  ]
})
export class PageNotFoundComponent {}
