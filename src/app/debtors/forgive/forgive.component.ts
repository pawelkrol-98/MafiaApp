import {Component, Inject, OnInit} from '@angular/core';
import {DebtorsService} from '../../services';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-forgive',
  templateUrl: './forgive.component.html',
  styleUrls: ['./forgive.component.less']
})
export class ForgiveComponent implements OnInit {

  constructor(private debtorsService: DebtorsService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ForgiveComponent>) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  cancelOrder(debtorId: number) {
    this.debtorsService.cancelOrder(debtorId)
      .subscribe(
        () => this.dialogRef.close());
    window.location.reload();
  }
}
