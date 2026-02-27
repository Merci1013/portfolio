import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { CvComponent } from './pages/cv/cv';
import { ProjectsComponent } from './pages/projects/projects';
import { ContactComponent } from './pages/contact/contact';
import { InteretsComponent } from './pages/interets/interets';
import { AdminComponent } from './pages/admin/admin';
import { adminGuard } from './auth/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cv', component: CvComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'interets', component: InteretsComponent },
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard] },
  { path: '**', redirectTo: '' },
];