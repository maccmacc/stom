import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Snimak } from '../../../models/snimak';
import { SnimakService } from '../../../services/snimak.service';
import { PacijentService } from '../../../services/pacijent.service';
import { Pacijent } from '../../../models/pacijent';



@Component({
  selector: 'app-snimak-dialog',
  templateUrl: './snimak-dialog.component.html',
  styleUrls: ['./snimak-dialog.component.css']
})
export class SnimakDialogComponent implements OnInit {
  sviPacijenti: Pacijent[];
  flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<SnimakDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Snimak,
              public snimakService: SnimakService,
              public pacijentService: PacijentService
  ) { }

  ngOnInit() {
    this.pacijentService.getAllPacijent().subscribe(pacijent =>
      this.sviPacijenti = pacijent
    );
  }

  public add(): void {
    this.snimakService.getNextID(this.snimakService.addSnimak, this.data);
    /*this.snackBar.open('Uspešno dodat snimak: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {
        duration: 2500
      });*/
  }

  public update(): void {
    this.snimakService.updateSnimak(this.data);
   /* this.snackBar.open('Uspešno modifikovan snimak: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {
        duration: 2500
      });*/
  }

  public delete(): void {
    this.snimakService.deleteSnimak(this.data.id);
   /* this.snackBar.open('Uspešno obrisan snimak: ' + this.data.id, 'U redu',
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
