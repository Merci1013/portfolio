import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  _id?: string;
  title: string;
  summary: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly baseUrl = 'http://localhost:3000/api/projects';

  constructor(private http: HttpClient) {}

  // PUBLIC
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl);
  }

  // ADMIN
  createProject(payload: Partial<Project>, token: string) {
    return this.http.post<Project>(this.baseUrl, payload, {
      headers: { 'x-admin-token': token },
    });
  }

  deleteProject(id: string, token: string) {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: { 'x-admin-token': token },
    });
  }
}