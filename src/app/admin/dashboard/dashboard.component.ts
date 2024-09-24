import { Component } from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatSidenavContainer,
    MatNavList,
    MatListItem,
    RouterLink,
    RouterOutlet,
    MatSidenav,
    MatSidenavContent,
    MatToolbar,
    MatButton,
    MatIconModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
