import { Injectable, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { ScrollService } from '../scroll/scroll.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThreeSceneService implements OnDestroy {
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private animationFrameId: number | null = null;
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private interactiveObjects: THREE.Object3D[] = [];
  private hoveredObject: THREE.Object3D | null = null;
  private scrollSubscription?: Subscription;
  private lights: {
    ambient?: THREE.AmbientLight;
    directional?: THREE.DirectionalLight;
    point?: THREE.PointLight;
  } = {};
  
  // Camera animation properties
  private targetCameraPosition = new THREE.Vector3(0, 0, 5);
  private targetCameraRotation = new THREE.Euler(0, 0, 0);
  private isMobile: boolean = false;
  private isTabActive: boolean = true;

  constructor(private scrollService: ScrollService) {
    this.isMobile = this.detectMobile();
    this.setupVisibilityListener();
  }

  /**
   * Setup visibility change listener to pause animation when tab is inactive
   */
  private setupVisibilityListener(): void {
    document.addEventListener('visibilitychange', () => {
      this.isTabActive = !document.hidden;
      
      if (this.isTabActive) {
        // Resume animation when tab becomes active
        if (!this.animationFrameId) {
          this.animate();
        }
      } else {
        // Pause animation when tab becomes inactive
        if (this.animationFrameId !== null) {
          cancelAnimationFrame(this.animationFrameId);
          this.animationFrameId = null;
        }
      }
    });
  }

  /**
   * Detect if the device is mobile
   */
  private detectMobile(): boolean {
    return window.innerWidth < 768 || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

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
    // Use antialias conditionally for better performance on lower-end devices
    const useAntialias = !this.isMobile && window.devicePixelRatio <= 2;
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: useAntialias,
      alpha: true 
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    // Reduce pixel ratio on mobile for better performance
    const pixelRatio = this.isMobile ? 1 : Math.min(window.devicePixelRatio, 2);
    this.renderer.setPixelRatio(pixelRatio);
    container.appendChild(this.renderer.domElement);

    // Add lights
    this.setupLights();

    // Add basic scene objects
    this.setupSceneObjects();

    // Subscribe to scroll changes
    this.subscribeToScroll();

    // Start animation loop
    this.animate();
  }

  /**
   * Setup scene lighting
   */
  private setupLights(): void {
    if (!this.scene) return;

    // Ambient light for overall illumination
    this.lights.ambient = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(this.lights.ambient);

    // Directional light for shadows and definition
    this.lights.directional = new THREE.DirectionalLight(0xffffff, 1);
    this.lights.directional.position.set(5, 5, 5);
    this.scene.add(this.lights.directional);

    // Point light for accent
    this.lights.point = new THREE.PointLight(0x3b82f6, 1, 100);
    this.lights.point.position.set(-5, 5, 5);
    this.scene.add(this.lights.point);
  }

  /**
   * Setup modern 3D objects inspired by Awwwards portfolios
   */
  private setupSceneObjects(): void {
    if (!this.scene) return;

    // On mobile, use simpler geometries with lower detail
    const detail = this.isMobile ? 0 : 1;

    // 1. Central Icosahedron - Modern geometric shape
    const icoGeometry = new THREE.IcosahedronGeometry(1, detail);
    const icoMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x3b82f6,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x1e3a8a,
      emissiveIntensity: 0.2
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    icosahedron.name = 'interactive-icosahedron';
    this.scene.add(icosahedron);
    this.interactiveObjects.push(icosahedron);

    // 2. Floating Octahedron - Abstract shape
    const octaGeometry = new THREE.OctahedronGeometry(0.7, detail);
    const octaMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8b5cf6,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.3
    });
    const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
    octahedron.position.set(-2.5, 1, 0);
    octahedron.name = 'interactive-octahedron';
    this.scene.add(octahedron);
    this.interactiveObjects.push(octahedron);

    // 3. Ring System - Popular in modern portfolios
    const torusDetail = this.isMobile ? 8 : 16;
    const ringGeometry = new THREE.TorusGeometry(0.8, 0.08, torusDetail, 64);
    const ringMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xec4899,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x831843,
      emissiveIntensity: 0.4
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.set(2.5, -0.5, 0);
    ring.rotation.x = Math.PI / 4;
    ring.name = 'interactive-ring';
    this.scene.add(ring);
    this.interactiveObjects.push(ring);

    // 4. Dodecahedron - Complex geometric form (skip on mobile)
    if (!this.isMobile) {
      const dodecaGeometry = new THREE.DodecahedronGeometry(0.6, detail);
      const dodecaMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x10b981,
        metalness: 0.7,
        roughness: 0.3,
        wireframe: true
      });
      const dodecahedron = new THREE.Mesh(dodecaGeometry, dodecaMaterial);
      dodecahedron.position.set(0, -2, -1);
      dodecahedron.name = 'interactive-dodecahedron';
      this.scene.add(dodecahedron);
      this.interactiveObjects.push(dodecahedron);
    }

    // 5. Nested rings - Double ring system
    const ring2Geometry = new THREE.TorusGeometry(0.8, 0.06, torusDetail, 64);
    const ring2Material = new THREE.MeshStandardMaterial({ 
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x78350f,
      emissiveIntensity: 0.3
    });
    const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
    ring2.position.set(2.5, -0.5, 0);
    ring2.rotation.x = Math.PI / 4;
    ring2.rotation.y = Math.PI / 2;
    ring2.name = 'interactive-ring2';
    this.scene.add(ring2);
    this.interactiveObjects.push(ring2);
  }

  /**
   * Subscribe to scroll changes and update scene accordingly
   */
  private subscribeToScroll(): void {
    this.scrollSubscription = this.scrollService.currentSection$.subscribe(
      (section: string) => {
        this.highlightSection(section);
      }
    );
  }

  /**
   * Animation loop
   */
  private animate = (): void => {
    if (!this.scene || !this.camera || !this.renderer || !this.isTabActive) return;

    this.animationFrameId = requestAnimationFrame(this.animate);

    // Smoothly interpolate camera position
    if (this.camera.position.distanceTo(this.targetCameraPosition) > 0.01) {
      this.camera.position.lerp(this.targetCameraPosition, 0.05);
    }

    // Smoothly interpolate camera rotation
    this.camera.rotation.x += (this.targetCameraRotation.x - this.camera.rotation.x) * 0.05;
    this.camera.rotation.y += (this.targetCameraRotation.y - this.camera.rotation.y) * 0.05;

    // Rotate objects (slower on mobile for better performance)
    const rotationSpeed = this.isMobile ? 0.005 : 0.01;
    this.scene.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.name.startsWith('interactive-')) {
        child.rotation.x += rotationSpeed;
        child.rotation.y += rotationSpeed;
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
      
      // Map 3D objects to sections
      let targetSection = '';
      switch (object.name) {
        case 'interactive-icosahedron':
          targetSection = 'about';
          break;
        case 'interactive-octahedron':
          targetSection = 'projects';
          break;
        case 'interactive-ring':
        case 'interactive-ring2':
          targetSection = 'services';
          break;
        case 'interactive-dodecahedron':
          targetSection = 'experience';
          break;
      }

      if (targetSection) {
        this.scrollService.scrollToSection(targetSection);
      }
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
    if (!this.camera || !this.lights.point) return;

    // Update camera position and lighting based on section
    switch (sectionName) {
      case 'hero':
        this.targetCameraPosition.set(0, 0, 5);
        this.targetCameraRotation.set(0, 0, 0);
        this.lights.point.color.setHex(0x3b82f6); // Blue
        this.lights.point.intensity = 1;
        break;

      case 'about':
        this.targetCameraPosition.set(-2, 0, 5);
        this.targetCameraRotation.set(0, 0.3, 0);
        this.lights.point.color.setHex(0x8b5cf6); // Purple
        this.lights.point.intensity = 1.2;
        break;

      case 'experience':
        this.targetCameraPosition.set(2, 1, 5);
        this.targetCameraRotation.set(-0.2, -0.3, 0);
        this.lights.point.color.setHex(0xec4899); // Pink
        this.lights.point.intensity = 1.3;
        break;

      case 'projects':
        this.targetCameraPosition.set(0, -1, 6);
        this.targetCameraRotation.set(0.15, 0, 0);
        this.lights.point.color.setHex(0x10b981); // Green
        this.lights.point.intensity = 1.5;
        break;

      case 'services':
        this.targetCameraPosition.set(-1, 1, 5);
        this.targetCameraRotation.set(-0.15, 0.2, 0);
        this.lights.point.color.setHex(0xf59e0b); // Amber
        this.lights.point.intensity = 1.4;
        break;

      case 'contact':
        this.targetCameraPosition.set(0, 0, 4);
        this.targetCameraRotation.set(0, 0, 0);
        this.lights.point.color.setHex(0xef4444); // Red
        this.lights.point.intensity = 1.6;
        break;

      default:
        this.targetCameraPosition.set(0, 0, 5);
        this.targetCameraRotation.set(0, 0, 0);
    }
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
    // Unsubscribe from scroll events
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }

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
          // Handle both single material and array of materials
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });
    }

    this.scene = null;
    this.camera = null;
    this.renderer = null;
  }

  ngOnDestroy(): void {
    this.dispose();
  }
}
