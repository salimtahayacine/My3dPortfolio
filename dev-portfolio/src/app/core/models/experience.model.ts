export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  technologies: string[];
  achievements?: string[];
  kpis?: {
    metric: string;
    value: string;
  }[];
}
