# Portfolio 3D - Tasks Tracker

## 1. Phase 0 - Conception
- [x] Define project objectives and architecture
- [x] Document tech stack and structure
- [x] Create task breakdown

## 2. Phase 1 – Setup & base Angular

But: avoir un squelette Angular propre avant de toucher au 3D. [geeksforgeeks](https://www.geeksforgeeks.org/angular-js/folder-structure-of-angular-project/)

Tâches:

- [x] 1. Initialisation projet:
   - [x] `ng new dev-portfolio --routing --style=scss`.
   - [x] Configurer structure: `core/`, `shared/`, `features/sections`, `features/three-scene`. [itnext](https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7)
- [x] 2. Routing:
   - [x] Route racine `/` avec layout principal (navbar, footer, scroll container).
   - [x] Sections comme composants dans une page unique (type single-page scrolling).
- [x] 3. Design système:
   - [x] Palette de couleurs (clair/sombre).
   - [x] Typographie (1–2 fonts max).
   - [x] Composants UI réutilisables dans `shared/components` (primary-button, section-title, tag, card). [itnext](https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7)
- [x] 4. Content model:
   - [x] Créer des interfaces TypeScript:
     - [x] `Education`, `Experience`, `Project`, `Service`.
   - [x] Créer des fichiers JSON/TS statiques pour les données (pour ne pas les hardcoder dans les templates).

## 3. Phase 2 – Intégration Three.js dans Angular

But: une scène Three.js isolée dans un composant Angular, optimisée et maintenable. [dev](https://dev.to/renancferro/understanding-and-implementing-threejs-with-angular-and-creating-a-3d-animation-3eea)

Tâches:

- [ ] 1. Setup Three.js:
   - [ ] Installer `three`.
   - [ ] Créer `ThreeSceneComponent` dans `features/three-scene`.
   - [ ] Dans `ngAfterViewInit`, initialiser:
     - [ ] `Scene`, `PerspectiveCamera`, `WebGLRenderer`, lumières, resize handler. [threejs](https://threejs.org)
- [ ] 2. Architecture Three:
   - [ ] Créer un `ThreeSceneService` dans `core/three/` pour:
     - [ ] Gérer boucle d'animation (`requestAnimationFrame`).
     - [ ] Exposer des méthodes: `highlightSection('projects')`, `focusOn('experience')`, etc.
   - [ ] Séparer les "objets" de la scène:
     - [ ] `room`, `desk`, `screen`, `panels` (Projects, Experience, Services) dans des helpers/factories.
- [ ] 3. Modèles 3D:
   - [ ] Soit:
     - [ ] Modèles simples générés en code (BoxGeometry, SphereGeometry, PlaneGeometry). [threejs](https://threejs.org)
     - [ ] Soit importer des modèles `glTF` créés dans Blender via `GLTFLoader`. [threejs](https://threejs.org)
   - [ ] Ajouter basic materials + textures légères.
- [ ] 4. Interactions:
   - [ ] Raycasting sur les objets cliquables (ex: panel "Projects" => scroll vers section Projects).
   - [ ] Hover effects (change couleur/intensité, légère rotation).

## 4. Phase 3 – Scroll & synchronisation 3D / sections

But: rendre l'expérience cohérente: le scroll contrôle les sections ET certaines animations de la scène 3D. [youtube](https://www.youtube.com/watch?v=rbIbvw6c53k)

Tâches:

- [ ] 1. Scroll manager:
   - [ ] Créer un `ScrollService` dans `core/`:
     - [ ] Observables: `currentSection`, `scrollProgress`.
     - [ ] Méthodes: `scrollToSection('projects')`.
- [ ] 2. Liaison sections ↔ 3D:
   - [ ] Chaque section (about, experience, projects, services) s'abonne à `ScrollService` pour savoir si elle est active.
   - [ ] `ThreeSceneService` s'abonne aussi:
     - [ ] Quand `currentSection = 'projects'` => repositionner caméra, highlight panneaux projets, animer quelques éléments. [discourse.threejs](https://discourse.threejs.org/t/interactive-3d-portfolio-scroll-experience/46109)
- [ ] 3. GSAP/ScrollTrigger (optionnel mais puissant):
   - [ ] Attacher des timelines aux IDs des sections pour:
     - [ ] Rotations douces de la scène.
     - [ ] Changement de lumière/ambiance par section. [youtube](https://www.youtube.com/watch?v=rbIbvw6c53k)
- [ ] 4. Responsive:
   - [ ] Désactiver certains effets ou simplifier la scène sur mobile (moins d'objets, moins de particules).
   - [ ] Réduire résolution du renderer sur mobile pour les performances.

## 5. Phase 4 – Contenu: Education, Experience, Projects, Services

But: transformer le 3D "wow" en portfolio convaincant pour recruteurs/clients. [javascript.plainenglish](https://javascript.plainenglish.io/building-a-strong-angular-portfolio-beyond-code-samples-d0ec703daa32)

Tâches:

- [ ] 1. About & Education:
   - [ ] Section "À propos" claire: ton rôle (Fullstack JS/Java), stack principale (Angular, Spring Boot, React Native).
   - [ ] Timeline Education avec cards (école, formations en ligne, certificats).
- [ ] 2. Professional Experience:
   - [ ] Liste chronologique:
     - [ ] Titre, entreprise/projet, technologies, résultats mesurables (KPIs).
   - [ ] Intégrer e-commerce/dropshipping: stack utilisée, chiffres (commandes, taux de conversion si possible).
- [ ] 3. Projects:
   - [ ] Cards avec:
     - [ ] Titre, courte description, stack, rôle, lien GitHub/live.
   - [ ] Idée 3D: chaque projet = "carte" dans la scène; cliquer dessus ouvre la card dans l'UI 2D. [youtube](https://www.youtube.com/watch?v=FkowOdMjvYo)
- [ ] 4. Services & Skills:
   - [ ] Services (par ex: "Fullstack Web App", "E-commerce Store Setup", "Mobile App Prototype").
   - [ ] Skill tags: Angular, Spring Boot, PostgreSQL, Redis, Docker, CI/CD, etc.
- [ ] 5. Contact:
   - [ ] Formulaire (nom, email, message) + validations.
   - [ ] Boutons vers LinkedIn, GitHub, YouCan store, etc.

## 6. Phase 5 – Performance, UX & SEO

But: garder le "wow" 3D mais avec de bonnes perfs et un chargement rapide. [discourse.threejs](https://discourse.threejs.org/t/interactive-3d-portfolio-scroll-experience/46109)

Tâches:

- [ ] 1. Optimisation 3D:
   - [ ] Activer `antialias` avec précaution.
   - [ ] Limiter polycount des modèles, réduire textures (compresser/resize).
   - [ ] Stopper l'animation quand l'onglet est inactif ou section non visible.
- [ ] 2. Angular optimisation:
   - [ ] `ChangeDetectionStrategy.OnPush` sur les composants de sections. [reddit](https://www.reddit.com/r/Angular2/comments/fuzadp/preview_of_my_portfolio_angular_firebase_threejs/)
   - [ ] Lazy load pour la partie Three.js si besoin (par exemple ne charger la scène qu'après le premier viewport). [itnext](https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7)
- [ ] 3. SEO & accessibilité:
   - [ ] Ajouter `title`, `meta` tags, `og:` pour partage.
   - [ ] Fournir du contenu texte alternatif (au cas où 3D ne charge pas).
- [ ] 4. Testing:
   - [ ] Tester sur plusieurs tailles d'écran et navigateurs.
   - [ ] Mesurer avec Lighthouse (performance, accessibility, best practices).

## 7. Phase 6 – Build & déploiement

But: publier facilement et pas cher (ou gratuit), avec un domaine propre. [github](https://github.com/Ikuzen/Portfolio-angular)

Tâches:

- [ ] 1. Build:
   - [ ] `ng build --configuration production` avec budgets raisonnables.
- [ ] 2. Hébergement:
   - [ ] Vercel ou Netlify avec déploiement automatique depuis GitHub (push sur `main` => auto build & deploy). [youtube](https://www.youtube.com/watch?v=kt0FrkQgw8w)
- [ ] 3. Domaine:
   - [ ] Acheter un domaine court .dev ou .store via Namecheap/équivalent et le connecter au projet hébergé (CNAME vers Vercel/Netlify). [youtube](https://www.youtube.com/watch?v=kt0FrkQgw8w)
- [ ] 4. CI/CD (optionnel mais pro):
   - [ ] Configurer pipeline (GitHub Actions) pour lint + tests + build avant déploiement.

***

Si tu veux, la prochaine étape peut être:
- un plan de structure de fichiers concret (`src/app/...`) avec noms de composants/services, ou  
- un diagramme simple des interactions (ScrollService ↔ ThreeSceneService ↔ sections).
