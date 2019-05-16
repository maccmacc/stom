import { OnInit, Component } from "@angular/core";
import { VrstaIntervencijeService } from "../../services/vrsta-intervencije.service";
import { VrstaIntervencije } from '../../models/vrsta-intervencije';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { VrstaIntervencijeDialogComponent } from '../dialogs/vrsta-intervencije-dialog/vrsta-intervencije-dialog.component';
import { Status } from '../../models/status';

@Component({
  selector: 'app-vrsta-intervencije',
  templateUrl: './vrsta-intervencije.component.html',
  styleUrls: ['./vrsta-intervencije.component.css']
})
export class VrstaIntervencijeComponent implements OnInit {
  displayedColumns = ['id', 'iznos', 'opis', 'status', 'add', 'edit', 'delete'];
  dataSource: MatTableDataSource<VrstaIntervencije>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _vrstaIntervencije: VrstaIntervencijeService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }
  public loadData() {
    this._vrstaIntervencije.getAllVrstaIntervencije().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<VrstaIntervencije>(data);
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
  public openDialog(flag: number, id: number, iznos: number, opis: string,
                    status: Status) {


const dialogRef = this.dialog.open(VrstaIntervencijeDialogComponent, {
data: { id: id,  iznos: iznos, opis: opis, status: status }
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
