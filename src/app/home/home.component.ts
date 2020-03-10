import {Component, OnInit, ViewChild} from '@angular/core';
import {first} from 'rxjs/operators';

import {Debtor, Killer, User, Widget} from '../models';
import {KillerService, AuthenticationService, DebtorsService, DashboardService} from '../services';
import {NgxWidgetGridComponent, WidgetPositionChange} from 'ngx-widget-grid';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.less']
})
export class HomeComponent implements OnInit {
  @ViewChild('grid', {static: true}) grid: NgxWidgetGridComponent;
  public rows = 200;
  public cols = 200;
  currentUser: User;
  public swapWidgets = false;
  public showGrid = false;
  public highlightNextPosition = false;
  private isEditable = false;

  public set editable(editable: boolean) {
    this.isEditable = editable;
    this.showGrid = editable;
  }

  public get editable() {
    return this.isEditable;
  }

  widgets: Widget[] = [];

  constructor(private killerService: KillerService,
              private debtorService: DebtorsService,
              private dashboardService: DashboardService,
              private authService: AuthenticationService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.loadWidgets();
  }

  loadWidgets(): void {
    this.dashboardService.getWidgets(this.currentUser.id).subscribe(widgets => {
      this.widgets = widgets;
    });
  }

  toggleHighlight(doHighlight: boolean) {
    this.highlightNextPosition = !!doHighlight;
  }

  onWidgetChange(event: WidgetPositionChange) {
  }

  doRows(add: boolean) {
    if (add) {
      this.rows++;
    } else {
      if (this.rows > 1) {
        this.rows--;
      }
    }
  }

  doCols(add: boolean) {
    if (add) {
      this.cols++;
    } else {
      if (this.cols > 1) {
        this.cols--;
      }
    }
  }

  saveWidgets() {
    this.dashboardService.saveWidgets(Number(this.currentUser.id), this.widgets).subscribe(success => {
      if (success) {
        this.loadWidgets();
      }
    });
  }
}
