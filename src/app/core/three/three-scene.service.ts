import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class ThreeSceneService {
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private animationFrameId: number | null = null;
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private interactiveObjects: THREE.Object3D[] = [];
  private hoveredObject: THREE.Object3D | null = null;

  constructor() {}

  /**
   * Initialize the Three.js scene with camera, renderer, and basic lighting
   */
  initScene(container: HTMLElement): void {
    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0a0a);

    // Create camera
    const aspect = container.clientWidth / container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    this.camera.position.z = 5;

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(this.renderer.domElement);

    // Add lights
    this.setupLights();

    // Add basic scene objects
    this.setupSceneObjects();

    // Start animation loop
    this.animate();
  }

  /**
   * Setup scene lighting
   */
  private setupLights(): void {
    if (!this.scene) return;

    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    // Directional light for shadows and definition
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);

    // Point light for accent
    const pointLight = new THREE.PointLight(0x3b82f6, 1, 100);
    pointLight.position.set(-5, 5, 5);
    this.scene.add(pointLight);
  }

  /**
   * Setup basic scene objects (room, desk, panels, etc.)
   */
  private setupSceneObjects(): void {
    if (!this.scene) return;

    // Create a simple rotating cube as a placeholder
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x3b82f6,
      metalness: 0.5,
      roughness: 0.5
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.name = 'interactive-cube';
    this.scene.add(cube);
    this.interactiveObjects.push(cube);

    // Add wireframe sphere
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8b5cf6,
      wireframe: true
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(-2, 0, 0);
    sphere.name = 'interactive-sphere';
    this.scene.add(sphere);
    this.interactiveObjects.push(sphere);

    // Add torus
    const torusGeometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xec4899,
      metalness: 0.7,
      roughness: 0.3
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(2, 0, 0);
    torus.name = 'interactive-torus';
    this.scene.add(torus);
    this.interactiveObjects.push(torus);
  }

  /**
   * Animation loop
   */
  private animate = (): void => {
    if (!this.scene || !this.camera || !this.renderer) return;

    this.animationFrameId = requestAnimationFrame(this.animate);

    // Rotate objects
    this.scene.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.name.startsWith('interactive-')) {
        child.rotation.x += 0.01;
        child.rotation.y += 0.01;
      }
    });

    this.renderer.render(this.scene, this.camera);
  };

  /**
   * Handle window resize
   */
  onResize(width: number, height: number): void {
    if (!this.camera || !this.renderer) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  /**
   * Handle mouse move for raycasting
   */
  onMouseMove(event: MouseEvent, container: HTMLElement): void {
    if (!this.camera || !this.scene) return;

    const rect = container.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Update raycaster
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveObjects, false);

    // Reset previous hover
    if (this.hoveredObject) {
      this.resetObjectHover(this.hoveredObject);
      this.hoveredObject = null;
    }

    // Apply hover effect to intersected object
    if (intersects.length > 0) {
      this.hoveredObject = intersects[0].object;
      this.applyObjectHover(this.hoveredObject);
      container.style.cursor = 'pointer';
    } else {
      container.style.cursor = 'default';
    }
  }

  /**
   * Handle mouse click for interaction
   */
  onClick(event: MouseEvent, container: HTMLElement): void {
    if (!this.camera || !this.scene) return;

    const rect = container.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveObjects, false);

    if (intersects.length > 0) {
      const object = intersects[0].object;
      console.log('Clicked on:', object.name);
      // TODO: Emit event or trigger section navigation based on object
    }
  }

  /**
   * Apply hover effect to object
   */
  private applyObjectHover(object: THREE.Object3D): void {
    if (object instanceof THREE.Mesh && object.material instanceof THREE.MeshStandardMaterial) {
      object.material.emissive.setHex(0x444444);
      object.scale.set(1.1, 1.1, 1.1);
    }
  }

  /**
   * Reset object hover effect
   */
  private resetObjectHover(object: THREE.Object3D): void {
    if (object instanceof THREE.Mesh && object.material instanceof THREE.MeshStandardMaterial) {
      object.material.emissive.setHex(0x000000);
      object.scale.set(1, 1, 1);
    }
  }

  /**
   * Highlight a specific section (for scroll synchronization)
   */
  highlightSection(sectionName: string): void {
    console.log('Highlighting section:', sectionName);
    // TODO: Implement section-specific 3D animations
  }

  /**
   * Focus camera on specific area
   */
  focusOn(target: string): void {
    console.log('Focusing on:', target);
    // TODO: Animate camera to focus on specific object/area
  }

  /**
   * Cleanup on component destroy
   */
  dispose(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    if (this.renderer) {
      this.renderer.dispose();
    }

    if (this.scene) {
      this.scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });
    }

    this.scene = null;
    this.camera = null;
    this.renderer = null;
  }
}
