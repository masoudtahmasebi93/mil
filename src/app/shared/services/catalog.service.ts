// catalog.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environment";

export interface Category {
  id: number;
  name: string;
  imageUrl?: string;
  description?: string;
}

export interface ServiceItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
}

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private apiUrl = environment.baseUrl; // JSON Server URL

  constructor(private http: HttpClient) {}

  // Category methods
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/categories`, category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(
      `${this.apiUrl}/categories/${category.id}`,
      category
    );
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/categories/${id}`);
  }

  // Service methods
  getServices(): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>(`${this.apiUrl}/services`);
  }

  createService(service: ServiceItem): Observable<ServiceItem> {
    return this.http.post<ServiceItem>(`${this.apiUrl}/services`, service);
  }

  updateService(service: ServiceItem): Observable<ServiceItem> {
    return this.http.put<ServiceItem>(
      `${this.apiUrl}/services/${service.id}`,
      service
    );
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/services/${id}`);
  }
}
