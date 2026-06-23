import { Component, signal } from '@angular/core';
import { Cube } from './cube/cube';

@Component({
  selector: 'app-root',
  imports: [Cube],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('three-demo');
}
