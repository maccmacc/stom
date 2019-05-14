import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RadnoMesto } from '../../../models/radno-mesto';
import { RadnoMestoService } from '../../../services/radno-mesto.service';
import { Ordinacija } from '../../../models/ordinacija';
import { OrdinacijaService } from '../../../services/ordinacija.service';



@Component({
  selector: 'app-radno-mesto-dialog',
  templateUrl: './radno-mesto-dialog.component.html',
  styleUrls: ['./radno-mesto-dialog.component.css']
})
export class RadnoMestoDialogComponent implements OnInit {
  sveOrdinacije: Ordinacija[];
  flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<RadnoMestoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: RadnoMesto,
              public radnoMestoService: RadnoMestoService,
              public ordinacijaService: OrdinacijaService
  ) { }

  ngOnInit() {
    this.ordinacijaService.getAllOrdinacija().subscribe(ordinacija =>
      this.sveOrdinacije = ordinacija
    );
  }

  public add(): void {
    this.radnoMestoService.getNextID(this.radnoMestoService.addRadnoMesto, this.data);
    this.snackBar.open('Uspešno dodano radno mesto: ' + this.data.naziv, 'U redu',
      {
        duration: 2500
      });
  }

  public update(): void {
    this.radnoMestoService.updateRadnoMesto(this.data);
    this.snackBar.open('Uspešno modifikovano radno mesto: ' + this.data.naziv, 'U redu',
      {
        duration: 2500
      });
  }

  public delete(): void {
    this.radnoMestoService.deleteRadnoMesto(this.data.id);
    this.snackBar.open('Uspešno obrisano radno mesto: ' + this.data.id, 'U redu',
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
