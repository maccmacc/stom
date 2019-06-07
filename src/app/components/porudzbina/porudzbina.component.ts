import { OnInit, Component } from "@angular/core";
import { PorudzbinaService } from "../../services/porudzbina.service";
import { Porudzbina } from '../../models/porudzbina';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { PorudzbinaDialogComponent } from '../dialogs/porudzbina-dialog/porudzbina-dialog.component';
import { Dobavljac } from '../../models/dobavljac';

@Component({
  selector: 'app-porudzbina',
  templateUrl: './porudzbina.component.html',
  styleUrls: ['./porudzbina.component.css']
})
export class PorudzbinaComponent implements OnInit {


  constructor(private _porudzbina: PorudzbinaService, public dialog: MatDialog) {}
  displayedColumns = ['id', 'datum' , 'dobavljac' , 'isporuceno' , 'iznos', 'placeno', 'ukupno', 'add', 'edit', 'delete'];
  dataSource: MatTableDataSource<Porudzbina>;
  selektovanaPorudzbina: Porudzbina;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

selectedRowIndex: number;

  ngOnInit() {
    this.loadData();
  }
  public loadData() {
    this._porudzbina.getAllPorudzbina().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Porudzbina>(data);
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
  public openDialog(flag: number, id: number, datum: Date, dobavljac: Dobavljac,
                    isporuceno: Date, iznos: number, lookup: string, placeno: boolean, ukupno: number) {


const dialogRef = this.dialog.open(PorudzbinaDialogComponent, {
data: { id: id, datum: datum, dobavljac: dobavljac, isporuceno: isporuceno,
        iznos: iznos, lookup: lookup, placeno: placeno, ukupno: ukupno }
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
public selectRow(row) {
  this.selektovanaPorudzbina = row;
}
highlight(row) {
    this.selectedRowIndex = row.id;
}
}
