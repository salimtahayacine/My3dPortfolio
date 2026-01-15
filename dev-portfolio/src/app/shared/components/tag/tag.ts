import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tag',
  imports: [],
  templateUrl: './tag.html',
  styleUrl: './tag.scss',
})
export class Tag {
  text = input<string>('Tag');
  variant = input<'primary' | 'secondary' | 'success' | 'warning' | 'error'>('primary');
  size = input<'sm' | 'md'>('md');
}
