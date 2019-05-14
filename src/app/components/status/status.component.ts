import { OnInit, Component } from "@angular/core";
import { StatusService } from "../../services/status.service";
import { Status } from '../../models/status';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { StatusDialogComponent } from '../dialogs/status-dialog/status-dialog.component';
import { Slika } from '../../models/slika';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  displayedColumns = ['id', 'opis', 'zaPovrsine', 'slika', 'add', 'edit', 'delete'];
  dataSource: MatTableDataSource<Status>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _status: StatusService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }
  public loadData() {
    this._status.getAllStatus().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Status>(data);
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
  public openDialog(flag: number, id: number, opis: Date, zaPovrsine: number,
                    slika: Slika) {


const dialogRef = this.dialog.open(StatusDialogComponent, {
data: { id: id, opis: opis, zaPovrsine: zaPovrsine, slika: slika }
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
