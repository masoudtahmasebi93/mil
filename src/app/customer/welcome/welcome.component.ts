import {Component, OnInit} from '@angular/core';
import {
  CatalogService,
  Category,
} from '../../shared/services/catalog.service';
import {CategoryListComponent} from '../category-list/category-list.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms'; // For ngModel binding
import {MatSelectModule} from '@angular/material/select'; // Import MatSelectModule
import {MatOptionModule} from '@angular/material/core';
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {Router, RouterLink} from "@angular/router"; // Import MatOptionModule
import { MatIcon } from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    CategoryListComponent,
    CommonModule,
    FormsModule, // For ngModel binding
    MatSelectModule, // Include MatSelectModule
    MatOptionModule,
    MatInput,
    MatButton,
    MatToolbar,
    MatIcon,
    MatMenu,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    RouterLink,
    // Include MatOptionModule
  ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  categories: Category[] = [];
  catalogs: Category[] = []; // Catalogs for the dropdown
  filteredCategoriesList: Category[] = [];

  searchTerm: string = ''; // Search term
  selectedCatalogId: string = ''; // Selected catalog ID

  constructor(private catalogService: CatalogService, private router: Router) {
  }

  title = 'Armani Nail Salon';


  navigateToBooking() {
    this.router.navigate(['/book']);
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  // Load categories from your service
  loadCategories(): void {
    this.catalogService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
      this.catalogs = categories; // Assuming catalogs are the same as categories
      this.filterCategories(); // Filter categories initially
    });
  }

  // Method to filter categories based on the search term and selected catalog
  filterCategories(): void {
    let filtered = this.categories;

    // Filter by search term
    if (this.searchTerm) {
      filtered = filtered.filter((category) =>
        category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Filter by selected catalog
    if (this.selectedCatalogId) {
      filtered = filtered.filter(
        (category) => category.id.toString() === this.selectedCatalogId
      );
    }

    this.filteredCategoriesList = filtered;
  }

  // Trigger filtering when the search term changes
  onSearchTermChange(): void {
    this.filterCategories();
  }

  // Trigger filtering when the catalog is selected from the dropdown
  onCatalogChange(): void {
    this.filterCategories();
  }
}
