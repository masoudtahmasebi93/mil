import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {JsonPipe, NgFor, NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {DomSanitizer} from "@angular/platform-browser";
import {CatalogService, Category, MenuItem, ServiceItem} from "../../shared/services/catalog.service";

@Component({
  selector: 'app-menu-management',
  standalone: true,
  templateUrl: './menu-management.component.html',
  styleUrls: ['./menu-management.component.scss'],
  imports: [
    MatTableModule,
    MatButtonModule,
    NgFor,
    NgIf,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    JsonPipe
  ],
})
export class MenuManagementComponent implements OnInit {
  services: ServiceItem[] = [];
  menus: MenuItem[] = [];
  categories: Category[] = [];
  menuForm: FormGroup;
  editingMenu: MenuItem | null = null;

  displayedColumns: string[] = ['name', 'category', 'image', 'actions'];

  constructor(
    private catalogService: CatalogService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.menuForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: [null, Validators.required],
      imageUrl: [''],
    });
  }

  ngOnInit(): void {
    this.loadServices();
    this.loadCategories();
    this.loadMenus();
  }

  loadServices() {
    this.catalogService.getServices().subscribe((data) => {
      this.services = data;
    });
  }

  loadCategories() {
    this.catalogService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  loadMenus() {
    this.catalogService.getMenus().subscribe((data) => {
      this.menus = data;
    });
  }

  getMenuName(menuId: any) {
    if (typeof menuId === 'string') {
      // @ts-ignore
      const menu = this.categories.find((c) => c.id === menuId);
      return menu ? menu.name : 'Unknown';
    } else {
      let menuName = '';
      menuId.forEach((cId:number, key: number, arr: string | any[]) => {
        const menu = this.categories.find((c) => c.id === cId);
        menuName =  menu ? (menuName + menu.name + (key < arr.length -1 ?', ':''))  : 'Unknown';
      })
      return menuName;
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Convert the file to Base64 string
      const reader = new FileReader();
      reader.onload = () => {
        this.menuForm.patchValue({
          imageUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  submitMenu() {
    if (this.menuForm.valid) {
      const menuData = this.menuForm.value;
      if (this.editingMenu) {
        const updatedMenu = {
          ...this.editingMenu,
          ...menuData,
        };
        this.catalogService.updateMenu(updatedMenu).subscribe(() => {
          this.resetForm();
          this.loadMenus();
        });
      } else {
        this.catalogService.createMenu(menuData).subscribe(() => {
          this.resetForm();
          this.loadMenus();
        });
      }
    }
  }

  editMenu(menu: MenuItem) {
    this.editingMenu = menu;
    this.menuForm.patchValue(menu);
  }

  deleteMenu(id: number) {
    if (confirm('Are you sure you want to delete this menu?')) {
      this.catalogService.deleteMenu(id).subscribe(() => {
        this.loadMenus();
      });
    }
  }

  resetForm() {
    this.menuForm.reset();
    this.editingMenu = null;
  }
}
