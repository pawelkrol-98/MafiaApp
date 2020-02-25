import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Killer } from '../models';

@Injectable({ providedIn: 'root' })
export class KillerService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Killer[]>(`http://localhost:8443/api/killers/list`);
  }
}
