import { Component, inject, OnInit, signal } from '@angular/core';
import { User } from '../../../UTILS/types';
import { UsersService } from '../../../SERVICES/USERS/users.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin',
  imports: [DatePipe, MatIconModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  private snack = inject(MatSnackBar);
  users = signal<User[]>([]);
  private userService = inject(UsersService);

  ngOnInit(): void {
      this.userService.getUsers().subscribe({
        next: (data) => {
          this.users.set(data);
        }, error: (err) => {

           const errorMsg =
             err?.error?.message ??
             err?.error?.error ??
             'Unexpected error occurred';

           this.snack.open(`Error: ${errorMsg}`, 'Close', {
             duration: 4000,
           });
        }
      });
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
}
