export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  role: string;
  startDate?: Date;
  endDate?: Date;
  status: 'completed' | 'in-progress' | 'planned';
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  highlights?: string[];
}
