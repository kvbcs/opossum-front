import { Component, signal } from '@angular/core';
import { ListingCardsComponent } from '../../COMPONENTS/listing-cards/listing-cards.component';
import { Listing } from '../../../UTILS/types';

@Component({
  selector: 'app-listings',
  imports: [ListingCardsComponent],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css',
})
export class ListingsComponent {
  listings = signal<Listing[]>([]);
}
