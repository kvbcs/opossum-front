import { Component, inject, OnInit, signal } from '@angular/core';
import { Listing, User } from '../../../UTILS/types';
import { UsersService } from '../../../SERVICES/USERS/users.service';
import { DatePipe, SlicePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ListingService } from '../../../SERVICES/LISTINGS/listing.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  imports: [DatePipe, MatIconModule, SlicePipe, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  private snack = inject(MatSnackBar);
  private userService = inject(UsersService);
  private listingService = inject(ListingService);

  // Données originales
  originalUsers: User[] = [];
  originalListings: Listing[] = [];

  // Signaux pour affichage filtré
  users = signal<User[]>([]);
  listings = signal<Listing[]>([]);

  // Filtres
  userSearchTerm = signal('');
  userSortKey = signal<'id' | 'firstName' | 'email'>('id');
  userSortAsc = signal(true);

  listingSearchTerm = signal('');
  listingSortKey = signal<'id' | 'title' | 'type'>('id');
  listingSortAsc = signal(true);

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.originalUsers = data;
        this.applyUserFilters();
      },
      error: (err) => {
        const errorMsg =
          err?.error?.message ??
          err?.error?.error ??
          'Unexpected error occurred';

        this.snack.open(`Error: ${errorMsg}`, 'Close', {
          duration: 4000,
        });
      },
    });

    this.listingService.getListings().subscribe({
      next: (data) => {
        this.originalListings = data;
        this.applyListingFilters();
      },
      error: (err) => {
        const errorMsg =
          err?.error?.message ??
          err?.error?.error ??
          'Unexpected error occurred';

        this.snack.open(`Error: ${errorMsg}`, 'Close', {
          duration: 4000,
        });
      },
    });
  }

  applyUserFilters() {
    const term = this.userSearchTerm().toLowerCase();
    const sorted = [...this.originalUsers].sort((a, b) => {
      const key = this.userSortKey();
      const asc = this.userSortAsc() ? 1 : -1;
      return (a[key] > b[key] ? 1 : -1) * asc;
    });
    const filtered = sorted.filter(
      (u) =>
        u.firstName.toLowerCase().includes(term) ||
        u.lastName.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term)
    );
    this.users.set(filtered);
  }

  applyListingFilters() {
    const term = this.listingSearchTerm().toLowerCase();
    const sorted = [...this.originalListings].sort((a, b) => {
      const key = this.listingSortKey();
      const asc = this.listingSortAsc() ? 1 : -1;
      return (a[key] > b[key] ? 1 : -1) * asc;
    });
    const filtered = sorted.filter(
      (l) =>
        l.title.toLowerCase().includes(term) ||
        l.description.toLowerCase().includes(term) ||
        l.localization.toLowerCase().includes(term)
    );
    this.listings.set(filtered);
  }

  blockUser(id: number) {
    this.userService.blockUser(id).subscribe({
      next: () => {
        const user = this.users().find((u) => u.id === id);
        if (user) user.isBlocked = true;
        this.users.set([...this.users()]);
        this.snack.open('User blocked !', 'Close', { duration: 3000 });
      },
      error: (err) => {
        console.error('Error blocking user:', err);

        const errorMsg =
          err?.error?.message ??
          err?.error?.error ??
          'Unexpected error occurred';

        this.snack.open(`Error: ${errorMsg}`, 'Close', {
          duration: 4000,
        });
      },
    });
  }

  unblockUser(id: number) {
    this.userService.unblockUser(id).subscribe({
      next: () => {
        const user = this.users().find((u) => u.id === id);
        if (user) user.isBlocked = false;
        this.users.set([...this.users()]);
        this.snack.open('User unblocked !', 'Close', { duration: 3000 });
      },
      error: (err) => {
        console.error('Error unblocking user:', err);

        const errorMsg =
          err?.error?.message ??
          err?.error?.error ??
          'Unexpected error occurred';

        return this.snack.open(`Error: ${errorMsg}`, 'Close', {
          duration: 4000,
        });
      },
    });
  }

  onToggleBlock(user: User) {
    if (user.isBlocked) {
      this.unblockUser(user.id);
    } else {
      this.blockUser(user.id);
    }
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        const updatedUsers = this.users().filter((u) => u.id !== id);
        this.users.set(updatedUsers);

        this.snack.open('User deleted!', 'Close', { duration: 3000 });
      },
      error: (err) => {
        const errorMsg =
          err?.error?.message ??
          err?.error?.error ??
          'Error while deleting user.';
        this.snack.open(errorMsg, 'Close', { duration: 4000 });
        console.error(err);
      },
    });
  }

  deleteListing(id: number) {
    this.listingService.deleteListing(id).subscribe({
      next: () => {
        const updatedListings = this.listings().filter((l) => l.id !== id);
        this.listings.set(updatedListings);

        this.snack.open('Listing deleted!', 'Close', { duration: 3000 });
      },
      error: (err) => {
        const errorMsg =
          err?.error?.message ??
          err?.error?.error ??
          'Error while deleting listing.';
        this.snack.open(errorMsg, 'Close', { duration: 4000 });
        console.error(err);
      },
    });
  }
}
