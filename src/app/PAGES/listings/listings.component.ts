import { Component, inject, OnInit, signal } from '@angular/core';
import { ListingCardsComponent } from '../../COMPONENTS/listing-cards/listing-cards.component';
import { Listing } from '../../../UTILS/types';
import { ListingService } from '../../../SERVICES/LISTINGS/listing.service';

@Component({
  selector: 'app-listings',
  imports: [ListingCardsComponent],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css',
})
export class ListingsComponent implements OnInit {
  private listingService = inject(ListingService);
  listings = signal<Listing[]>([]);

  ngOnInit(): void {
    try {
      this.listingService.getListings().subscribe((data) => {
        this.listings.set(data);
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
