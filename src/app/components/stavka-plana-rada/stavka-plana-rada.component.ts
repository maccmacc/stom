import { OnInit, Component } from "@angular/core";
import { StavkaPlanaRadaService } from "../../services/stavka-plana-rada.service";
import { StavkaPlanaRada } from '../../models/stavka-plana-rada';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { StavkaPlanaRadaDialogComponent } from '../dialogs/stavka-plana-rada-dialog/stavka-plana-rada-dialog.component';
import { Dijagnoza } from '../../models/dijagnoza';
import { PlanRada } from '../../models/plan-rada';
import { VrstaIntervencije } from '../../models/vrsta-intervencije';
import { Input } from '@angular/core';


@Component({
  selector: 'app-stavka-plana-rada',
  templateUrl: './stavka-plana-rada.component.html',
  styleUrls: ['./stavka-plana-rada.component.css']
})
export class StavkaPlanaRadaComponent implements OnInit {
  displayedColumns = ['id', 'cena', 'dijagnoza', 'iznos', 'planRada', 'popust', 'redniBroj',
  'vrstaIntervencije', 'zub', 'add', 'edit', 'delete'];
  dataSource: MatTableDataSource<StavkaPlanaRada>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() selektovanPlan: PlanRada;


  constructor(private _stavkaPlanaRada: StavkaPlanaRadaService, public dialog: MatDialog) {}

  ngOnInit() {
    if (this.selektovanPlan.id) {
    this.loadData();
    }
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    if (this.selektovanPlan.id) {
      this.loadData();
    }
  }

  public loadData() {
    this._stavkaPlanaRada.getStavkaByPlanRada(this.selektovanPlan.id).subscribe(data => {
      this.dataSource = new MatTableDataSource<StavkaPlanaRada>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  public openDialog(flag: number, id: number, cena: number,
                    dijagnoza: Dijagnoza, iznos: number, planRada: PlanRada, popust: number, redniBroj: number,
                    vrstaIntervencije: VrstaIntervencije, zub: number) {


const dialogRef = this.dialog.open(StavkaPlanaRadaDialogComponent, {
data: { id: id, cena: cena, dijagnoza: dijagnoza, iznos: iznos, planRada: planRada, popust: popust,
      redniBroj: redniBroj, vrstaIntervencije: vrstaIntervencije, zub: zub}
});
dialogRef.componentInstance.flag = flag;
if (flag === 1) {
  dialogRef.componentInstance.data.planRada = this.selektovanPlan;
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
