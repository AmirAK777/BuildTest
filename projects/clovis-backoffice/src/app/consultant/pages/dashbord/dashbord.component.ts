import { Component, inject } from '@angular/core';
import { CrmComponent } from '../../../shared/ui/components/crm/crm.component';
import { CustomersStore } from '../../../shared/features/getCustomersByRole/store';

@Component({
  selector: 'clovis-dashbord',
  standalone: true,
  imports: [CrmComponent],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.scss',
})
export class DashbordComponent {
  displayedColumns: string[] = ['firstName', 'lastName'];
  store = inject(CustomersStore);

  ngOnInit(): void {
    console.log('init crm');
    const query = this.store.searchParams;
    this.store.getCustomersByConsultantId(query);
  }
}
