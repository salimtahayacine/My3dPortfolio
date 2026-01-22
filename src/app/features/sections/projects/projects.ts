import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChildren, QueryList, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDataService } from '../../../core/services/profile-data.service';
import { Project } from '../../../core/models';
import { Subject, takeUntil } from 'rxjs';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef>;
  
  projects: Project[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private profileDataService: ProfileDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.profileDataService.getProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.projects = data;
        this.cdr.markForCheck();
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.animateProjects(), 100);
  }

  private animateProjects(): void {
    // Animate section title
    gsap.from('.projects-section h2', {
      scrollTrigger: {
        trigger: '.projects-section',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    // Animate project cards with stagger
    const cards = this.projectCards.toArray().map(ref => ref.nativeElement);
    if (cards.length > 0) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 75%',
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
