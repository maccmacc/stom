import { OnInit, Component } from "@angular/core";
import { StavkaPorudzbineService } from "../../services/stavka-porudzbine.service";
import { StavkaPorudzbine } from '../../models/stavka-porudzbine';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { StavkaPorudzbineDialogComponent } from '../dialogs/stavka-porudzbine-dialog/stavka-porudzbine-dialog.component';
import { Artikl } from '../../models/artikl';
import { Porudzbina } from '../../models/porudzbina';

@Component({
  selector: 'app-stavkaPorudzbine',
  templateUrl: './stavkaPorudzbine.component.html',
  styleUrls: ['./stavkaPorudzbine.component.css']
})
export class StavkaPorudzbineComponent implements OnInit {
  displayedColumns = ['artikl', 'cena' , 'id' , 'jedinicaMere' , 'kolicina', 'porudzbina', 'redni broj', 'ukupno', 'add', 'edit', 'delete'];
  dataSource: MatTableDataSource<StavkaPorudzbine>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _stavkaPorudzbine: StavkaPorudzbineService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }
  public loadData() {
    this._stavkaPorudzbine.getAllStavkaPorudzbine().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<StavkaPorudzbine>(data);
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
  public openDialog(artikl: Artikl, cena: number, id: number, jedinicaMere: string,
                    kolicina: number, porudzbina: Porudzbina, redniBroj: number, ukupno: number) {


const dialogRef = this.dialog.open(StavkaPorudzbineDialogComponent, {
data: { artikl: artikl, cena: cena, id: id, jedinicaMere: jedinicaMere,
        kolicina: kolicina, porudzbina: porudzbina, redniBroj: redniBroj, ukupno: ukupno }
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
