import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Widget} from '../models';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

interface DashResponse {
  widgets: string;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) { }

  getWidgets(userId): Observable<Widget[]> {
    return this.http.get<DashResponse>(`http://localhost:8443/api/dashboard/get/${userId}` ).pipe(
      map(value => JSON.parse(value.widgets))
    );
  }
}
