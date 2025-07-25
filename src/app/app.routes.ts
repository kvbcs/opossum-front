import { Routes } from '@angular/router';
import { HomeComponent } from './PAGES/home/home.component';
import { RegisterComponent } from './PAGES/register/register.component';
import { LoginComponent } from './PAGES/login/login.component';
import { ListingCardsComponent } from './COMPONENTS/listing-cards/listing-cards.component';
import { ListingsComponent } from './PAGES/listings/listings.component';
import { MessagesComponent } from './PAGES/messages/messages.component';
import { AdminComponent } from './PAGES/admin/admin.component';
import { ProfileComponent } from './PAGES/profile/profile.component';

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
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login Page',
  },

  {
    path: 'listings',
    component: ListingsComponent,
    title: 'Listings Page',
  },
  { path: 'messages', component: MessagesComponent, title: 'Messages Page' },
  { path: 'admin', component: AdminComponent, title: 'Admin Page' },
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'Profile Page',
  },
];
