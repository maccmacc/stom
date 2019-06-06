import { OnInit, Component } from "@angular/core";
import { OrdinacijaService } from "../../services/ordinacija.service";
import { Ordinacija } from '../../models/ordinacija';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { OrdinacijaDialogComponent } from '../dialogs/ordinacija-dialog/ordinacija-dialog.component';

@Component({
  selector: 'app-ordinacija',
  templateUrl: './ordinacija.component.html',
  styleUrls: ['./ordinacija.component.css']
})
export class OrdinacijaComponent implements OnInit {
  displayedColumns = ['id', 'adresa', 'naziv', 'add', 'edit', 'delete'];
  dataSource: MatTableDataSource<Ordinacija>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _ordinacija: OrdinacijaService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }
  public loadData() {
    this._ordinacija.getAllOrdinacija().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Ordinacija>(data);
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
  public openDialog(flag: number, id: number, adresa: string, naziv: string) {


    const dialogRef = this.dialog.open(OrdinacijaDialogComponent, {
    data: { id: id, adresa: adresa, naziv: naziv}
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
