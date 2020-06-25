import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Killer} from '../models';
import {KillerService} from '../services';
import {first} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {AddKillerComponent} from './add-killer/add-killer.component';
import {EditKillerComponent} from './edit-killer/edit-killer.component';
import {SetTargetComponent} from './set-target/set-target.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-killers-list',
  templateUrl: './killers-list.component.html',
  styleUrls: ['./killers-list.component.less']
})
export class KillersListComponent implements OnInit {

  killers: Killer[] = [];
  dataSource = new MatTableDataSource(this.killers);
  displayedColumns = ['pseudonym', 'salary', 'delete', 'edit', 'target', 'location'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() locateKiller = new EventEmitter();

  constructor(private killerService: KillerService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadKillers();
    this.dataSource.sort = this.sort;
  }

  loadKillers(): void {
    this.killerService.getAll().pipe(first()).subscribe(killers => {
      this.killers = killers;
      this.dataSource.data = this.killers;
    });
  }

  openAddDialog() {
    this.dialog.open(AddKillerComponent).afterClosed().subscribe(() => {
      this.loadKillers();
    });
  }

  openEditDialog(killer: Killer) {
    this.dialog.open(EditKillerComponent, {
      data: {
        id: killer.id, pseudonym: killer.pseudonym, salary: killer.salary, location: killer.location
      }
    }).afterClosed().subscribe(() => {
      this.loadKillers();
    });
  }

  deleteKiller(killer: Killer) {
    this.killerService.deleteKiller(killer.id).subscribe(() => {
      this.loadKillers();
    });
  }

  openTargetDialog(killer: Killer) {
    this.dialog.open(SetTargetComponent, {
      width: '400px',
      data: {id: killer.id, targetID: killer.targetId, name: killer.pseudonym}
    }).afterClosed().subscribe(() => {
      this.loadKillers();
    });
  }

  locate(killer: Killer) {
    this.locateKiller.emit(killer);
  }

}
