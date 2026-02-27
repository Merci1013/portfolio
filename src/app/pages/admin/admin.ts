import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectsService, Project } from '../../services/project.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class AdminComponent implements OnInit {
  token = localStorage.getItem('adminToken') ?? '';

  projects: Project[] = [];
  loading = false;
  message = '';

  // Form
  title = '';
  summary = '';
  tagsText = ''; // "C, Linux, TCP"
  githubUrl = '';
  demoUrl = '';
  imageUrl = '';

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.refresh();
  }

  saveToken(): void {
    localStorage.setItem('adminToken', this.token);
    this.message = 'Token enregistré (session).';
  }

  refresh(): void {
    this.loading = true;
    this.projectsService.getProjects().subscribe({
      next: (data) => {
        this.projects = data ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  addProject(): void {
    this.message = '';
    if (!this.token) {
      this.message = 'Entre ton token admin.';
      return;
    }
    if (!this.title.trim() || !this.summary.trim()) {
      this.message = 'Titre et résumé sont obligatoires.';
      return;
    }

    const tags = this.tagsText
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const payload = {
      title: this.title.trim(),
      summary: this.summary.trim(),
      tags,
      githubUrl: this.githubUrl.trim() || undefined,
      demoUrl: this.demoUrl.trim() || undefined,
      imageUrl: this.imageUrl.trim() || undefined,
    };

    this.loading = true;
    this.projectsService.createProject(payload, this.token).subscribe({
      next: () => {
        this.title = '';
        this.summary = '';
        this.tagsText = '';
        this.githubUrl = '';
        this.demoUrl = '';
        this.imageUrl = '';
        this.message = 'Projet ajouté ✅';
        this.refresh();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.message = 'Erreur : token invalide ou API en panne.';
      },
    });
  }

  deleteProject(id?: string): void {
    if (!id) return;
    if (!this.token) {
      this.message = 'Entre ton token admin.';
      return;
    }

    this.loading = true;
    this.projectsService.deleteProject(id, this.token).subscribe({
      next: () => {
        this.message = 'Projet supprimé ✅';
        this.refresh();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.message = 'Erreur suppression (token ?).';
      },
    });
  }
}