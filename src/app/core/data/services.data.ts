import { Service } from '../models';

export const SERVICES_DATA: Service[] = [
  {
    id: '1',
    title: 'Fullstack Web Application',
    description: 'Complete web application development from design to deployment',
    icon: 'web',
    features: [
      'Custom UI/UX design',
      'Responsive layout',
      'Backend API development',
      'Database design',
      'Authentication & authorization'
    ],
    technologies: ['Angular', 'Spring Boot', 'PostgreSQL', 'Docker'],
    deliverables: [
      'Source code',
      'Documentation',
      'Deployment guide'
    ],
    estimatedDuration: '2-3 months'
  },
  {
    id: '2',
    title: 'E-commerce Store Setup',
    description: 'Complete e-commerce solution with payment integration',
    icon: 'shopping',
    features: [
      'Product catalog',
      'Shopping cart',
      'Payment integration',
      'Order management',
      'Analytics dashboard'
    ],
    technologies: ['Angular', 'Spring Boot', 'PostgreSQL', 'Stripe'],
    deliverables: [
      'Fully functional store',
      'Admin panel',
      'Customer support system'
    ],
    estimatedDuration: '1-2 months'
  },
  {
    id: '3',
    title: 'Mobile App Prototype',
    description: 'Cross-platform mobile application development',
    icon: 'mobile',
    features: [
      'Native performance',
      'Offline support',
      'Push notifications',
      'Cross-platform compatibility'
    ],
    technologies: ['React Native', 'Node.js', 'MongoDB'],
    deliverables: [
      'iOS and Android apps',
      'Backend API',
      'App store submission'
    ],
    estimatedDuration: '2-4 months'
  }
];
