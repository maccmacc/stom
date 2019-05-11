import { OnInit, Component } from "@angular/core";
import { MaterijalService } from "../../services/materijal.service";
import { Materijal } from '../../models/materijal';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { MaterijalDialogComponent } from '../dialogs/materijal-dialog/materijal-dialog.component';

@Component({
  selector: 'app-materijal',
  templateUrl: './materijal.component.html',
  styleUrls: ['./materijal.component.css']
})
export class MaterijalComponent implements OnInit {
  displayedColumns = ['id', 'naziv', 'proizvodjac', 'add', 'edit', 'delete'];
  dataSource: MatTableDataSource<Materijal>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _materijal: MaterijalService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }
  public loadData() {
    this._materijal.getAllMaterijal().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Materijal>(data);
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


    const dialogRef = this.dialog.open(MaterijalDialogComponent, {
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
