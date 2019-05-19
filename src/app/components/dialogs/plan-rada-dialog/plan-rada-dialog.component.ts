import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PlanRada } from '../../../models/plan-rada';
import { PlanRadaService } from '../../../services/plan-rada.service';
import { Zaposleni } from '../../../models/zaposleni';
import { ZaposleniService } from '../../../services/zaposleni.service';
import { PacijentService } from '../../../services/pacijent.service';
import { Pacijent } from '../../../models/pacijent';



@Component({
  selector: 'app-plan-rada-dialog',
  templateUrl: './plan-rada-dialog.component.html',
  styleUrls: ['./plan-rada-dialog.component.css']
})
export class PlanRadaDialogComponent implements OnInit {
  sviZaposleni: Zaposleni[];
  flag: number;
  sviPacijenti: Pacijent[];

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<PlanRadaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PlanRada,
              public planRadaService: PlanRadaService,
              public zaposleniService: ZaposleniService,
              public pacijentService: PacijentService
  ) { }

  ngOnInit() {
    this.zaposleniService.getAllZaposleni().subscribe(zaposleni =>
      this.sviZaposleni = zaposleni
    );
    this.pacijentService.getAllPacijent().subscribe(pacijent =>
      this.sviPacijenti = pacijent
    );
  }

  public add(): void {
    this.planRadaService.getNextID(this.planRadaService.addPlanRada, this.data);
    this.snackBar.open('Uspešno dodat plan rada', 'U redu',
      {
        duration: 2500
      });
  }

  public update(): void {
    this.planRadaService.updatePlanRada(this.data);
    this.snackBar.open('Uspešno modifikovan plan rada', 'U redu',
    {
      duration: 2500
    });
  }

  public delete(): void {
    this.planRadaService.deletePlanRada(this.data.id);
    this.snackBar.open('Uspešno obrisan plan rada', 'U redu',
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
