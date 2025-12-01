import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pos-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="pos-layout">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .pos-layout {
      width: 100%;
      height: 100vh;
      overflow: hidden;
    }
  `]
})
export class PosLayoutComponent {}
