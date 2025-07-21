import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ListingService } from '../../../SERVICES/LISTINGS/listing.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listing-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './listing-modal.component.html',
  styleUrl: './listing-modal.component.css',
})
export class ListingModalComponent {
  private readonly listingService = inject(ListingService);
  private toast = inject(ToastrService);
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
      this.toast.success('Form submitted: ' + this.createForm.value, 'Success');
      this.listingService.createListing(this.createForm.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          this.toast.error('create failed: ' + err, 'Error');
        },
      });
    } else {
      this.toast.error('Invalid Form');
    }
  }
}
