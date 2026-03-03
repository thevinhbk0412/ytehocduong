import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard';
import { MedicalRoomComponent } from './medical-room';
import { NutritionComponent } from './nutrition';
import { CounselingComponent } from './counseling';
import { EducationComponent } from './education';
import { ReportsComponent } from './reports';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'medical-room', component: MedicalRoomComponent },
  { path: 'students', component: DashboardComponent }, // Placeholder for now
  { path: 'nutrition', component: NutritionComponent },
  { path: 'counseling', component: CounselingComponent },
  { path: 'education', component: EducationComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'settings', component: DashboardComponent }, // Placeholder
  { path: '**', redirectTo: '' }
];
