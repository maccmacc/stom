import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StavkaPlanaRada } from '../../../models/stavka-plana-rada';
import { StavkaPlanaRadaService } from '../../../services/stavka-plana-rada.service';
import { Dijagnoza } from '../../../models/dijagnoza';
import { DijagnozaService } from '../../../services/dijagnoza.service';
import { PlanRadaService } from '../../../services/plan-rada.service';
import { VrstaIntervencijeService } from '../../../services/vrsta-intervencije.service';
import { VrstaIntervencije } from '../../../models/vrsta-intervencije';
import { PlanRada } from '../../../models/plan-rada';



@Component({
  selector: 'app-stavka-plana-rada-dialog',
  templateUrl: './stavka-plana-rada-dialog.component.html',
  styleUrls: ['./stavka-plana-rada-dialog.component.css']
})
export class StavkaPlanaRadaDialogComponent implements OnInit {
  sveDijagnoze: Dijagnoza[];
  flag: number;
  sviPlanoviRada: PlanRada[];
  sveVrsteIntervencije: VrstaIntervencije[];

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<StavkaPlanaRadaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: StavkaPlanaRada,
              public stavkaPlanaRadaService: StavkaPlanaRadaService,
              public dijagnozaService: DijagnozaService,
              public planRadaService: PlanRadaService,
              public vrstaIntervencijeService: VrstaIntervencijeService
  ) { }

  ngOnInit() {
    this.dijagnozaService.getAllDijagnoza().subscribe(dijagnoza =>
      this.sveDijagnoze = dijagnoza
    );
    this.planRadaService.getAllPlanRada().subscribe(planRada =>
      this.sviPlanoviRada = planRada
    );
    this.vrstaIntervencijeService.getAllVrstaIntervencije().subscribe(VrstaIntervencije =>
      this.sveVrsteIntervencije = VrstaIntervencije
    );
  }

  public add(): void {
    this.stavkaPlanaRadaService.getNextID(this.stavkaPlanaRadaService.addStavkaPlanaRada, this.data);
    this.snackBar.open('Uspešno dodata stavka plana rada', 'U redu',
      {
        duration: 2500
      });
  }

  public update(): void {
    this.stavkaPlanaRadaService.updateStavkaPlanaRada(this.data);
    this.snackBar.open('Uspešno modifikovana stavka plana rada', 'U redu',
    {
      duration: 2500
    });
  }

  public delete(): void {
    this.stavkaPlanaRadaService.deleteStavkaPlanaRada(this.data.id);
    this.snackBar.open('Uspešno obrisana stavka plana rada', 'U redu',
    {
      duration: 2500
    });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu',
      {
        duration: 1000
      });
  }

  public compareTo(a, b) {
    return a.id === b.id;
  }

}
