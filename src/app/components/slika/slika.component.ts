import { OnInit, Component } from "@angular/core";
import { SlikaService } from "../../services/slika.service";
import { Slika } from '../../models/slika';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { SlikaDialogComponent } from '../dialogs/slika-dialog/slika-dialog.component';

@Component({
  selector: 'app-slika',
  templateUrl: './slika.component.html',
  styleUrls: ['./slika.component.css']
})
export class SlikaComponent implements OnInit {
  displayedColumns = ['id', 'naziv', 'putanjaaplikacija', 'putanjaizvestaj', 'add', 'edit', 'delete'];
  dataSource: MatTableDataSource<Slika>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _slika: SlikaService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }
  public loadData() {
    this._slika.getAllSlika().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Slika>(data);
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
  public openDialog(flag: number, id: number, naziv: string, putanjaaplikacija: string, putanjaizvestaj: string) {


    const dialogRef = this.dialog.open(SlikaDialogComponent, {
    data: { id: id, naziv: naziv, putanjaaplikacija: putanjaaplikacija, putanjaizvestaj: putanjaizvestaj}
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
