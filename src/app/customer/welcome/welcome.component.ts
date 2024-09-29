import {Component, OnInit} from '@angular/core';
import {
  CatalogService,
  Category, MenuItem,
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
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription, MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatTab, MatTabGroup} from "@angular/material/tabs";

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
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatTabGroup,
    MatTab,
    // Include MatOptionModule
  ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  categories: Category[] = [];
  menus: MenuItem[] = [];
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
    this.loadMenus();
    this.loadCategories();
  }

  loadMenus(): void {
    this.catalogService.getMenus().subscribe((menus: MenuItem[]) => {
      this.menus = menus;
    });
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

  getCategoryName(cid: any) {
    return this.categories.find((category) =>
      category.id === cid.id
    );

  }

  getAllCategories(id: any) {
    return this.categories.filter((category) =>
      category?.menuId?.includes(id)
    );
  }
}
