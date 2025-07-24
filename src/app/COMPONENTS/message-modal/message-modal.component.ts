import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesService } from '../../../SERVICES/MESSAGES/messages.service';
import { Listing } from '../../../UTILS/types';

@Component({
  selector: 'app-message-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './message-modal.component.html',
  styleUrl: './message-modal.component.css',
})
export class MessageModalComponent implements OnInit {
  ngOnInit(): void {
    if (!this.listing) {
      throw new Error('Listing is required for sending a message.');
    }
  }
  private messageService = inject(MessagesService);
  private snack = inject(MatSnackBar);
  @Input() listing!: Listing; 
  @Output() cancel = new EventEmitter<void>();
  messageForm: FormGroup = new FormGroup({
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
  });
  onSubmit(): void {
    if (this.messageForm.invalid) {
      this.snack.open('Invalid form !', 'Close');
      return;
    }
    if (!this.listing?.user?.id || !this.listing?.id) {
      this.snack.open('Missing listing or user ID!', 'Close');
      return;
    }

    const data = {
      ...this.messageForm.value,
      listingId: this.listing.id,
    };

    this.messageService.createMessage(this.listing.user.id, data).subscribe({
      next: (res) => {
        this.snack.open('Message sent!', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.cancel.emit();
        console.log('Message response:', res);
      },
      error: (err) => {
        this.snack.open('Error sending message: ' + err.message, 'Close');
        console.error(err);
      },
    });
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
