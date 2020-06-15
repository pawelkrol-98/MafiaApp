import {Component, Inject, OnInit} from '@angular/core';
import {Debtor} from '../../models';
import {MatTableDataSource} from '@angular/material/table';
import {DebtorsService, KillerService} from '../../services';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-set-target',
  templateUrl: './set-target.component.html',
  styleUrls: ['./set-target.component.less']
})
export class SetTargetComponent implements OnInit {

  debtorsData: Debtor [];
  dataSource = new MatTableDataSource(this.debtorsData);
  displayedColumns = ['name', 'lastname', 'age', 'debt', 'select'];

  constructor(private debtorsService: DebtorsService, private killersService: KillerService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<SetTargetComponent>) {
    this.debtorsService.getAll().subscribe(debtorsData => {
      this.debtorsData = debtorsData;
      this.dataSource.data = this.debtorsData;
    });
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setTarget(killerId: number, targetId: number) {
    this.killersService.setTarget({killerId, targetId}).subscribe(
      data => console.log(data), error => console.log(error));
  }

  cancelTarget(targetId: number) {
    this.killersService.cancelTarget(targetId).subscribe(
      data => console.log(data, targetId), error => console.log(error));
  }
}
