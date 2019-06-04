import { OnInit, Component } from "@angular/core";
import { StavkaPorudzbineService } from "../../services/stavka-porudzbine.service";
import { StavkaPorudzbine } from '../../models/stavka-porudzbine';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { StavkaPorudzbineDialogComponent } from '../dialogs/stavka-porudzbine-dialog/stavka-porudzbine-dialog.component';
import { Artikl } from '../../models/artikl';
import { Porudzbina } from '../../models/porudzbina';
import { Input } from '@angular/core';

@Component({
  selector: 'app-stavka-porudzbine',
  templateUrl: './stavka-porudzbine.component.html',
  styleUrls: ['./stavka-porudzbine.component.css']
})
export class StavkaPorudzbineComponent implements OnInit {
  displayedColumns = [ 'id' , 'artikl', 'cena' , 'jedinicaMere' , 'kolicina', 'porudzbina', 'redniBroj', 'ukupno', 'add', 'edit', 'delete'];
  dataSource: MatTableDataSource<StavkaPorudzbine>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() selektovanaPorudzbina: Porudzbina;


  constructor(private _stavkaPorudzbine: StavkaPorudzbineService, public dialog: MatDialog) {}

  ngOnInit() {
    if (this.selektovanaPorudzbina.id) {
    this.loadData();
    }
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    if (this.selektovanaPorudzbina.id) {
      this.loadData();
    }
  }

  public loadData() {
    this._stavkaPorudzbine.getStavkaByPorudzbina(this.selektovanaPorudzbina.id).subscribe(data => {
      this.dataSource = new MatTableDataSource<StavkaPorudzbine>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  public openDialog(flag: number, id: number, artikl: Artikl, cena: number, jedinicaMere: string,
                    kolicina: number, porudzbina: Porudzbina, redniBroj: number) {


const dialogRef = this.dialog.open(StavkaPorudzbineDialogComponent, {
data: { id: id, artikl: artikl, cena: cena, jedinicaMere: jedinicaMere,
        kolicina: kolicina, porudzbina: porudzbina, redniBroj: redniBroj }
});
dialogRef.componentInstance.flag = flag;
if (flag === 1) {
  dialogRef.componentInstance.data.porudzbina = this.selektovanaPorudzbina;
  }
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
