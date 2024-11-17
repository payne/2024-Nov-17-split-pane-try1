
import { Component } from '@angular/core';
import { MenuFormComponent } from './menu-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuFormComponent],
  template: '<app-menu-form></app-menu-form>',
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
  `]
})
export class AppComponent {}

