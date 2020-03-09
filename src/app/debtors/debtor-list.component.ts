import { Component, OnInit } from '@angular/core';
import {Debtor} from '../models';
import {DebtorsService} from '../services';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-debtor-list',
  templateUrl: './debtor-list.component.html',
  styleUrls: ['./debtor-list.component.less']
})
export class DebtorListComponent implements OnInit {

  debtors: Debtor[] = [];

  constructor(private debtorsService: DebtorsService) { }

  ngOnInit() {
    this.loadDebtors();
  }

  loadDebtors(): void {
    this.debtorsService.getAll().pipe(first()).subscribe(debtors => {
      this.debtors = debtors;
    });
  }
}
