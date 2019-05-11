import { OnInit, Component } from "@angular/core";
import { ArtiklService } from "../../services/artikl.service";
import { Artikl } from '../../models/artikl';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { ArtiklDialogComponent } from '../dialogs/artikl-dialog/artikl-dialog.component';

@Component({
  selector: 'app-artikl',
  templateUrl: './artikl.component.html',
  styleUrls: ['./artikl.component.css']
})
export class ArtiklComponent implements OnInit {
  displayedColumns = ['id', 'naziv', 'proizvodjac', 'add', 'edit', 'delete'];
  dataSource: MatTableDataSource<Artikl>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _artikl: ArtiklService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }
  public loadData() {
    this._artikl.getAllArtikl().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Artikl>(data);
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
  public openDialog(flag: number, id: number, naziv: string, proizvodjac: string) {


const dialogRef = this.dialog.open(ArtiklDialogComponent, {
data: { id: id, naziv: naziv, proizvodjac: proizvodjac}
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
