// app.component.ts
import { Component } from '@angular/core';
import { SplitPaneComponent } from './split-pane.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SplitPaneComponent],
  template: `
    <app-split-pane>
      <div leftPane>
        <!-- Left pane content -->
        <h2>Left Panel</h2>
        <p>This is the left panel content</p>
      </div>
      <div rightPane>
        <!-- Right pane content -->
        <h2>Right Panel</h2>
        <p>This is the right panel content</p>
      </div>
    </app-split-pane>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
    }
  `]
})
export class AppComponent {}

