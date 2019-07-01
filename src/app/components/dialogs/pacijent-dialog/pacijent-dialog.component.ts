import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Pacijent } from '../../../models/pacijent';
import { PacijentService } from '../../../services/pacijent.service';
import { PacijentComponent } from '../../pacijent/pacijent.component';



@Component({
  selector: 'app-pacijent-dialog',
  templateUrl: './pacijent-dialog.component.html',
  styleUrls: ['./pacijent-dialog.component.css']
})
export class PacijentDialogComponent implements OnInit {
  flag: number;
  component: PacijentComponent;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PacijentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public pacijentService: PacijentService
  ) { }

  ngOnInit() {
    this.component = this.data.component;

    this.data = (({component, ...others}) => ({ ...others}))(this.data);
  }

  public add(): void {
    this.pacijentService.getNextID(this.data, this.component);
  }

  public update(): void {
    this.pacijentService.updatePacijent(this.data, this.component);
  }

  public delete(): void {
    this.pacijentService.deletePacijent(this.data.id, this.component);
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
