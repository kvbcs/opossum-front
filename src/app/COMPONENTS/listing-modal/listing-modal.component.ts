import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ListingService } from '../../../SERVICES/LISTINGS/listing.service';
import { HttpClient } from '@angular/common/http';
import { Listing } from '../../../UTILS/types';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  private snack = inject(MatSnackBar);
  @Output() cancel = new EventEmitter<void>();
  @Input() listingOnEdit?: Listing | null;

  ngOnInit(): void {
    if (this.listingOnEdit) {
      this.createForm.patchValue({
        type: this.listingOnEdit.type,
        title: this.listingOnEdit.title,
        description: this.listingOnEdit.description,
        localization: this.listingOnEdit.localization,
        eventDate: this.listingOnEdit.eventDate,
      });
    }
  }

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
    if (this.createForm.invalid) {
      this.snack.open('Form invalid', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      return;
    }

    const data = this.createForm.value;

    if (this.listingOnEdit) {
      this.listingService.updateListing(this.listingOnEdit.id, data).subscribe({
        next: (res) => {
          this.snack.open('Listing updated !', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
          console.log('Listing updated:', res);
          this.cancel.emit();
        },
        error: (err) => {
          this.snack.open('Error ! ' + err, 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
          console.error('Update error:', err);
        },
      });
    } else {
      this.listingService.createListing(data).subscribe({
        next: (res) => {
          this.snack.open('Listing created!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
          console.log('Listing created:', res);
          this.cancel.emit();
        },
        error: (err) => console.error('Error Creating:', err),
      });
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
            this.snack.open('File uploaded successfully !', 'Close');
            this.createForm.get('photo')?.setValue(res.path);
          },
          error: (err) => {
            this.snack.open('Error : ' + err);
            console.error('Erreur upload:', err);
          },
        });
    }
  }
}
