import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Debtor, Killer} from '../../models';
import {DebtorsService, KillerService} from '../../services';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-killer',
  templateUrl: './edit-killer.component.html',
  styleUrls: ['./edit-killer.component.less']
})
export class EditKillerComponent implements OnInit {
  killerEditForm: FormGroup;
  killer: Killer;

  constructor(private formBuilder: FormBuilder,
              private killerService: KillerService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.killerEditForm = this.buildDebtorEditForm();
  }

  buildDebtorEditForm() {
    this.killer = this.data;
    return this.formBuilder.group({
      pseudonym: this.killer.pseudonym,
      salary: this.killer.salary,
      location: this.killer.location,
    });
  }

  updateKiller(killerId: number) {
    this.killerService.updateKiller(killerId, this.killerEditForm.value).subscribe(() => {
      this.killerService.getAll();
    });
  }
}
