import { Routes } from '@angular/router';
import { PhotoListComponent } from './components/photo-list/photo-list.component';

export const routes: Routes = [
  { path: '', component: PhotoListComponent },
  { path: 'photos', component: PhotoListComponent },
  ];