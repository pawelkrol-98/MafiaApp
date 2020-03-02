import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Debtor} from '../models';

@Injectable({ providedIn: 'root' })
export class DebtorsService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Debtor[]>(`http://localhost:8443/api/debtors/list`);
  }
}
