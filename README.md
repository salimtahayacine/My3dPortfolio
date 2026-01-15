# My3dPortfolio

A modern 3D interactive portfolio website built with Angular and Three.js, featuring smooth animations and an immersive user experience.

## 🎯 Project Overview

This project aims to create a professional portfolio website that combines traditional web development with 3D graphics to create a unique and memorable experience. The portfolio showcases skills, projects, experience, and services in an engaging way.

## 📁 Repository Structure

- **`/conception_generale.md`** - General conception and objectives
- **`/conception_tasks_v0.md`** - Detailed task breakdown by phase
- **`/tasks.md`** - Task tracker with checkboxes for progress monitoring
- **`/src/`** - Angular application source code
- **`/public/`** - Public assets (favicon, etc.)
- **Configuration files** - Angular, TypeScript, and package configurations at root level

## 🚀 Current Status

### ✅ Phase 1 - Setup & Base Angular (COMPLETED)

Phase 1 has been successfully completed! The Angular project is now set up with:

- ✅ Angular 21 project with routing and SCSS
- ✅ Scalable folder structure (core/, shared/, features/)
- ✅ Main layout with navbar and footer
- ✅ Single-page scrolling architecture
- ✅ Complete design system with light/dark theme support
- ✅ Reusable UI components (buttons, cards, tags, etc.)
- ✅ TypeScript interfaces for content models
- ✅ Static data structure for Education, Experience, Projects, and Services

### ✅ Phase 2 - Three.js Integration (COMPLETED)

Phase 2 has been successfully completed! Three.js is now integrated with:

- ✅ Three.js library installed and configured
- ✅ ThreeSceneComponent created in features/three-scene
- ✅ ThreeSceneService with animation loop and scene management
- ✅ Basic 3D scene with camera, renderer, and lighting
- ✅ Interactive 3D objects (cube, sphere, torus) with animations
- ✅ Raycasting for clickable objects
- ✅ Hover effects with color and scale changes
- ✅ Responsive resize handling
- ✅ Scene positioned as fixed background behind content

### 📋 Next Steps

**Phase 3 - Scroll & Synchronization** is ready to begin:
- Create ScrollService for section tracking
- Link sections with 3D scene animations
- Implement GSAP/ScrollTrigger for smooth transitions
- Add basic 3D models and interactions

## 🛠️ Tech Stack

- **Frontend**: Angular 21+ (Standalone Components)
- **Styling**: SCSS with CSS Variables
- **3D Graphics**: Three.js (Phase 2)
- **Animation**: GSAP/ScrollTrigger (Phase 3)
- **Deployment**: Vercel/Netlify (Phase 6)

## 📖 Documentation

For detailed information about each phase:
- See `conception_tasks_v0.md` for complete phase breakdown
- See `tasks.md` for current progress and checklist
- See `dev-portfolio-README.md` for development instructions and architecture details

## 🏃 Quick Start

```bash
# Install dependencies
npm install

# Start development server
ng serve

# Open browser to http://localhost:4200
```

## 🎨 Design Philosophy

The portfolio combines:
- **Modern Web Development**: Clean Angular architecture
- **3D Immersion**: Interactive Three.js elements
- **Smooth UX**: Scroll-based animations and transitions
- **Professional Content**: Clear presentation of skills and work
- **Performance**: Optimized for fast loading and smooth interactions

## 📝 License

This project is part of a personal portfolio and is for demonstration purposes.

---

**Status**: Phase 1 & 2 Complete ✅ | Current Focus: Phase 3 (Scroll & Synchronization)

