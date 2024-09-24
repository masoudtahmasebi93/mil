import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://api.zenoti.com/v1'; // Replace with actual base URL
  private apiToken = 'YOUR_API_TOKEN'; // Replace with your API token

  constructor(private http: HttpClient) {}

  get(endpoint: string) {
    return this.http.get(`${this.baseUrl}/${endpoint}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.apiToken}`,
      }),
    });
  }

  post(endpoint: string, data: any) {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json',
      }),
    });
  }

  // Add put, delete methods as needed
}
