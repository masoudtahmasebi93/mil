import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { CatalogService } from '../../shared/services/catalog.service';
import {MatCard, MatCardContent} from "@angular/material/card";
import {DatePipe, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-appointment-confirmation',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    NgIf,
    DatePipe,
    MatButton,
    RouterLink
  ],
  templateUrl: './appointment-confirmation.component.html',
  styleUrl: './appointment-confirmation.component.scss'
})
export class AppointmentConfirmationComponent implements OnInit {
  appointmentData: any;
  serviceName: string = '';

  constructor(private router: Router, private catalogService: CatalogService) {
    const navigation = this.router.getCurrentNavigation();
    // @ts-ignore
    this.appointmentData = navigation?.extras?.state?.data;
  }

  ngOnInit(): void {
    if (!this.appointmentData) {
      // Redirect to booking page if no data
      this.router.navigate(['/book']);
    } else {
      // Get the service name
      this.catalogService.getServices().subscribe((services) => {
        // @ts-ignore
        const service = services.find(
          (s: any) => s.id === +this.appointmentData.serviceId
        );
        this.serviceName = service ? service.name : '';
      });
    }
  }
}
