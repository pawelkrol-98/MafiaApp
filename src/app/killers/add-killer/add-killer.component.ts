import { Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DebtorsService, KillerService} from '../../services';

@Component({
  selector: 'app-add-killer',
  templateUrl: './add-killer.component.html',
  styleUrls: ['./add-killer.component.less']
})
export class AddKillerComponent implements OnInit {

  killerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private killersService: KillerService) { }

  ngOnInit(): void {
    this.killerForm = this.buildKillerForm();
  }

  buildKillerForm() {
    return this.formBuilder.group({
      pseudonym: '',
      salary: '',
      location: '',
    });
  }

  addKiller() {
    this.killersService.addKiller(this.killerForm.value).subscribe(() => {
      this.killersService.getAll();
    });
  }
}
