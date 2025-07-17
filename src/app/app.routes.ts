import { Routes } from '@angular/router';
import { HomeComponent } from './PAGES/home/home.component';
import { RegisterComponent } from './PAGES/register/register.component';
import { LoginComponent } from './PAGES/login/login.component';
import { ListingCardsComponent } from './COMPONENTS/listing-cards/listing-cards.component';
import { ListingsComponent } from './PAGES/listings/listings.component';

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
    path: 'cards',
    component: ListingCardsComponent,
  },
  {
    path: 'listings',
    component: ListingsComponent,
    title: 'Listings Page',
  },
];
