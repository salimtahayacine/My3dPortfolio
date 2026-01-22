import { Component, AfterViewInit, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProfileData {
  socialLinks: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    skype?: string;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
  };
}

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact implements AfterViewInit, OnInit, OnDestroy {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  formSubmitted = false;
  formError = false;

  socialLinks: Array<{ name: string; url: string; icon: string }> = [];
  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadSocialLinks();
  }

  ngAfterViewInit(): void {
    this.animateContact();
  }

  private loadSocialLinks(): void {
    this.http.get<ProfileData>('/profile-data.json')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          const links = [];
          
          if (data.socialLinks.linkedin) {
            links.push({ 
              name: 'LinkedIn', 
              url: data.socialLinks.linkedin, 
              icon: '💼' 
            });
          }
          
          if (data.socialLinks.facebook) {
            links.push({ 
              name: 'Facebook', 
              url: data.socialLinks.facebook, 
              icon: '📘' 
            });
          }
          
          if (data.socialLinks.instagram) {
            links.push({ 
              name: 'Instagram', 
              url: data.socialLinks.instagram, 
              icon: '📸' 
            });
          }
          
          if (data.contact.email) {
            links.push({ 
              name: 'Email', 
              url: `mailto:${data.contact.email}`, 
              icon: '📧' 
            });
          }
          
          this.socialLinks = links;
        },
        error: (err) => {
          console.error('Error loading profile data:', err);
          // Fallback to default links
          this.socialLinks = [
            { name: 'Email', url: 'mailto:Salimtahayacine@gmail.com', icon: '📧' }
          ];
        }
      });
  }

  onSubmit(): void {
    if (this.validateForm()) {
      // EmailJS integration would go here
      console.log('Form submitted:', this.formData);
      this.formSubmitted = true;
      this.formError = false;
      
      // Reset form after 3 seconds
      setTimeout(() => {
        this.formSubmitted = false;
        this.formData = { name: '', email: '', message: '' };
      }, 3000);
    } else {
      this.formError = true;
    }
  }

  private validateForm(): boolean {
    const hasName = this.formData.name.trim().length > 0;
    const hasEmail = this.formData.email.trim().length > 0;
    const hasMessage = this.formData.message.trim().length > 0;
    const isEmailValid = this.isValidEmail(this.formData.email);
    
    return hasName && hasEmail && hasMessage && isEmailValid;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private animateContact(): void {
    // Animate section title
    gsap.from('.contact-section h2', {
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    // Animate form fields
    gsap.from('.form-group', {
      scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 75%',
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    });

    // Animate social links
    gsap.from('.social-link', {
      scrollTrigger: {
        trigger: '.social-links',
        start: 'top 85%',
      },
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
