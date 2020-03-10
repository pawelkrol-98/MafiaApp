import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DebtorsService} from '../../services';

@Component({
  selector: 'app-add-debtor',
  templateUrl: './add-debtor.component.html',
  styleUrls: ['./add-debtor.component.less'],
})
export class AddDebtorComponent implements OnInit {

  debtorForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private debtorsService: DebtorsService) {
  }

  ngOnInit(): void {
    this.debtorForm = this.buildDebtorForm();
  }

  buildDebtorForm() {
    return this.formBuilder.group({
      name: '',
      lastname: '',
      age: '',
      debt: '',
      location: '',
    });
  }

  addDebtor() {
    this.debtorsService.addDebtor(this.debtorForm.value).subscribe(() => {
      this.debtorsService.getAll();
    });
  }

}
