import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  title = input<string>('');
  variant = input<'default' | 'elevated' | 'outlined'>('default');
}
