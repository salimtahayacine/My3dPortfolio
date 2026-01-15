import { 
  Component, 
  ElementRef, 
  ViewChild, 
  AfterViewInit, 
  OnDestroy,
  HostListener
} from '@angular/core';
import { ThreeSceneService } from '../../core/three/three-scene.service';

@Component({
  selector: 'app-three-scene',
  standalone: true,
  imports: [],
  templateUrl: './three-scene.html',
  styleUrls: ['./three-scene.scss']
})
export class ThreeSceneComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sceneContainer', { static: false }) 
  sceneContainer!: ElementRef<HTMLDivElement>;

  constructor(private threeSceneService: ThreeSceneService) {}

  ngAfterViewInit(): void {
    // Initialize the Three.js scene
    this.threeSceneService.initScene(this.sceneContainer.nativeElement);
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    const container = this.sceneContainer.nativeElement;
    this.threeSceneService.onResize(container.clientWidth, container.clientHeight);
  }

  onMouseMove(event: MouseEvent): void {
    this.threeSceneService.onMouseMove(event, this.sceneContainer.nativeElement);
  }

  onClick(event: MouseEvent): void {
    this.threeSceneService.onClick(event, this.sceneContainer.nativeElement);
  }

  ngOnDestroy(): void {
    this.threeSceneService.dispose();
  }
}
