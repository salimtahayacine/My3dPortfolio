import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDataService } from '../../../core/services/profile-data.service';
import { Experience as ExperienceModel } from '../../../core/models';

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience implements OnInit {
  experiences: ExperienceModel[] = [];

  constructor(private profileDataService: ProfileDataService) {}

  ngOnInit(): void {
    this.profileDataService.getExperience().subscribe(data => {
      this.experiences = data;
    });
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' });
  }
}
