import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }      from './login/login.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { ProjectComponent } from './project/project.component';
import { ReportsComponent } from './reports/reports.component';
import { UsersComponent } from './users/users.component'
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'timesheet', component: TimesheetComponent },
  { path: 'users', component: UsersComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'reports', component: ReportsComponent }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

