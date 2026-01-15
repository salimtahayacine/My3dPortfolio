import { Component } from '@angular/core';
import { Hero } from '../sections/hero/hero';
import { About } from '../sections/about/about';
import { Experience } from '../sections/experience/experience';
import { Projects } from '../sections/projects/projects';
import { Services } from '../sections/services/services';
import { Contact } from '../sections/contact/contact';

@Component({
  selector: 'app-home',
  imports: [Hero, About, Experience, Projects, Services, Contact],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
