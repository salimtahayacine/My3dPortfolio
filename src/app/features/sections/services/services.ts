import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDataService } from '../../../core/services/profile-data.service';
import { Service } from '../../../core/models';

@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services implements OnInit {
  services: Service[] = [];

  constructor(private profileDataService: ProfileDataService) {}

  ngOnInit(): void {
    this.profileDataService.getServices().subscribe(data => {
      this.services = data;
    });
  }
}
