import { OnInit, Component } from "@angular/core";
import { DobavljacService } from "../../services/dobavljac.service";
import { Dobavljac } from '../../models/dobavljac';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { DobavljacDialogComponent } from '../dialogs/dobavljac-dialog/dobavljac-dialog.component';

@Component({
  selector: 'app-dobavljac',
  templateUrl: './dobavljac.component.html',
  styleUrls: ['./dobavljac.component.css']
})
export class DobavljacComponent implements OnInit {
  displayedColumns = ['id', 'adresa', 'kontakt', 'naziv', 'add', 'edit', 'delete'];
  dataSource: MatTableDataSource<Dobavljac>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _dobavljac: DobavljacService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }
  public loadData() {
    this._dobavljac.getAllDobavljac().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Dobavljac>(data);
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
  public openDialog(flag: number, id: number, adresa: string, kontakt: string, naziv: string) {


    const dialogRef = this.dialog.open(DobavljacDialogComponent, {
    data: { id: id, adresa: adresa, kontakt: kontakt, naziv: naziv}
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
