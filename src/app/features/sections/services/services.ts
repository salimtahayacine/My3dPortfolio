import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDataService } from '../../../core/services/profile-data.service';
import { Service } from '../../../core/models';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services implements OnInit, AfterViewInit {
  @ViewChildren('serviceCard') serviceCards!: QueryList<ElementRef>;
  
  services: Service[] = [];

  constructor(private profileDataService: ProfileDataService) {}

  ngOnInit(): void {
    this.profileDataService.getServices().subscribe(data => {
      this.services = data;
    });
  }

  ngAfterViewInit(): void {
    // Small delay to ensure DOM is ready
    setTimeout(() => this.animateServices(), 100);
  }

  private animateServices(): void {
    // Animate section title
    gsap.from('.services-section h2', {
      scrollTrigger: {
        trigger: '.services-section',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    // Animate service cards with stagger
    const cards = this.serviceCards.toArray().map(ref => ref.nativeElement);
    if (cards.length > 0) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 75%',
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }
  }
}
