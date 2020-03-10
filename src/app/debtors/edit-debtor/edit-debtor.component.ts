import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DebtorsService} from '../../services';
import {Debtor} from '../../models';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-debtor',
  templateUrl: './edit-debtor.component.html',
  styleUrls: ['./edit-debtor.component.less']
})
export class EditDebtorComponent implements OnInit {
  debtorEditForm: FormGroup;
  debtor: Debtor;

  constructor(private formBuilder: FormBuilder,
              private debtorsService: DebtorsService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.debtorEditForm = this.buildDebtorEditForm();
  }

  buildDebtorEditForm() {
    this.debtor = this.data;
    return this.formBuilder.group({
      name: this.debtor.name,
      lastname: this.debtor.lastname,
      age: this.debtor.age,
      debt: this.debtor.debt,
      location: this.debtor.location,
    });
  }

  updateDebtor(debtorId: number) {
    this.debtorsService.updateDebtor(debtorId, this.debtorEditForm.value).subscribe(() => {
      this.debtorsService.getAll();
    });
  }
}
