import { OnInit, Component } from "@angular/core";
import { IsplataService } from "../../services/isplata.service";
import { Isplata } from '../../models/isplata';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { IsplataDialogComponent } from '../dialogs/isplata-dialog/isplata-dialog.component';
import { Zaposleni } from '../../models/zaposleni';

@Component({
  selector: 'app-isplata',
  templateUrl: './isplata.component.html',
  styleUrls: ['./isplata.component.css']
})
export class IsplataComponent implements OnInit {
  displayedColumns = ['id', 'datum', 'iznos', 'napomena', 'zaposleni', 'add', 'edit', 'delete'];
  dataSource: MatTableDataSource<Isplata>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _isplata: IsplataService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }
  public loadData() {
    this._isplata.getAllIsplata().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Isplata>(data);
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
  public openDialog(flag: number, id: number, datum: Date, iznos: number, napomena: string,
                    zaposleni: Zaposleni) {


const dialogRef = this.dialog.open(IsplataDialogComponent, {
data: { id: id, datum: datum, iznos: iznos, napomena: napomena, zaposleni: zaposleni }
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
