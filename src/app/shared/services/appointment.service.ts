// appointment.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environment";


// shared/services/appointment.service.ts
export interface Appointment {
  id: number;
  name: string;
  contact: string;
  serviceId: number;
  date: string; // Use ISO string format
  time: string;
  status: string; // e.g., 'Pending', 'Confirmed', 'Completed'
  notes?: string;
  // Add any other fields as necessary
}


@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = environment.baseUrl + '/appointments'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  getAppointmentById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointment);
  }

  updateAppointment(id: number, appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}/${id}`, appointment);
  }

  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
