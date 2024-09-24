import { Component, OnInit } from '@angular/core';
import { CatalogService, Category } from '../../shared/services/catalog.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-category-management',
  standalone: true,
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss'],
  imports: [
    MatTableModule,
    MatButtonModule,
    NgFor,
    NgIf,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class CategoryManagementComponent implements OnInit {
  categories: Category[] = [];
  categoryForm: FormGroup;
  editingCategory: Category | null = null;

  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(
    private catalogService: CatalogService,
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.catalogService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  submitCategory() {
    if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;
      if (this.editingCategory) {
        const updatedCategory = {
          ...this.editingCategory,
          ...categoryData,
        };
        this.catalogService.updateCategory(updatedCategory).subscribe(() => {
          this.resetForm();
          this.loadCategories();
        });
      } else {
        this.catalogService.createCategory(categoryData).subscribe(() => {
          this.resetForm();
          this.loadCategories();
        });
      }
    }
  }

  editCategory(category: Category) {
    this.editingCategory = category;
    this.categoryForm.patchValue(category);
  }

  deleteCategory(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.catalogService.deleteCategory(id).subscribe(() => {
        this.loadCategories();
      });
    }
  }

  resetForm() {
    this.categoryForm.reset();
    this.editingCategory = null;
  }

}
