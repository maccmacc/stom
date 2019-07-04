import { OnInit, Component } from "@angular/core";
import { IzvrsenaIntervencijaService } from "../../services/izvrsena-intervencija.service";
import { IzvrsenaIntervencija } from '../../models/izvrsena-intervencija';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, PageEvent } from '@angular/material';
import { ViewChild } from '@angular/core';
import { IzvrsenaIntervencijaDialogComponent } from '../dialogs/izvrsena-intervencija-dialog/izvrsena-intervencija-dialog.component';
import { Zaposleni } from '../../models/zaposleni';
import { Pacijent } from '../../models/pacijent';
import { Materijal } from '../../models/materijal';
import { Racun } from '../../models/racun';
import { RadnoMesto } from '../../models/radno-mesto';
import { VrstaIntervencije } from '../../models/vrsta-intervencije';
import { Dijagnoza } from '../../models/dijagnoza';
import { PageSortModel } from 'src/app/models/PageSortModel';

@Component({
  selector: 'app-izvrsena-intervencija',
  templateUrl: './izvrsena-intervencija.component.html',
  styleUrls: ['./izvrsena-intervencija.component.css']
})
export class IzvrsenaIntervencijaComponent implements OnInit {
  displayedColumns = ['id', 'datum', 'dijagnoza', 'iznos', 'materijal', 'napomena', 'pacijent'
    , 'placeno', 'popust', 'povrsine', 'racun', 'radnoMjesto', 'vrstaIntervencije', 'zaposleni', 'zub', 'add', 'edit', 'delete'];

  dataSource: MatTableDataSource<IzvrsenaIntervencija>;

  // MatPaginator Output
  pageEvent: PageEvent;

  pageSortModel: PageSortModel;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private izvrsenaIntervencijaService: IzvrsenaIntervencijaService, public dialog: MatDialog) { }

  ngOnInit() {
    this.pageSortModel = PageSortModel.defaultInterventions();
    this.izvrsenaIntervencijaService.getAllIzvrsenaIntervencija(this, true);
  }

  ngAfterViewInit(): void {

    //Sort
    this.sort.sortChange.subscribe(
      data => {
        this.sortChanged(data);
      });
  }

  sortChanged(data) {

    if (this.pageSortModel.sort.property == data.active) {
      if (data.direction != "") {
        this.pageSortModel.sort.direction = data.direction;
      }
      else {
        this.pageSortModel.sort.property = "";
      }
    }
    else {
      this.pageSortModel = PageSortModel.setParams(0, this.paginator.pageSize, data.active, data.direction);
    }

    this.loadData(true);
  }

  public pageChange(event) {
    this.loadData(false);
  }

  public loadData(isSort: boolean) {
    if(!isSort){
      this.pageSortModel.number = this.paginator.pageIndex;
      this.pageSortModel.size = this.paginator.pageSize;
      this.izvrsenaIntervencijaService.getAllIzvrsenaIntervencija(this, false);
    }
    else{
      this.izvrsenaIntervencijaService.getAllIzvrsenaIntervencija(this, false);
    }
  }

  public openDialog(flag: number, id: number, datum: Date, dijagnoza: Dijagnoza, iznos: number, materijal: Materijal,
    napomena: string, pacijent: Pacijent, placeno: number, popust: number, povrsine: string, racun: Racun,
    radnoMjesto: RadnoMesto, vrstaIntervencije: VrstaIntervencije, zaposleni: Zaposleni, zub: number) {


    const dialogRef = this.dialog.open(IzvrsenaIntervencijaDialogComponent, {
      data: {
        id: id, datum: datum, dijagnoza: dijagnoza, iznos: iznos, materijal: materijal, napomena: napomena, pacijent: pacijent, placeno: placeno,
        popust: popust, povrsine: povrsine, racun: racun, radnoMjesto: radnoMjesto, vrstaIntervencije: vrstaIntervencije,
        zaposleni: zaposleni, zub: zub, component: this
      }
    });
    dialogRef.componentInstance.flag = flag;
  }
}
