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
  @Input() editMode?: Listing;

  ngOnInit(): void {
    if (this.editMode) {
      this.createForm.patchValue({
        type: this.editMode.type,
        title: this.editMode.title,
        description: this.editMode.description,
        localization: this.editMode.localization,
        eventDate: this.editMode.eventDate,
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
      console.log('Form invalid');
      return;
    }

    const data = this.createForm.value;

    if (this.editMode) {
      this.listingService.updateListing(this.editMode.id, data).subscribe({
        next: (res) => {
          console.log('Listing updated:', res);
          this.cancel.emit();
        },
        error: (err) => console.error('Update error:', err),
      });
    } else {
      this.listingService.createListing(data).subscribe({
        next: (res) => {
          console.log('Listing created:', res);
          this.cancel.emit(); // ferme la modal
        },
        error: (err) => console.error('Create error:', err),
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
            this.createForm.get('photo')?.setValue(res.path);
          },
          error: (err) => console.error('Erreur upload:', err),
        });
    }
  }
}
