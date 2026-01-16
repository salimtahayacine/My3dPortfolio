import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Education, Experience, Project, Service } from '../models';

// TODO: Consider moving these to a configuration file for better maintainability
const ACHIEVEMENT_FILTER_KEYWORDS = ['technolog', 'environnement', 'outils de travail'];
const TECHNOLOGY_KEYWORDS = ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'Vue.js', 'React', 'Node.js', 'MongoDB'];

interface ProfileData {
  personalInfo: any;
  about: any;
  skills: any;
  education: Array<{
    degree: string;
    period: string;
    institution: string;
  }>;
  experience: Array<{
    title: string;
    period: string;
    company: string;
    responsibilities: string[];
  }>;
  portfolio: {
    title: string;
    description: string;
    projects: Array<{
      image: string;
      title: string;
      description: string;
    }>;
  };
  services: {
    title: string;
    description: string;
    services: Array<{
      title: string;
      description: string;
    }>;
  };
  socialLinks: any;
  contact: any;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService {
  private profileDataUrl = '/profile-data.json';

  constructor(private http: HttpClient) {}

  getEducation(): Observable<Education[]> {
    return this.http.get<ProfileData>(this.profileDataUrl).pipe(
      map(data => this.transformEducation(data.education))
    );
  }

  getExperience(): Observable<Experience[]> {
    return this.http.get<ProfileData>(this.profileDataUrl).pipe(
      map(data => this.transformExperience(data.experience))
    );
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<ProfileData>(this.profileDataUrl).pipe(
      map(data => this.transformProjects(data.portfolio.projects))
    );
  }

  getServices(): Observable<Service[]> {
    return this.http.get<ProfileData>(this.profileDataUrl).pipe(
      map(data => this.transformServices(data.services.services))
    );
  }

  private transformEducation(educationData: any[]): Education[] {
    return educationData.map((edu, index) => {
      const period = this.parsePeriod(edu.period);
      return {
        id: (index + 1).toString(),
        institution: edu.institution || '',
        degree: edu.degree || '',
        field: '',
        startDate: period.startDate,
        endDate: period.endDate,
        current: period.current,
        description: '',
        location: this.extractLocation(edu.institution),
        achievements: []
      };
    });
  }

  private transformExperience(experienceData: any[]): Experience[] {
    return experienceData.map((exp, index) => {
      const period = this.parsePeriod(exp.period);
      const { company, location } = this.parseCompanyAndLocation(exp.company);
      const technologies = this.extractTechnologies(exp.responsibilities);
      
      return {
        id: (index + 1).toString(),
        title: exp.title || '',
        company: company,
        location: location,
        startDate: period.startDate,
        endDate: period.endDate,
        current: period.current,
        description: exp.responsibilities[0] || '',
        technologies: technologies,
        achievements: exp.responsibilities.slice(1).filter((r: string) => 
          !ACHIEVEMENT_FILTER_KEYWORDS.some(keyword => r.toLowerCase().includes(keyword))
        ),
        kpis: []
      };
    });
  }

  private transformProjects(projectsData: any[]): Project[] {
    return projectsData.map((proj, index) => {
      return {
        id: (index + 1).toString(),
        title: proj.title || '',
        description: proj.description || '',
        shortDescription: proj.description ? proj.description.substring(0, 100) : '',
        technologies: this.extractTechnologiesFromDescription(proj.description),
        role: 'Full-stack Developer',
        startDate: undefined,
        endDate: undefined,
        status: 'completed' as const,
        imageUrl: proj.image || '',
        githubUrl: undefined,
        liveUrl: undefined,
        highlights: [proj.description]
      };
    });
  }

  private transformServices(servicesData: any[]): Service[] {
    return servicesData.map((svc, index) => {
      const features = svc.description
        .split(/[\r\n]+/)
        .map((f: string) => f.trim())
        .filter((f: string) => f.length > 0);
      
      return {
        id: (index + 1).toString(),
        title: svc.title.replace(':', '').trim(),
        description: features[0] || svc.description.substring(0, 100),
        icon: this.getServiceIcon(svc.title),
        features: features,
        technologies: [],
        deliverables: [],
        estimatedDuration: ''
      };
    });
  }

  private parsePeriod(period: string): { startDate: Date; endDate?: Date; current: boolean } {
    const periodLower = period.toLowerCase();
    const current = periodLower.includes('aujourd\'hui') || periodLower.includes('présent');
    
    // Extract years from period string
    const yearMatch = period.match(/\d{4}/g);
    if (!yearMatch || yearMatch.length === 0) {
      return { startDate: new Date(), current: true };
    }
    
    const startYear = parseInt(yearMatch[0]);
    const startDate = new Date(startYear, 0, 1);
    
    if (current) {
      return { startDate, current: true };
    }
    
    const endYear = yearMatch.length > 1 ? parseInt(yearMatch[1]) : startYear;
    const endDate = new Date(endYear, 11, 31);
    
    return { startDate, endDate, current: false };
  }

  private extractLocation(text: string): string {
    if (!text) return '';
    
    // NOTE: The data format uses ' l ' (space-L-space) as a separator between company and location
    // Example: "DEVOX l Temara Centre ville"
    const parts = text.split(/\sl\s/);
    if (parts.length > 1) {
      return parts[parts.length - 1].trim();
    }
    
    // Fallback to comma separation
    const commaParts = text.split(',');
    if (commaParts.length > 1) {
      return commaParts[commaParts.length - 1].trim();
    }
    
    return '';
  }

  private parseCompanyAndLocation(companyString: string): { company: string; location: string } {
    if (!companyString) {
      return { company: '', location: '' };
    }
    
    // NOTE: The profile-data.json format uses ' l ' (space-L-space) as a separator
    // Split by ' l ' which appears to be used as a separator in the source data
    // Example: "SOCIETÉ PIETRANOBILE SARL l Fkih ben Salah"
    const parts = companyString.split(/\sl\s/);
    
    if (parts.length >= 2) {
      return {
        company: parts[0].trim(),
        location: parts[1].trim()
      };
    }
    
    // If no 'l' separator, try comma
    const commaParts = companyString.split(',');
    if (commaParts.length >= 2) {
      return {
        company: commaParts[0].trim(),
        location: commaParts.slice(1).join(',').trim()
      };
    }
    
    // No separator found, return entire string as company
    return { company: companyString.trim(), location: '' };
  }

  private extractTechnologies(responsibilities: string[]): string[] {
    const technologies: string[] = [];
    const techPattern = /technolog(?:ies)?[:\s]/i;
    
    for (const resp of responsibilities) {
      if (techPattern.test(resp)) {
        const techLine = resp.split(/technolog(?:ies)?[:\s]/i)[1];
        if (techLine) {
          const techs = techLine.split(',').map(t => t.trim()).filter(t => t.length > 0);
          technologies.push(...techs);
        }
      }
    }
    
    return technologies;
  }

  private extractTechnologiesFromDescription(description: string): string[] {
    const found: string[] = [];
    
    for (const tech of TECHNOLOGY_KEYWORDS) {
      if (description.includes(tech)) {
        found.push(tech);
      }
    }
    
    return found;
  }

  private getServiceIcon(title: string): string {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('front')) return 'web';
    if (titleLower.includes('back')) return 'server';
    if (titleLower.includes('database')) return 'database';
    if (titleLower.includes('server')) return 'cloud';
    if (titleLower.includes('testing')) return 'bug';
    if (titleLower.includes('security')) return 'shield';
    return 'code';
  }
}
