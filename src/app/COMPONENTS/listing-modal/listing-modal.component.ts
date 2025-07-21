import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ListingService } from '../../../SERVICES/LISTINGS/listing.service';

@Component({
  selector: 'app-listing-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './listing-modal.component.html',
  styleUrl: './listing-modal.component.css',
})
export class ListingModalComponent {
  private readonly listingService = inject(ListingService);

  createForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    photo: new FormControl('', Validators.required),
    eventDate: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    type: new FormControl('', [Validators.required, Validators.minLength(4)]),
    localization: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  onSubmit(): void {
    if (this.createForm.valid) {
      console.log('Form submitted:', this.createForm.value);
      this.listingService.createListing(this.createForm.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log('create failed', err);
        },
      });
    } else {
      console.log('form invalid');
    }
  }
}
