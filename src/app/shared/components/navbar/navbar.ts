import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../../core/scroll/scroll.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit, AfterViewInit {
  @ViewChildren('navLink') navLinks!: QueryList<ElementRef>;
  
  activeSection: string = 'hero';
  isScrolled: boolean = false;
  
  navItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' }
  ];

  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {
    // Subscribe to current section changes
    this.scrollService.currentSection$.subscribe(section => {
      this.activeSection = section;
    });
  }

  ngAfterViewInit(): void {
    this.animateNavbar();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  scrollToSection(sectionId: string): void {
    this.scrollService.scrollToSection(sectionId);
  }

  isActive(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }

  private animateNavbar(): void {
    // Animate navbar entrance with stagger effect
    gsap.from('.navbar', {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    // Stagger animation for nav links
    const linkElements = this.navLinks.toArray().map(ref => ref.nativeElement);
    gsap.from(linkElements, {
      y: -20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.3
    });
  }
}
