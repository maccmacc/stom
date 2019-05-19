import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Racun } from '../../../models/racun';
import { RacunService } from '../../../services/racun.service';
import { Pacijent } from '../../../models/pacijent';
import { PacijentService } from '../../../services/pacijent.service';



@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styleUrls: ['./racun-dialog.component.css']
})
export class RacunDialogComponent implements OnInit {
  sviPacijenti: Pacijent[];
  flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<RacunDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Racun,
              public racunService: RacunService,
              public pacijentService: PacijentService
  ) { }

  ngOnInit() {
    this.pacijentService.getAllPacijent().subscribe(pacijent =>
      this.sviPacijenti = pacijent
    );
  }

  public add(): void {
    this.racunService.getNextID(this.racunService.addRacun, this.data);
    this.snackBar.open('Uspešno dodat racun', 'U redu',
      {
        duration: 2500
      });
  }

  public update(): void {
    this.racunService.updateRacun(this.data);
    this.snackBar.open('Uspešno modifikovan račun ', 'U redu',
    {
      duration: 2500
    });
  }

  public delete(): void {
    this.racunService.deleteRacun(this.data.id);
    this.snackBar.open('Uspešno obrisan račun ', 'U redu',
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
