import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Debtor, Killer} from '../models';
import {DebtorsService} from '../services';
import {first} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {AddDebtorComponent} from './add-debtor/add-debtor.component';
import {EditDebtorComponent} from './edit-debtor/edit-debtor.component';
import {ForgiveComponent} from './forgive/forgive.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-debtor-list',
  templateUrl: './debtor-list.component.html',
  styleUrls: ['./debtor-list.component.less']
})
export class DebtorListComponent implements OnInit, OnChanges {

  debtors: Debtor[] = [];
  dataSource = new MatTableDataSource(this.debtors);
  displayedColumns = ['name', 'lastname', 'age', 'debt', 'delete', 'edit', 'cancel order', 'location'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() locateDebtor = new EventEmitter();

  constructor(private debtorsService: DebtorsService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadDebtors();
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadDebtors();
  }

  loadDebtors(): void {
    this.debtorsService.getAll().pipe(first()).subscribe(debtors => {
      this.debtors = debtors;
      this.dataSource.data = this.debtors;
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

  openForgiveDialog(debtor: Debtor) {
    this.dialog.open(ForgiveComponent, {
      data: {
        id: debtor.id, name: debtor.name, lastname: debtor.lastname
      }
    })
      .afterClosed().subscribe(() => {
        this.loadDebtors();
    });
  }

  locate(debtor: Debtor) {
    this.locateDebtor.emit(debtor);
  }
}
