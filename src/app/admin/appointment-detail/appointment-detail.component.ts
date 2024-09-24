import { Component, OnInit } from '@angular/core';
import { AppointmentService, Appointment } from '../../shared/services/appointment.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-appointment-detail',
  standalone: true,
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NgIf,
  ],
})
export class AppointmentDetailComponent implements OnInit {
  appointmentForm: FormGroup;
  appointmentId: number =0;
  appointment: any;
  statuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];

  constructor(
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.appointmentForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', [Validators.required, Validators.email]],
      date: ['', Validators.required],
      time: ['', Validators.required],
      status: ['', Validators.required],
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.appointmentId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAppointment();
  }

  loadAppointment() {
    this.appointmentService.getAppointmentById(this.appointmentId).subscribe(
      (data) => {
        this.appointment = data;
        this.appointmentForm.patchValue(data);
      },
      (error) => console.error('Error fetching appointment', error)
    );
  }

  updateAppointment() {
    if (this.appointmentForm.valid && this.appointment) {
      const updatedAppointment: Appointment = {
        ...this.appointment,
        ...this.appointmentForm.value,
      };
      this.appointmentService
        .updateAppointment(this.appointmentId, updatedAppointment)
        .subscribe(
          () => {
            alert('Appointment updated successfully');
          },
          (error) => console.error('Error updating appointment', error)
        );
    }
  }
}
