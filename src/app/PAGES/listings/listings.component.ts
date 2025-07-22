import { Component, inject, OnInit, signal } from '@angular/core';
import { ListingCardsComponent } from '../../COMPONENTS/listing-cards/listing-cards.component';
import { Listing } from '../../../UTILS/types';
import { ListingService } from '../../../SERVICES/LISTINGS/listing.service';
import { ListingModalComponent } from '../../COMPONENTS/listing-modal/listing-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listings',
  imports: [ListingCardsComponent, ListingModalComponent, CommonModule],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css',
  standalone: true,
})
export class ListingsComponent implements OnInit {
  private listingService = inject(ListingService);
  private snack = inject(MatSnackBar);
  listings = signal<Listing[]>([]);

  createMode: boolean = false;
  createMessage: boolean = false;

 
  ngOnInit(): void {
    this.listingService.getListings().subscribe({
      next: (data) => {
        const activeListings = data.filter((listing) => !listing.isArchived);
        this.listings.set(activeListings);
        console.log('Listings:', activeListings);
        // this.snack.open('Listings loaded !', 'Close', {
        //   duration: 3000,
        //   horizontalPosition: 'right',
        //   verticalPosition: 'top',
        //   panelClass: ['snackbar-success'],
        // });
      },
      error: (err) => {
        this.snack.open(
          'Error loading listings! ' + (err?.message || 'Unknown error'),
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          }
        );
      },
    });
  }
  handleArchived(id: number): void {
    this.listings.update((current) => current.filter((l) => l.id !== id));
  }
}
