import {Component, OnInit} from '@angular/core';
import {CatalogService, ServiceItem, Category} from '../../shared/services/catalog.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {JsonPipe, NgFor, NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-service-management',
  standalone: true,
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.scss'],
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
export class ServiceManagementComponent implements OnInit {
  services: ServiceItem[] = [];
  categories: Category[] = [];
  serviceForm: FormGroup;
  editingService: ServiceItem | null = null;

  displayedColumns: string[] = ['name', 'category', 'price', 'images', 'actions'];

  constructor(
    private catalogService: CatalogService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.serviceForm = this.fb.group({
      name: [''],
      description: [''],
      price: [0],
      categoryId: [null],
      imageUrls: [''],
    });
  }

  ngOnInit(): void {
    this.loadServices();
    this.loadCategories();
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

  getCategoryName(categoryId: any) {
    if (typeof categoryId === 'string') {
      // @ts-ignore
      const category = this.categories.find((c) => c.id === categoryId);
      return category ? category.name : 'Unknown';
    } else {
      let categoryName = '';
      categoryId.forEach((cId:number, key: number, arr: string | any[]) => {
        const category = this.categories.find((c) => c.id === cId);
        categoryName =  category ? (categoryName + category.name + (key < arr.length -1 ?', ':''))  : 'Unknown';
      })
      return categoryName;
    }
  }

  // onFileChange(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     // Convert the file to Base64 string
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.serviceForm.patchValue({
  //         imageUrl: reader.result as string,
  //       });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }
  onFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const imagePromises = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        const promise = new Promise<string>((resolve) => {
          reader.onload = () => {
            resolve(reader.result as string);
          };
          debugger;
          reader.readAsDataURL(file);
        });
        imagePromises.push(promise);
      }
      Promise.all(imagePromises).then((images) => {
        this.serviceForm.patchValue({
          imageUrls: images,
        });
      });
    }
  }


  // submitService() {
  //   if (this.serviceForm.valid) {
  //     const serviceData = this.serviceForm.value;
  //     if (this.editingService) {
  //       const updatedService = {
  //         ...this.editingService,
  //         ...serviceData,
  //       };
  //       this.catalogService.updateService(updatedService).subscribe(() => {
  //         this.resetForm();
  //         this.loadServices();
  //       });
  //     } else {
  //       this.catalogService.createService(serviceData).subscribe(() => {
  //         this.resetForm();
  //         this.loadServices();
  //       });
  //     }
  //   }
  // }
  submitService() {
    if (this.serviceForm.valid) {
      const serviceData = this.serviceForm.value;
      if (this.editingService) {
        const updatedService = {
          ...this.editingService,
          ...serviceData,
        };
        this.catalogService.updateService(updatedService).subscribe(() => {
          this.resetForm();
          this.loadServices();
        });
      } else {
        this.catalogService.createService(serviceData).subscribe(() => {
          this.resetForm();
          this.loadServices();
        });
      }
    }
  }

  editService(service: ServiceItem) {
    this.editingService = service;
    this.serviceForm.patchValue(service);
  }

  deleteService(id: number) {
    if (confirm('Are you sure you want to delete this service?')) {
      this.catalogService.deleteService(id).subscribe(() => {
        this.loadServices();
      });
    }
  }

  resetForm() {
    this.serviceForm.reset();
    this.editingService = null;
  }
}
