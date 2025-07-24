import { Component, inject, OnInit, signal } from '@angular/core';
import { User } from '../../../UTILS/types';
import { UsersService } from '../../../SERVICES/USERS/users.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [DatePipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  users = signal<User[]>([]);
  private userService = inject(UsersService);

  ngOnInit(): void {
    try {
      this.userService.getUsers().subscribe({
        next: (data) => {
          console.log(data);
          this.users.set(data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  blockUser(id: number) {
    console.log(id);
    try {
      this.userService.blockUser(id).subscribe((data) => {
        const user = this.users().find((u) => u.id === id);
        if (user) user.isBlocked = true;
        this.users.set([...this.users()]);
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  unblockUser(id: number) {
    console.log(id);
    try {
      this.userService.unblockUser(id).subscribe((data) => {
        const user = this.users().find((u) => u.id === id);
        if (user) user.isBlocked = false;
        this.users.set([...this.users()]);
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  onToggleBlock(user: User) {
    if (user.isBlocked) {
      this.unblockUser(user.id);
    } else {
      this.blockUser(user.id);
    }
  }
}
