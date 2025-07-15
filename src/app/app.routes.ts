import { Routes } from '@angular/router';
import { HomeComponent } from './PAGES/home/home.component';
import { RegisterComponent } from './PAGES/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register Page',
  },
];
