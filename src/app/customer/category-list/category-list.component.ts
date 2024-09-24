// src/app/customer/category-list/category-list.component.ts

import { Component, OnInit, Input } from '@angular/core';
import { CatalogService, Category } from '../../shared/services/catalog.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  @Input() categories: Category[] = [];

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.catalogService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
}
