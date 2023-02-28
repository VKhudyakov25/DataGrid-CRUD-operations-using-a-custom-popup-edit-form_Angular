import { Injectable } from '@angular/core';

export class Employee {
  FirstName: string;
  LastName: string;
  ID: number;

  constructor() {
    this.FirstName = '';
    this.LastName = '';
  }
}
let employees: Employee[] = [
  { ID: 1, FirstName: 'Sandra', LastName: 'Johnson' },
  { ID: 2, FirstName: 'James', LastName: 'Scott' },
  { ID: 3, FirstName: 'Nancy', LastName: 'Smith' },
];

@Injectable()
export class AppService {
  getEmployees() {
    return employees;
  }
}
