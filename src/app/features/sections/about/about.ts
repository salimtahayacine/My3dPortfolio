import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDataService } from '../../../core/services/profile-data.service';
import { Education } from '../../../core/models';
import { DateUtils } from '../../../shared/utils/date.utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit, AfterViewInit {
  @ViewChildren('educationCard') educationCards!: QueryList<ElementRef>;
  
  education: Education[] = [];

  constructor(private profileDataService: ProfileDataService) {}

  ngOnInit(): void {
    this.profileDataService.getEducation().subscribe(data => {
      this.education = data;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.animateAbout(), 100);
  }

  formatDate(date: Date | undefined): string {
    return DateUtils.formatDate(date);
  }

  private animateAbout(): void {
    // Animate section title
    gsap.from('.about-section h2', {
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    // Animate intro text
    gsap.from('.intro-text', {
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 75%',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out'
    });

    // Animate education cards
    const cards = this.educationCards.toArray().map(ref => ref.nativeElement);
    if (cards.length > 0) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: '.education-timeline',
          start: 'top 75%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }
  }
}
