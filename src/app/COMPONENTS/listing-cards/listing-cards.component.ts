import { Component, Input } from '@angular/core';
import { Listing } from '../../../UTILS/types';

@Component({
  selector: 'app-listing-cards',
  standalone: true,
  imports: [],
  templateUrl: './listing-cards.component.html',
  styleUrl: './listing-cards.component.css',
})
export class ListingCardsComponent {
  @Input() listing!: Listing;
}
