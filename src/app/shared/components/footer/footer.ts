import { Component } from '@angular/core';
import { ScrollService } from '../../../core/scroll/scroll.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  currentYear = new Date().getFullYear();

  navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  socialLinks = [
    { url: 'https://www.linkedin.com/in/taha-yacine-salim-4606a8225', label: 'LinkedIn' },
    { url: 'https://www.facebook.com/tahayacine.salim', label: 'Facebook' },
    { url: 'https://www.instagram.com/stronglover', label: 'Instagram' },
  ];

  constructor(private scrollService: ScrollService) {}

  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();
    this.scrollService.scrollToSection(sectionId);
  }
}
