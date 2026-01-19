import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { gsap } from 'gsap';
import Typed from 'typed.js';

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
    @ViewChild('typedElement') typedElement!: ElementRef;


  private readonly PARALLAX_SPEED = 0.5;
  private readonly FADE_DISTANCE = 500;
  private typed: Typed | undefined;


  ngOnInit(): void {
  }
  initTyped(): void {
    const options = {
      strings: [
        'Front-end Developer',
        'Back-end Developer',
        'Mobile Developer',
        'Designer'
      ],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    };

    this.typed = new Typed('.typed', options);
  }

  ngAfterViewInit(): void {
    this.animateHero();
    this.initTyped();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (!this.heroImage?.nativeElement) return;
    
    const scrollY = window.scrollY;
    const heroImageElement = this.heroImage.nativeElement;
    
    // Parallax effect: image moves slower than scroll
    heroImageElement.style.transform = `translateY(${scrollY * this.PARALLAX_SPEED}px)`;
    
    // Fade out effect as user scrolls
    const opacity = Math.max(0, 1 - scrollY / this.FADE_DISTANCE);
    heroImageElement.style.opacity = opacity.toString();
  }

  private animateHero(): void {
    // Create GSAP timeline for hero animations
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate hero image
    if (this.heroImage?.nativeElement) {
      tl.from(this.heroImage.nativeElement, {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      });
    }

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

  ngOnDestroy(): void {
    if (this.typed) {
      this.typed.destroy();
    }
  }

}
