import {Component, OnInit} from '@angular/core';
import {CatalogService, Category, MenuItem} from '../../shared/services/catalog.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {NgFor, NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";

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
    MatOption,
    MatSelect,
  ],
})
export class CategoryManagementComponent implements OnInit {
  categories: Category[] = [];
  categoryForm: FormGroup;
  editingCategory: Category | null = null;
  menus: MenuItem[] = [];

  displayedColumns: string[] = ['id', 'name', 'menu', 'actions'];

  constructor(
    private catalogService: CatalogService,
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      name: [''],
      menuId: [''],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadMenus();
  }

  loadMenus() {
    this.catalogService.getMenus().subscribe((data) => {
      this.menus = data;
    });
  }

  getMenuName(menuId: any) {
    if (menuId) {
      if (typeof menuId === 'string') {
        // @ts-ignore
        const menu = this.categories.find((c) => c.id === menuId);
        return menu ? menu.name : 'Unknown';
      } else {
        let menuName = '';
        menuId.forEach((cId: number, key: number, arr: string | any[]) => {
          const menu = this.menus.find((c) => c.id === cId);
          menuName = menu ? (menuName + menu.name + (key < arr.length - 1 ? ', ' : '')) : 'Unknown';
        })
        return menuName;
      }
    } else return '';
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
