import { OnInit, Component } from "@angular/core";
import { ZubService } from "../../services/zub.service";
import { Zub } from '../../models/zub';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { ZubDialogComponent } from '../dialogs/zub-dialog/zub-dialog.component';
import { Status } from '../../models/status';
import { Pacijent } from '../../models/pacijent';

@Component({
  selector: 'app-zub',
  templateUrl: './zub.component.html',
  styleUrls: ['./zub.component.css']
})
export class ZubComponent implements OnInit {
  displayedColumns = ['id', 'pacijent', 'status1', 'status2', 'add', 'edit', 'delete'];
  dataSource: MatTableDataSource<Zub>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _zub: ZubService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }
  public loadData() {
    this._zub.getAllZub().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Zub>(data);
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
  public openDialog(flag: number, id: number, pacijent: Pacijent, status1: Status, status2: Status) {


    const dialogRef = this.dialog.open(ZubDialogComponent, {
    data: { id: id, pacijent: pacijent, status1: status1, status2: status2}
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
