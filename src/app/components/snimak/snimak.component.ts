import { OnInit, Component } from "@angular/core";
import { PacijentService } from "../../services/pacijent.service";
import { Pacijent } from '../../models/pacijent';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { SnimakDialogComponent } from '../dialogs/snimak-dialog/snimak-dialog.component';
import { Snimak } from '../../models/snimak';
import { SnimakService } from '../../services/snimak.service';


@Component({
  selector: 'app-snimak',
  templateUrl: './snimak.component.html',
  styleUrls: ['./snimak.component.css']
})
export class SnimakComponent implements OnInit {
  displayedColumns = ['id', 'datum', 'opis', 'pacijent', 'putanja', 'add', 'edit', 'delete'];
  dataSource: MatTableDataSource<Snimak>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _snimak: SnimakService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }
  public loadData() {
    this._snimak.getAllSnimak().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Snimak>(data);
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
  public openDialog(flag: number, datum: Date, id: number, opis: string, pacijent: Pacijent, putanja: string) {


const dialogRef = this.dialog.open(SnimakDialogComponent, {
data: { datum: datum, id: id, opis: opis, pacijent: pacijent, putanja: putanja}
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
