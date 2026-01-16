import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDataService } from '../../../core/services/profile-data.service';
import { Education } from '../../../core/models';
import { DateUtils } from '../../../shared/utils/date.utils';

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
    return DateUtils.formatDate(date);
  }
}
