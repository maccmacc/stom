import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Ordinacija } from '../../../models/ordinacija';
import { OrdinacijaService } from '../../../services/ordinacija.service';

@Component({
  selector: 'app-ordinacija-dialog',
  templateUrl: './ordinacija-dialog.component.html',
  styleUrls: ['./ordinacija-dialog.component.css']
})
export class OrdinacijaDialogComponent implements OnInit {
  flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<OrdinacijaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Ordinacija,
              public ordinacijaService: OrdinacijaService
  ) { }

  ngOnInit() {
  }

  public add(): void {
    this.ordinacijaService.getNextID(this.ordinacijaService.addOrdinacija, this.data);
    /*this.snackBar.open('Uspešno dodat ordinacija: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {
        duration: 2500
      });*/
  }

  public update(): void {
    this.ordinacijaService.updateOrdinacija(this.data);
   /* this.snackBar.open('Uspešno modifikovan ordinacija: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {
        duration: 2500
      });*/
  }

  public delete(): void {
    this.ordinacijaService.deleteOrdinacija(this.data.id);
   /* this.snackBar.open('Uspešno obrisan ordinacija: ' + this.data.id, 'U redu',
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

}
