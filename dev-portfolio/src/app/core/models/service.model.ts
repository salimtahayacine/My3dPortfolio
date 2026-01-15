export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  features: string[];
  technologies?: string[];
  deliverables?: string[];
  estimatedDuration?: string;
}
