import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDataService } from '../../../core/services/profile-data.service';
import { Education } from '../../../core/models';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {
  education: Education[] = [];

  constructor(private profileDataService: ProfileDataService) {}

  ngOnInit(): void {
    this.profileDataService.getEducation().subscribe(data => {
      this.education = data;
    });
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' });
  }
}
