import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Porudzbina } from '../../../models/porudzbina';
import { PorudzbinaService } from '../../../services/porudzbina.service';
import { Dobavljac } from '../../../models/dobavljac';
import { DobavljacService } from '../../../services/dobavljac.service';



@Component({
  selector: 'app-porudzbina-dialog',
  templateUrl: './porudzbina-dialog.component.html',
  styleUrls: ['./porudzbina-dialog.component.css']
})
export class PorudzbinaDialogComponent implements OnInit {
  sviDobavljaci: Dobavljac[];
  flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<PorudzbinaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Porudzbina,
              public porudzbinaService: PorudzbinaService,
              public dobavljacService: DobavljacService
  ) { }

  ngOnInit() {
    this.dobavljacService.getAllDobavljac().subscribe(dobavljac =>
      this.sviDobavljaci = dobavljac
    );
  }

  public add(): void {
    this.porudzbinaService.getNextID(this.porudzbinaService.addPorudzbina, this.data);
    /*this.snackBar.open('Uspešno dodat porudzbina: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {
        duration: 2500
      });*/
  }

  public update(): void {
    this.porudzbinaService.updatePorudzbina(this.data);
   /* this.snackBar.open('Uspešno modifikovan porudzbina: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {
        duration: 2500
      });*/
  }

  public delete(): void {
    this.porudzbinaService.deletePorudzbina(this.data.id);
   /* this.snackBar.open('Uspešno obrisan porudzbina: ' + this.data.id, 'U redu',
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
