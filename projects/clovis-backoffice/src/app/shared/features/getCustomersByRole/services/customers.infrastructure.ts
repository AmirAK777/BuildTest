import { Injectable, inject } from '@angular/core';
import { delay, Observable, of, shareReplay, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Admin,
  Consulant,
  Marketing,
  PaginatedResult,
  Pagination,
  Sdr,
  SearchParams,
  User,
  Users,
} from 'models-lib';

const fakeService: CustomersInfrastructure = {
  getCustomersByConsultantId(
    SearchParam: SearchParams,
    consultantId?: string
  ): Observable<PaginatedResult<Users>> {
    // Données fictives pour les utilisateurs
    const users: Users = [
      {
        id: '1',
        roles: ['admin'],
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      },
      {
        id: '2',
        roles: ['user'],
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
      },
      {
        id: '3',
        roles: ['modo'],
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
      },
      {
        id: '4',
        roles: ['admin'],
        firstName: 'Bob',
        lastName: 'Brown',
        email: 'bob.brown@example.com',
      },
      {
        id: '5',
        roles: ['user'],
        firstName: 'Charlie',
        lastName: 'Davis',
        email: 'charlie.davis@example.com',
      },
      {
        id: '6',
        roles: ['user'],
        firstName: 'David',
        lastName: 'Wilson',
        email: 'david.wilson@example.com',
      },
      {
        id: '7',
        roles: ['modo'],
        firstName: 'Eve',
        lastName: 'Taylor',
        email: 'eve.taylor@example.com',
      },
      {
        id: '8',
        roles: ['admin'],
        firstName: 'Frank',
        lastName: 'Martinez',
        email: 'frank.martinez@example.com',
      },
      {
        id: '9',
        roles: ['user'],
        firstName: 'Grace',
        lastName: 'Anderson',
        email: 'grace.anderson@example.com',
      },
      {
        id: '10',
        roles: ['modo'],
        firstName: 'Hannah',
        lastName: 'Thomas',
        email: 'hannah.thomas@example.com',
      },
      {
        id: '11',
        roles: ['user'],
        firstName: 'Ian',
        lastName: 'Moore',
        email: 'ian.moore@example.com',
      },
      {
        id: '12',
        roles: ['admin'],
        firstName: 'Jack',
        lastName: 'Jackson',
        email: 'jack.jackson@example.com',
      },
      {
        id: '13',
        roles: ['modo'],
        firstName: 'Katherine',
        lastName: 'Lee',
        email: 'katherine.lee@example.com',
      },
      {
        id: '14',
        roles: ['admin'],
        firstName: 'Luke',
        lastName: 'Harris',
        email: 'luke.harris@example.com',
      },
      {
        id: '15',
        roles: ['user'],
        firstName: 'Megan',
        lastName: 'Clark',
        email: 'megan.clark@example.com',
      },
      {
        id: '16',
        roles: ['modo'],
        firstName: 'Nina',
        lastName: 'Lewis',
        email: 'nina.lewis@example.com',
      },
      {
        id: '17',
        roles: ['user'],
        firstName: 'Oscar',
        lastName: 'Walker',
        email: 'oscar.walker@example.com',
      },
      {
        id: '18',
        roles: ['admin'],
        firstName: 'Paul',
        lastName: 'Young',
        email: 'paul.young@example.com',
      },
      {
        id: '19',
        roles: ['modo'],
        firstName: 'Quincy',
        lastName: 'King',
        email: 'quincy.king@example.com',
      },
      {
        id: '20',
        roles: ['user'],
        firstName: 'Rachel',
        lastName: 'Scott',
        email: 'rachel.scott@example.com',
      },
    ];

    // Filtrage des utilisateurs par "title" (ici considéré comme un filtre par nom complet pour l'exemple)
    const filteredUsers = SearchParam.title
      ? users.filter((user) =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(SearchParam.title!.toLowerCase())
        )
      : users;

    // Pagination dynamique en fonction de la page et des éléments par page
    const page = SearchParam.page || 1;
    const itemsPerPage = SearchParam.itemsPerPage || 1;

    // Calcul des indices de début et de fin pour la pagination
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    const pagination: Pagination = {
      currentPage: page || 1,
      itemsPerPage: itemsPerPage || 1,
      totalItems: filteredUsers.length || 1,
      totalPages: Math.ceil(filteredUsers.length / itemsPerPage),
    };

    // Création de l'objet PaginatedResult
    const result: PaginatedResult<Users> = {
      result: paginatedUsers,
      pagination: pagination,
    };

    return of(result);
  },

  getCustomersBySdrId(
    sdrId: string,
    SearchParam?: SearchParams
  ): Observable<PaginatedResult<Users>> {
    throw new Error('Not implemented');
  },
};
@Injectable({
  providedIn: 'root',
  useValue: fakeService,
})
export class CustomersInfrastructure {
  getCustomersByConsultantId(
    SearchParam: SearchParams,
    consultantId?: string
  ): Observable<PaginatedResult<Users>> {
    throw new Error('Not implemented');
  }
  getCustomersBySdrId(
    sdrId: string,
    SearchParam?: SearchParams
  ): Observable<PaginatedResult<Users>> {
    throw new Error('Not implemented');
  }
}
