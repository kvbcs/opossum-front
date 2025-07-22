import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Listing } from '../../../UTILS/types';
import { MatIconModule } from '@angular/material/icon';
import { ListingService } from '../../../SERVICES/LISTINGS/listing.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-listing-cards',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './listing-cards.component.html',
  styleUrl: './listing-cards.component.css',
})
export class ListingCardsComponent {
  @Input() listing!: Listing;
  @Input() createMessage: boolean = false;
  @Output() onArchived = new EventEmitter<number>();

  private listingService = inject(ListingService);
  private snack = inject(MatSnackBar);

  private jwtHelper = new JwtHelperService();

  isOwner(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decoded = this.jwtHelper.decodeToken(token);
    const currentUserEmail = decoded?.sub;
    return currentUserEmail === this.listing.user?.email;
  }

  archiveListing(): void {
    this.listingService.archiveListing(this.listing.id).subscribe({
      next: () => {
        this.listing.isArchived = true;
        this.snack.open('Listing archived!', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.onArchived.emit(this.listing.id);
      },
      error: (err) => {
        console.log(err.message);

        this.snack.open('Error: ' + err.message, 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      },
    });
  }
}
