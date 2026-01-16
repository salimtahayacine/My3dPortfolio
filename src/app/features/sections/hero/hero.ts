import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.animateHero();
  }

  private animateHero(): void {
    // Create GSAP timeline for hero animations
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate title with split text effect
    tl.from(this.heroTitle.nativeElement, {
      y: 100,
      opacity: 0,
      duration: 1,
      delay: 0.3
    });

    // Animate subtitle
    tl.from(this.heroSubtitle.nativeElement, {
      y: 50,
      opacity: 0,
      duration: 0.8
    }, '-=0.5');
  }
}
