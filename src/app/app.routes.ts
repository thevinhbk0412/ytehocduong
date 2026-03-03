import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard';
import { MedicalRoomComponent } from './medical-room';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'medical-room', component: MedicalRoomComponent },
  { path: '**', redirectTo: '' }
];
