import { Component, OnInit } from '@angular/core';
import { Hero } from '../sections/hero/hero';
import { About } from '../sections/about/about';
import { Experience } from '../sections/experience/experience';
import { Projects } from '../sections/projects/projects';
import { Services } from '../sections/services/services';
import { Contact } from '../sections/contact/contact';
import { ThreeSceneComponent } from '../three-scene/three-scene';
import { ScrollService } from '../../core/scroll/scroll.service';

@Component({
  selector: 'app-home',
  imports: [ThreeSceneComponent, Hero, About, Experience, Projects, Services, Contact],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {
    // ScrollService is automatically initialized via dependency injection
    // The scroll listener is set up in the service constructor
  }
}
