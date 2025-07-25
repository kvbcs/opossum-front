import { Component, inject, OnInit, signal } from '@angular/core';
import { User } from '../../../UTILS/types';
import { UsersService } from '../../../SERVICES/USERS/users.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  imports: [DatePipe, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private userService = inject(UsersService);
  private snack = inject(MatSnackBar);
  user = signal<User | null>(null);
  editMode: boolean = false;
  formData = {
    firstName: '',
    lastName: '',
    email: '',
  };
  ngOnInit(): void {
    this.userService.getUserMe().subscribe({
      next: (data) => {
        console.log(data);
        this.user.set(data);
      },
      error: (err) => console.error('Failed to fetch user', err),
    });
  }

  populateForm(user: User) {
    this.formData.firstName = user.firstName;
    this.formData.lastName = user.lastName;
    this.formData.email = user.email;
  }

  toggleEdit() {
    this.editMode = !this.editMode;
    if (this.editMode && this.user()) {
      this.populateForm(this.user()!);
    }
  }

  updateProfile() {
    if (!this.user()) return;
    const id = this.user()?.id;

    if (id === undefined) {
      console.error('User ID is undefined');
      return;
    }
    this.userService.updateUser(id, this.formData).subscribe({
      next: (updated) => {
        this.user.set(updated);
        this.editMode = false;
        this.snack.open('Profile updated!', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
      },
      error: (err) => {
        console.error('Update failed', err);
        this.snack.open('Failed to update profile.', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      },
    });
  }
}
