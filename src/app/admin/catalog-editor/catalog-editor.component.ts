// catalog-editor.component.ts
import { Component } from '@angular/core';
import { CategoryManagementComponent } from '../category-management/category-management.component';
import { ServiceManagementComponent } from '../service-management/service-management.component';
import { MatTabsModule } from '@angular/material/tabs';
import {MenuManagementComponent} from "../menu-management/menu-management.component";

@Component({
  selector: 'app-catalog-editor',
  standalone: true,
  templateUrl: './catalog-editor.component.html',
  styleUrls: ['./catalog-editor.component.scss'],
  imports: [
    MatTabsModule,
    CategoryManagementComponent,
    ServiceManagementComponent,
    MenuManagementComponent,
  ],
})
export class CatalogEditorComponent {}
