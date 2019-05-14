import { OnInit, Component } from "@angular/core";
import { RadnoMestoService } from "../../services/radno-mesto.service";
import { RadnoMesto } from '../../models/radno-mesto';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { RadnoMestoDialogComponent } from '../dialogs/radno-mesto-dialog/radno-mesto-dialog.component';
import { Ordinacija } from '../../models/ordinacija';

@Component({
  selector: 'app-radno-mesto',
  templateUrl: './radno-mesto.component.html',
  styleUrls: ['./radno-mesto.component.css']
})
export class RadnoMestoComponent implements OnInit {
  displayedColumns = ['id', 'naziv', 'ordinacija', 'add', 'edit', 'delete'];
  dataSource: MatTableDataSource<RadnoMesto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _radnoMesto: RadnoMestoService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }
  public loadData() {
    this._radnoMesto.getAllRadnoMesto().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<RadnoMesto>(data);
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
  public openDialog(flag: number, id: number, naziv: string, ordinacija: Ordinacija) {


const dialogRef = this.dialog.open(RadnoMestoDialogComponent, {
data: { id: id, naziv: naziv, ordinacija: ordinacija }
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
