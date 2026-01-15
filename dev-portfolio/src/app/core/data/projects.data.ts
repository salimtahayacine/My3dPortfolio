import { Project } from '../models';

export const PROJECTS_DATA: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'Full-featured e-commerce platform with payment integration, inventory management, and order tracking',
    shortDescription: 'Modern e-commerce solution',
    technologies: ['Angular', 'Spring Boot', 'PostgreSQL', 'Redis', 'Docker'],
    role: 'Full-stack Developer',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-06-01'),
    status: 'completed',
    githubUrl: 'https://github.com/username/project',
    liveUrl: 'https://project-live-url.com',
    highlights: [
      'Implemented secure payment processing',
      'Built responsive admin dashboard',
      'Optimized for mobile devices'
    ]
  }
  // Add more projects as needed
];
