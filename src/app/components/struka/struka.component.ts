import { OnInit, Component } from "@angular/core";
import { StrukaService } from "../../services/struka.service";
import { Struka } from '../../models/struka';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { StrukaDialogComponent } from '../dialogs/struka-dialog/struka-dialog.component';

@Component({
  selector: 'app-struka',
  templateUrl: './struka.component.html',
  styleUrls: ['./struka.component.css']
})
export class StrukaComponent implements OnInit {
  displayedColumns = ['id', 'naziv', 'stepen', 'add', 'edit', 'delete'];
  dataSource: MatTableDataSource<Struka>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _struka: StrukaService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }
  public loadData() {
    this._struka.getAllStruka().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Struka>(data);
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
  public openDialog(flag: number, id: number, naziv: string, stepen: string) {


    const dialogRef = this.dialog.open(StrukaDialogComponent, {
    data: { id: id, naziv: naziv, stepen: stepen}
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
