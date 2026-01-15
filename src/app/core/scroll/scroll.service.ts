import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { throttleTime, map, distinctUntilChanged } from 'rxjs/operators';

export interface ScrollState {
  currentSection: string;
  scrollProgress: number;
  sectionIndex: number;
}

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private sections: string[] = ['hero', 'about', 'experience', 'projects', 'services', 'contact'];
  private scrollStateSubject = new BehaviorSubject<ScrollState>({
    currentSection: 'hero',
    scrollProgress: 0,
    sectionIndex: 0
  });

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
    fromEvent(window, 'scroll')
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

    for (let i = 0; i < this.sections.length; i++) {
      const element = document.getElementById(this.sections[i]);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        // Section is considered active if its top is in the upper half of the viewport
        if (elementTop <= windowHeight / 2 && elementTop + elementHeight > windowHeight / 2) {
          currentSection = this.sections[i];
          sectionIndex = i;
          break;
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
}
