import { OnInit, Component } from "@angular/core";
import { RacunService } from "../../services/racun.service";
import { Racun } from '../../models/racun';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { RacunDialogComponent } from '../dialogs/racun-dialog/racun-dialog.component';
import { Pacijent } from '../../models/pacijent';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnInit {
  displayedColumns = ['id', 'datum', 'pacijent', 'ukupno', 'add', 'edit', 'delete'];
  dataSource: MatTableDataSource<Racun>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _racun: RacunService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }
  public loadData() {
    this._racun.getAllRacun().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Racun>(data);
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
  public openDialog(flag: number, id: number, datum: Date, lookup: string,
                    pacijent: Pacijent, ukupno: number) {


const dialogRef = this.dialog.open(RacunDialogComponent, {
data: { id: id, datum: datum, lookup: lookup, pacijent: pacijent, ukupno: ukupno }
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
}
