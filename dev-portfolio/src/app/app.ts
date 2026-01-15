import { Component, signal } from '@angular/core';
import { Layout } from './shared/components/layout/layout';

@Component({
  selector: 'app-root',
  imports: [Layout],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('dev-portfolio');
}
