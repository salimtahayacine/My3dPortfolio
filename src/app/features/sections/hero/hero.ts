import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnInit, AfterViewInit {
  @ViewChild('heroTitle') heroTitle!: ElementRef;
  @ViewChild('heroSubtitle') heroSubtitle!: ElementRef;
  @ViewChild('heroImage') heroImage!: ElementRef;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.animateHero();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollY = window.scrollY;
    const heroImageElement = this.heroImage.nativeElement;
    
    // Parallax effect: image moves slower than scroll
    const parallaxSpeed = 0.5;
    heroImageElement.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
    
    // Fade out effect as user scrolls
    const opacity = Math.max(0, 1 - scrollY / 500);
    heroImageElement.style.opacity = opacity.toString();
  }

  private animateHero(): void {
    // Create GSAP timeline for hero animations
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate hero image
    tl.from(this.heroImage.nativeElement, {
      scale: 0.8,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });

    // Animate title with split text effect
    tl.from(this.heroTitle.nativeElement, {
      y: 100,
      opacity: 0,
      duration: 1,
      delay: 0.3
    }, '-=0.8');

    // Animate subtitle
    tl.from(this.heroSubtitle.nativeElement, {
      y: 50,
      opacity: 0,
      duration: 0.8
    }, '-=0.5');
  }
}
