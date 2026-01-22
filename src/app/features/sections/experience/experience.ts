import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDataService } from '../../../core/services/profile-data.service';
import { Experience as ExperienceModel } from '../../../core/models';
import { DateUtils } from '../../../shared/utils/date.utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience implements OnInit, AfterViewInit {
  @ViewChildren('experienceCard') experienceCards!: QueryList<ElementRef>;
  
  experiences: ExperienceModel[] = [];

  constructor(private profileDataService: ProfileDataService) {}

  ngOnInit(): void {
    this.profileDataService.getExperience().subscribe(data => {
      this.experiences = data;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.animateExperience(), 100);
  }

  formatDate(date: Date | undefined): string {
    return DateUtils.formatDate(date);
  }

  private animateExperience(): void {
    // Animate section title
    gsap.from('.experience-section h2', {
      scrollTrigger: {
        trigger: '.experience-section',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    // Animate timeline cards with glow effect
    const cards = this.experienceCards.toArray().map(ref => ref.nativeElement);
    if (cards.length > 0) {
      cards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          x: index % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });

        // Add glow effect on scroll
        ScrollTrigger.create({
          trigger: card,
          start: 'top 80%',
          end: 'bottom 20%',
          onEnter: () => card.classList.add('glow-active'),
          onLeave: () => card.classList.remove('glow-active'),
          onEnterBack: () => card.classList.add('glow-active'),
          onLeaveBack: () => card.classList.remove('glow-active'),
        });
      });
    }
  }
}
