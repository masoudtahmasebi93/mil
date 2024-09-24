import { Component, OnInit } from '@angular/core';
import { CatalogService, Category, ServiceItem } from '../../shared/services/catalog.service';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle, MatCardTitle
} from "@angular/material/card";
import { RouterLink } from "@angular/router";
import { MatButton } from "@angular/material/button";
import { NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-service-catalog',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    RouterLink,
    MatButton,
    NgIf,
    MatCardImage,
    NgForOf,
    MatCardSubtitle,
    MatCardTitle
  ],
  templateUrl: './service-catalog.component.html',
  styleUrls: ['./service-catalog.component.scss']
})
export class ServiceCatalogComponent implements OnInit {
  categories: Category[] = [];
  services: ServiceItem[] = [];
  category: Category | undefined;
  categorizedServices: { category: Category; services: ServiceItem[] }[] = [];
  selectedCategoryId: number | null = null;

  constructor(
    private catalogService: CatalogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameters to get the category ID
    this.route.paramMap.subscribe((params: ParamMap) => {
      const categoryId = params.get('id');
      console.log('Route categoryId:', categoryId); // Debugging

      if (categoryId) {
        console.log('Parsed categoryId:', categoryId); // Debugging
        this.loadCategory(categoryId);
        this.loadServices(categoryId);
      } else {
        // Optionally, handle the case where no category ID is provided
        console.warn('No category ID found in route.');
        // For example, navigate back to welcome or show all services
      }
    });
  }

  loadCategory(id: string) {
    this.catalogService.getCategories().subscribe((categories) => {
      this.category = categories.find((c) => c.id.toString() === id);
      console.log('Loaded category:', this.category); // Debugging
      if (!this.category) {
        console.warn(`Category with id ${id} not found.`);
      }
    }, (error) => {
      console.error('Error loading categories:', error);
    });
  }

  loadServices(categoryId: string) {
    this.catalogService.getServices().subscribe((services) => {
      console.log('Fetched services:', services); // Debugging
      // Ensure type consistency: Convert service.categoryId to number if necessary
      this.services = services.filter(service => {
        const serviceCategoryId = service.categoryId.toString()
        console.log(`Service ID: ${service.id}, Category ID: ${serviceCategoryId}`);
        return serviceCategoryId.toString().includes(categoryId);
      });
      console.log('Filtered services:', this.services); // Debugging
    }, (error) => {
      console.error('Error loading services:', error);
    });
  }

  categorizeServices() {
    if (this.selectedCategoryId) {
      const category = this.categories.find(c => c.id === this.selectedCategoryId);
      if (category) {
        this.categorizedServices = [{
          category,
          services: this.services.filter(service => service.categoryId === category.id)
        }];
      }
    } else {
      this.categorizedServices = this.categories.map((category) => ({
        category,
        services: this.services.filter((service) => service.categoryId === category.id),
      }));
    }
  }
}
