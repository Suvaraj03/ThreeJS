import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SheetModel } from './sheet-model/sheet-model';

@Component({
  selector: 'app-root',
  imports: [SheetModel],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('trumpf');
}
