import { OnInit, Component } from "@angular/core";
import { PlanRadaService } from "../../services/plan-rada.service";
import { PlanRada } from '../../models/plan-rada';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { PlanRadaDialogComponent } from '../dialogs/plan-rada-dialog/plan-rada-dialog.component';
import { Zaposleni } from '../../models/zaposleni';
import { Pacijent } from '../../models/pacijent';

@Component({
  selector: 'app-plan-rada',
  templateUrl: './plan-rada.component.html',
  styleUrls: ['./plan-rada.component.css']
})
export class PlanRadaComponent implements OnInit {
  displayedColumns = ['id', 'datum', 'pacijent', 'zaposleni', 'add', 'edit', 'delete'];
  dataSource: MatTableDataSource<PlanRada>;
  selektovanPlan: PlanRada;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _planRada: PlanRadaService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }
  public loadData() {
    this._planRada.getAllPlanRada().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<PlanRada>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('finish');
      }
    );
  }
  public openDialog(flag: number, id: number, datum: Date, lookup: string, pacijent: Pacijent,
                    zaposleni: Zaposleni) {


const dialogRef = this.dialog.open(PlanRadaDialogComponent, {
data: { id: id, datum: datum, lookup: lookup, pacijent: pacijent, zaposleni: zaposleni }
});
dialogRef.componentInstance.flag = flag;
dialogRef.afterClosed().subscribe(result => {
this.loadData();
});
}
applyFilter(filterValue: string) {
  filterValue = filterValue.trim();
  filterValue = filterValue.toLowerCase();
  this.dataSource.filter = filterValue;
}
public selectRow(row) {
  this.selektovanPlan = row;
}

selectedRowIndex: number;
   
highlight(row) {
    this.selectedRowIndex = row.id;
}
}
