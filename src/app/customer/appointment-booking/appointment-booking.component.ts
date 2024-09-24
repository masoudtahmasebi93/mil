import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CatalogService, ServiceItem} from '../../shared/services/catalog.service';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {DatePipe, NgFor, NgForOf, NgIf} from "@angular/common";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {Appointment, AppointmentService} from "../../shared/services/appointment.service";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatCard, MatCardContent, MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule} from "@angular/material/core";

@Component({
  selector: 'app-appointment-booking',
  standalone: true,
  imports: [
    MatFormField,
    MatDatepickerToggle,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    MatInput,
    MatDatepicker,
    MatButton,
    MatDatepickerInput,
    MatLabel,
    MatError,
    MatToolbar,
    MatCard,
    MatCardContent, ReactiveFormsModule,
    RouterModule,
    NgIf,
    NgFor,
    DatePipe,
    // Angular Material Modules
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './appointment-booking.component.html',
  styleUrl: './appointment-booking.component.scss'
})
export class AppointmentBookingComponent implements OnInit {
  bookingForm: FormGroup;
  services: ServiceItem[] = [];
  selectedServiceId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private catalogService: CatalogService,
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', [Validators.required, Validators.email]],
      serviceId: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Fetch services
    this.catalogService.getServices().subscribe(
      (data) => (this.services = data),
      (error) => console.error('Error fetching services', error)
    );

    // Get selected service from query params
    this.route.queryParams.subscribe((params) => {
      this.selectedServiceId = params['serviceId'] ? +params['serviceId'] : null;
      if (this.selectedServiceId && this.services.length > 0) {
        // Check if the selected service exists in the list
        const serviceExists = this.services.find(service => service.id === this.selectedServiceId);
        if (serviceExists) {
          this.bookingForm.patchValue({ serviceId: this.selectedServiceId });
        }
      }
    });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      const appointmentData: Appointment = {
        id: 0, // JSON Server will auto-generate the ID
        ...this.bookingForm.value,
        status: 'Pending',
      };
      // Create the appointment
      this.appointmentService.createAppointment(appointmentData).subscribe(
        (createdAppointment) => {
          console.log('Appointment created:', createdAppointment);
          // Navigate to confirmation page
          this.router.navigate(['/confirmation'], {state: {data: createdAppointment}});
        },
        (error) => console.error('Error creating appointment', error)
      );
    }
  }
}
