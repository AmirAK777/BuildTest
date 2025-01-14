import { Component, inject, input, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CustomersStore } from '../../../features/getCustomersByRole/store';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
 
} from '@angular/forms';

@Component({
  selector: 'clovis-crm',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './crm.component.html',
  styleUrl: './crm.component.scss',
})
export class CrmComponent {
  displayedColumns = input.required<string[]>();

  store = inject(CustomersStore);
  ngOnInit(): void {
    const searchParams = this.store.searchParams.title;
    if (searchParams) {
      this.loginForm.patchValue({
        title: searchParams(),
      });
    }
  }
  loginForm = inject(FormBuilder).group({
    title: new FormControl(''),
  });

  searchFilters() {
    if (this.loginForm.value.title) {
      this.store.updateQuery({
        title: this.loginForm.value.title,
      });
    }
  }
  clearFilters() {
    if (this.loginForm.value.title) {
      this.loginForm.reset();
      this.store.updateQuery({
        title: undefined,
      });
    }
  }

  pageChanged(event: PageEvent) {
    this.store.updateQuery({
      page: event.pageIndex,
      itemsPerPage: event.pageSize,
    });
  }
}
