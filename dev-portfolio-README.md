# Dev Portfolio - 3D Portfolio Website

A modern 3D portfolio website built with Angular 21 and Three.js, featuring interactive 3D elements and smooth scrolling animations.

## Project Overview

This is Phase 1 of a multi-phase project to create a professional 3D portfolio website. The current phase establishes the base Angular architecture and design system.

## Tech Stack

- **Angular 21+**: Modern web framework with standalone components
- **SCSS**: For styling with CSS variables and design tokens
- **TypeScript**: Type-safe development
- **Three.js** (Phase 2): For 3D scene rendering

## Project Structure

```
src/app/
├── core/                    # Core functionality
│   ├── data/               # Static data files
│   ├── models/             # TypeScript interfaces
│   ├── services/           # Global services
│   ├── guards/             # Route guards
│   ├── interceptors/       # HTTP interceptors
│   └── three/              # Three.js services (Phase 2)
├── shared/                 # Shared resources
│   ├── components/         # Reusable UI components
│   ├── directives/         # Shared directives
│   └── pipes/              # Shared pipes
└── features/               # Feature modules
    ├── sections/           # Page sections (hero, about, etc.)
    ├── three-scene/        # Three.js components (Phase 2)
    └── home/               # Home page container
```

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm (v10 or higher)

### Installation

```bash
cd dev-portfolio
npm install
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Design System

The project uses a comprehensive design system with:

- **Color Palette**: Primary, secondary, neutral, and accent colors
- **Dark Mode**: Full dark theme support via `data-theme="dark"`
- **Typography**: Inter for body text, Poppins for headings
- **Spacing System**: Consistent spacing scale (xs, sm, md, lg, xl, 2xl)
- **Components**: Reusable UI components (buttons, cards, tags, etc.)

## Content Models

TypeScript interfaces are defined for:

- **Education**: Academic background and certifications
- **Experience**: Professional work experience
- **Project**: Portfolio projects with details and links
- **Service**: Services offered to clients

## Phase Roadmap

- [x] **Phase 1**: Setup & base Angular (Current)
  - Angular project initialization
  - Folder structure and routing
  - Design system and UI components
  - Content models and data structure

- [ ] **Phase 2**: Three.js Integration
  - 3D scene setup
  - Interactive 3D elements
  - Camera controls and animations

- [ ] **Phase 3**: Scroll & Synchronization
  - Scroll-based animations
  - Section transitions
  - 3D scene interactions

- [ ] **Phase 4**: Content & Data
  - Complete content sections
  - Project showcases
  - Contact form

- [ ] **Phase 5**: Performance & SEO
  - Performance optimization
  - SEO implementation
  - Accessibility improvements

- [ ] **Phase 6**: Build & Deployment
  - Production build setup
  - Hosting configuration
  - CI/CD pipeline

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

