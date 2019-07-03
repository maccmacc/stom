import { OnInit, Component } from "@angular/core";
import { DijagnozaService } from "../../services/dijagnoza.service";
import { Dijagnoza } from '../../models/dijagnoza';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { DijagnozaDialogComponent } from '../dialogs/dijagnoza-dialog/dijagnoza-dialog.component';

@Component({
  selector: 'app-dijagnoza',
  templateUrl: './dijagnoza.component.html',
  styleUrls: ['./dijagnoza.component.css']
})
export class DijagnozaComponent implements OnInit {
  displayedColumns = ['id', 'opis', 'add', 'edit', 'delete'];
  dataSource: MatTableDataSource<Dijagnoza>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _dijagnoza: DijagnozaService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this._dijagnoza.getAllDijagnoza().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Dijagnoza>(data);
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
  
  public openDialog(flag: number, id: number, opis: string) {
    const dialogRef = this.dialog.open(DijagnozaDialogComponent, {
    data: { id: id, opis: opis}
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

