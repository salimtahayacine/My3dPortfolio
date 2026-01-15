import { Education } from '../models';

export const EDUCATION_DATA: Education[] = [
  {
    id: '1',
    institution: 'University Name',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    startDate: new Date('2018-09-01'),
    endDate: new Date('2022-06-01'),
    current: false,
    description: 'Focused on software engineering and full-stack development',
    location: 'City, Country',
    achievements: [
      'Dean\'s List',
      'Outstanding Student Award'
    ]
  }
  // Add more education entries as needed
];
