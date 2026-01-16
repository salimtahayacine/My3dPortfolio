import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDataService } from '../../../core/services/profile-data.service';
import { Project } from '../../../core/models';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit {
  projects: Project[] = [];

  constructor(private profileDataService: ProfileDataService) {}

  ngOnInit(): void {
    this.profileDataService.getProjects().subscribe(data => {
      this.projects = data;
    });
  }
}
