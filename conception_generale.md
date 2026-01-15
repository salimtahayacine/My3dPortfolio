
Objectif: portfolio 3D moderne, fluide sur desktop, acceptable sur mobile, facile à maintenir et à déployer. [awwwards](https://www.awwwards.com/websites/three-js/)

- Tech stack:
  - Angular 17+ (routing, lazy loading, standalone components). [geeksforgeeks](https://www.geeksforgeeks.org/angular-js/folder-structure-of-angular-project/)
  - Three.js pour la scène 3D principale (room, avatar, orbits, cartes projets). [threejs](https://threejs.org)
  - GSAP/ScrollTrigger ou équivalent pour lier scroll et animations 3D (optionnel mais recommandé). [discourse.threejs](https://discourse.threejs.org/t/interactive-3d-portfolio-scroll-experience/46109)
- Pages/sections:
  - Hero 3D (ton avatar + éléments cliquables: Projects, Experience, Services). [discourse.threejs](https://discourse.threejs.org/t/interactive-3d-portfolio-scroll-experience/46109)
  - About / Education.
  - Professional Experience.
  - Projects (cartes avec tags stack).
  - Services & Skills.
  - Contact (form + liens sociaux).
- Structure Angular recommandée:
  - `core/` (services globaux: theme, scroll, analytics).
  - `shared/` (UI réutilisable: buttons, cards, loaders).
  - `features/three-scene/` (toute la logique Three.js).
  - `features/sections/` (about, experience, projects, services, contact). [itnext](https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7)
