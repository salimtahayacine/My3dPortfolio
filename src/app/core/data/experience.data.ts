import { Experience } from '../models';

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: '1',
    title: 'Fullstack Developer',
    company: 'Company Name',
    location: 'City, Country',
    startDate: new Date('2022-07-01'),
    current: true,
    description: 'Developing full-stack applications using Angular, Spring Boot, and React Native',
    technologies: ['Angular', 'Spring Boot', 'PostgreSQL', 'React Native', 'Docker'],
    achievements: [
      'Led development of e-commerce platform',
      'Improved application performance by 40%'
    ],
    kpis: [
      { metric: 'Orders Processed', value: '10,000+' },
      { metric: 'Conversion Rate', value: '3.5%' }
    ]
  }
  // Add more experience entries as needed
];
