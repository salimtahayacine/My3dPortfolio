import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent, Subscription } from 'rxjs';
import { throttleTime, map, distinctUntilChanged } from 'rxjs/operators';

export interface ScrollState {
  currentSection: string;
  scrollProgress: number;
  sectionIndex: number;
}

@Injectable({
  providedIn: 'root'
})
export class ScrollService implements OnDestroy {
  private sections: string[] = ['hero', 'about', 'experience', 'projects', 'services', 'contact'];
  private scrollStateSubject = new BehaviorSubject<ScrollState>({
    currentSection: 'hero',
    scrollProgress: 0,
    sectionIndex: 0
  });
  private scrollSubscription?: Subscription;

  public scrollState$: Observable<ScrollState> = this.scrollStateSubject.asObservable();
  public currentSection$: Observable<string> = this.scrollState$.pipe(
    map(state => state.currentSection),
    distinctUntilChanged()
  );

  constructor() {
    this.initScrollListener();
  }

  /**
   * Initialize scroll event listener to track current section
   */
  private initScrollListener(): void {
    this.scrollSubscription = fromEvent(window, 'scroll')
      .pipe(
        throttleTime(100, undefined, { leading: true, trailing: true })
      )
      .subscribe(() => {
        this.updateScrollState();
      });
  }

  /**
   * Update scroll state based on current scroll position
   */
  private updateScrollState(): void {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Calculate overall scroll progress (0 to 1)
    const maxScroll = documentHeight - windowHeight;
    const scrollProgress = maxScroll > 0 ? scrollTop / maxScroll : 0;

    // Determine which section is currently in view
    let currentSection = 'hero';
    let sectionIndex = 0;
    let minDistance = Infinity;

    // Find the section closest to the viewport center
    for (let i = 0; i < this.sections.length; i++) {
      const element = document.getElementById(this.sections[i]);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const distance = Math.abs(elementCenter - viewportCenter);
        
        // Choose the section with center closest to viewport center
        if (distance < minDistance) {
          minDistance = distance;
          currentSection = this.sections[i];
          sectionIndex = i;
        }
      }
    }

    this.scrollStateSubject.next({
      currentSection,
      scrollProgress,
      sectionIndex
    });
  }

  /**
   * Scroll to a specific section
   */
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  /**
   * Get the current scroll state
   */
  getCurrentState(): ScrollState {
    return this.scrollStateSubject.value;
  }

  /**
   * Get list of all sections
   */
  getSections(): string[] {
    return [...this.sections];
  }

  /**
   * Cleanup subscriptions
   */
  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }
}
