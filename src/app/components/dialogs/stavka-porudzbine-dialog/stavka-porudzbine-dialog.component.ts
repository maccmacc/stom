import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StavkaPorudzbine } from '../../../models/stavka-porudzbine';
import { StavkaPorudzbineService } from '../../../services/stavka-porudzbine.service';
import { Artikl } from '../../../models/artikl';
import { ArtiklService } from '../../../services/artikl.service';
import { Porudzbina } from '../../../models/porudzbina';
import { PorudzbinaService } from '../../../services/porudzbina.service';


@Component({
  selector: 'app-stavka-porudzbine-dialog',
  templateUrl: './stavka-porudzbine-dialog.component.html',
  styleUrls: ['./stavka-porudzbine-dialog.component.css']
})
export class StavkaPorudzbineDialogComponent implements OnInit {
  svePorudzbine: Porudzbina[];
  sviArtikli: Artikl[];
  flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<StavkaPorudzbineDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: StavkaPorudzbine,
              public stavkaPorudzbineService: StavkaPorudzbineService,
              public artiklService: ArtiklService,
              public porudzbinaService: PorudzbinaService,
  ) { }

  ngOnInit() {
    this.artiklService.getAllArtikl().subscribe(artikl =>
      this.sviArtikli = artikl
    );
    this.porudzbinaService.getAllPorudzbina().subscribe(porudzbina =>
      this.svePorudzbine = porudzbina
    );
  }


  public add(): void {
    this.stavkaPorudzbineService.getNextID(this.stavkaPorudzbineService.addStavkaPorudzbine, this.data);
    /*this.snackBar.open('Uspešno dodat stavkaPorudzbine: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {
        duration: 2500
      });*/
  }

  public update(): void {
    this.stavkaPorudzbineService.updateStavkaPorudzbine(this.data);
   /* this.snackBar.open('Uspešno modifikovan stavkaPorudzbine: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {
        duration: 2500
      });*/
  }

  public delete(): void {
    this.stavkaPorudzbineService.deleteStavkaPorudzbine(this.data.id);
   /* this.snackBar.open('Uspešno obrisan stavkaPorudzbine: ' + this.data.id, 'U redu',
      {
        duration: 2500
      });*/
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
