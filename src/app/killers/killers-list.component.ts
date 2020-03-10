import {Component, OnInit} from '@angular/core';
import {Killer} from '../models';
import {KillerService} from '../services';
import {first} from 'rxjs/operators';
import {AddDebtorComponent} from '../debtors/add-debtor/add-debtor.component';
import {MatDialog} from '@angular/material/dialog';
import {AddKillerComponent} from './add-killer/add-killer.component';
import {EditKillerComponent} from './edit-killer/edit-killer.component';

@Component({
  selector: 'app-killers-list',
  templateUrl: './killers-list.component.html',
  styleUrls: ['./killers-list.component.less']
})
export class KillersListComponent implements OnInit {

  killers: Killer[] = [];

  constructor(private killerService: KillerService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadKillers();
  }

  loadKillers(): void {
    this.killerService.getAll().pipe(first()).subscribe(killers => {
      this.killers = killers;
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
}
