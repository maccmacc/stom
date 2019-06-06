import { OnInit, Component } from "@angular/core";
import { IzvrsenaIntervencijaService } from "../../services/izvrsena-intervencija.service";
import { IzvrsenaIntervencija } from '../../models/izvrsena-intervencija';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { IzvrsenaIntervencijaDialogComponent } from '../dialogs/izvrsena-intervencija-dialog/izvrsena-intervencija-dialog.component';
import { Zaposleni } from '../../models/zaposleni';
import { Pacijent } from '../../models/pacijent';
import { Materijal } from '../../models/materijal';
import { Racun } from '../../models/racun';
import { RadnoMesto } from '../../models/radno-mesto';
import { VrstaIntervencije } from '../../models/vrsta-intervencije';
import { Dijagnoza } from '../../models/dijagnoza';

@Component({
  selector: 'app-izvrsena-intervencija',
  templateUrl: './izvrsena-intervencija.component.html',
  styleUrls: ['./izvrsena-intervencija.component.css']
})
export class IzvrsenaIntervencijaComponent implements OnInit {
  displayedColumns = ['id', 'datum', 'dijagnoza', 'iznos', 'materijal', 'napomena', 'pacijent'
  , 'placeno', 'popust', 'povrsine', 'racun', 'radnoMesto', 'vrstaIntervencije', 'zaposleni', 'zub', 'add', 'edit', 'delete'];
  dataSource: MatTableDataSource<IzvrsenaIntervencija>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _izvrsenaIntervencija: IzvrsenaIntervencijaService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }
  public loadData() {
    this._izvrsenaIntervencija.getAllIzvrsenaIntervencija().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<IzvrsenaIntervencija>(data);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('finish');
      }
    );
  }
  public openDialog(flag: number, id: number, datum: Date, dijagnoza: Dijagnoza, iznos: number, materijal: Materijal,
                    napomena: string, pacijent: Pacijent, placeno: number, popust: number, povrsine: string, racun: Racun,
                    radnoMesto: RadnoMesto, vrstaIntervencije: VrstaIntervencije, zaposleni: Zaposleni, zub: number) {


const dialogRef = this.dialog.open(IzvrsenaIntervencijaDialogComponent, {
data: { id: id, datum: datum, dijagnoza: dijagnoza, iznos: iznos, materijal: materijal, napomena: napomena, pacijent: pacijent, placeno: placeno,
        popust: popust, povrsine: povrsine, racun: racun, radnoMesto: radnoMesto, vrstaIntervencije: vrstaIntervencije,
        zaposleni: zaposleni, zub: zub}
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
