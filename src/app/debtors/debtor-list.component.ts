import { Component, OnInit } from '@angular/core';
import {Debtor} from '../models';
import {DebtorsService} from '../services';
import {first} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {AddDebtorComponent} from './add-debtor/add-debtor.component';

@Component({
  selector: 'app-debtor-list',
  templateUrl: './debtor-list.component.html',
  styleUrls: ['./debtor-list.component.less']
})
export class DebtorListComponent implements OnInit {

  debtors: Debtor[] = [];

  constructor(private debtorsService: DebtorsService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.loadDebtors();
  }

  loadDebtors(): void {
    this.debtorsService.getAll().pipe(first()).subscribe(debtors => {
      this.debtors = debtors;
    });
  }

  openDialog() {
    this.dialog.open(AddDebtorComponent).afterClosed().subscribe(res => {
      this.loadDebtors();
    });
  }

  deleteDebtor(debtor: Debtor) {
    this.debtorsService.deleteDebtor(debtor.id).subscribe(() => {
      this.loadDebtors();
    });
  }
}
