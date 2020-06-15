import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Debtor} from '../models';
import {DebtorsService} from '../services';
import {first} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {AddDebtorComponent} from './add-debtor/add-debtor.component';
import {EditDebtorComponent} from './edit-debtor/edit-debtor.component';

@Component({
  selector: 'app-debtor-list',
  templateUrl: './debtor-list.component.html',
  styleUrls: ['./debtor-list.component.less']
})
export class DebtorListComponent implements OnInit, OnChanges {

  debtors: Debtor[] = [];

  constructor(private debtorsService: DebtorsService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadDebtors();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadDebtors();
  }

  loadDebtors(): void {
    this.debtorsService.getAll().pipe(first()).subscribe(debtors => {
      this.debtors = debtors;
    });
  }

  openAddDialog() {
    this.dialog.open(AddDebtorComponent).afterClosed().subscribe(() => {
      this.loadDebtors();
    });
  }

  openEditDialog(debtor: Debtor) {
    this.dialog.open(EditDebtorComponent, {
      data: {
        id: debtor.id, name: debtor.name, lastname: debtor.lastname, age: debtor.age, debt: debtor.debt, location: debtor.location
      }
    })
      .afterClosed().subscribe(() => {
      this.loadDebtors();
    });
  }

  deleteDebtor(debtor: Debtor) {
    this.debtorsService.deleteDebtor(debtor.id).subscribe(() => {
      this.loadDebtors();
    });
  }

}
