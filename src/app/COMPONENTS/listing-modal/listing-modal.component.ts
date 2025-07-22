import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ListingService } from '../../../SERVICES/LISTINGS/listing.service';
import { HttpClient } from '@angular/common/http';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listing-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './listing-modal.component.html',
  styleUrl: './listing-modal.component.css',
})
export class ListingModalComponent {
  private readonly listingService = inject(ListingService);
  private http = inject(HttpClient);
  @Output() cancel = new EventEmitter<void>();

  onCancel(): void {
    this.cancel.emit();
  }
  
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
    photoFile: new FormControl(null),
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

  get photoFileControl(): FormControl {
    return this.createForm.get('photoFile') as FormControl;
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      this.listingService.createListing(this.createForm.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log('form invalid');
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.http
        .post<{ path: string }>('http://localhost:8080/upload', formData)
        .subscribe({
          next: (res) => {
            this.createForm.get('photo')?.setValue(res.path);
          },
          error: (err) => console.error('Erreur upload:', err),
        });
    }
  }
}
