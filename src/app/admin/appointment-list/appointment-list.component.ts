// appointment-list.component.ts
import { Component, OnInit } from '@angular/core';
import { AppointmentService, Appointment } from '../../shared/services/appointment.service';
import { DatePipe, NgIf, NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {CatalogService, ServiceItem} from "../../shared/services/catalog.service";

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    DatePipe,
    NgIf,
    NgFor,
  ],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss'],
})
export class AppointmentListComponent implements OnInit {
  appointments: Appointment[] = [];
  displayedColumns: string[] = ['id', 'customerName', 'date', 'status','service', 'actions'];
  services: ServiceItem[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private catalogService: CatalogService
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
    this.loadServices();
  }

  loadAppointments() {
    this.appointmentService.getAppointments().subscribe(
      (data) => (this.appointments = data),
      (error) => console.error('Error fetching appointments', error)
    );
  }

  deleteAppointment(id: number) {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.deleteAppointment(id).subscribe(() => {
        this.loadAppointments();
      });
    }
  }
  loadServices() {
    this.catalogService.getServices().subscribe(
      (data) => (this.services = data),
      (error) => console.error('Error fetching services', error)
    );
  }

  getServiceName(serviceId: number): string {
    const service = this.services.find((s) => s.id === serviceId);
    return service ? service.name : 'Unknown Service';
  }
}
