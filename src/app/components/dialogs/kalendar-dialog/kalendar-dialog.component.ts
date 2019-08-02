import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Pacijent } from '../../../models/pacijent';
import { Termin } from '../../../models/termin';
import { RadnoMesto } from '../../../models/radno-mesto';
import { PacijentService } from '../../../services/pacijent.service';
import { RadnoMestoService } from '../../../services/radno-mesto.service';
import { TerminService } from '../../../services/termin.service';
import { FormValidatorModel, FormValidator } from '@syncfusion/ej2-inputs';

@Component({
  selector: 'app-kalendar-dialog',
  templateUrl: './kalendar-dialog.component.html',
  styleUrls: [
    './mat/material-dark.css',
    './mat/material-dark1.scss',
    './kalendar-dialog.component.css'
  ]
})
export class KalendarDialogComponent implements OnInit {
  myControlPacijent = new FormControl();
  myControlRadnoMesto = new FormControl();
  pacijenti: Pacijent[]; // za dropdownlist
  radnaMesta: RadnoMesto[]; // za dropdownlist
  termin = new Termin();
  filteredPacijenti: Observable<Pacijent[]>;
  filteredRadnaMesta: Observable<RadnoMesto[]>;
  inputPacijent: string;
  inputRadnoMesto: string;
  minValue: Date = new Date();
  maxValue: Date = new Date();

  constructor(
    private pacijentService: PacijentService,
    private radnoMestoService: RadnoMestoService,
    private terminService: TerminService,
    public dialogRef: MatDialogRef<KalendarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const s = new Date();
    this.minValue = new Date(
      s.getFullYear(),
      s.getMonth(),
      s.getDate(),
      8,
      0,
      0
    );
    this.maxValue = new Date(
      s.getFullYear(),
      s.getMonth(),
      s.getDate(),
      20,
      0,
      0
    );
  }

  ngOnInit(): void {
    if (this.data.pacijent !== undefined && this.data.radnoMesto !== undefined) {
      this.inputPacijent = this.data.pacijent.prezime + ' ' + this.data.pacijent.ime + ' | ' + this.data.pacijent.kontakt;
      this.inputRadnoMesto = this.data.radnoMesto.naziv;
    }

    this.pacijentService.getAllPacijent().subscribe(pacijenti => {
      this.pacijenti = pacijenti;
      this.pacijenti.sort((a, b) =>
        a.prezime > b.prezime ? 1 : a.prezime === b.prezime ? a.ime > b.ime ? 1 : -1 : -1
      );

      this.filteredPacijenti = this.myControlPacijent.valueChanges.pipe(
        startWith(''),
        map(pacijent =>
          pacijent ? this._filterPacijenti(pacijent) : this.pacijenti.slice()
        )
      );
    });

    this.radnoMestoService.getAllRadnoMesto().subscribe(radnaMesta => {
      this.radnaMesta = radnaMesta;
      this.filteredRadnaMesta = this.myControlRadnoMesto.valueChanges.pipe(
        startWith(''),
        map(radnoMesto =>
          radnoMesto
            ? this._filteredRadnoMesto(radnoMesto)
            : this.radnaMesta.slice()
        )
      );
    });
  }

  private _filterPacijenti(value: string): Pacijent[] {
    const filterValue = value.toLowerCase();
    return this.pacijenti.filter(pacijent =>
      this.search(pacijent, filterValue)
    );
  }

  search(pacijent, filterValue) {
    const value = pacijent.prezime + ' ' + pacijent.ime + ' | ' + pacijent.kontakt;
    return value.toLowerCase().indexOf(filterValue) === 0;
  }

  private _filteredRadnoMesto(value: string): RadnoMesto[] {
    const filterValue = value.toLowerCase();
    return this.radnaMesta.filter(
      radnoMesto => radnoMesto.naziv.toLowerCase().indexOf(filterValue) === 0
    );
  }

  add() {
    this.terminService.addTermin(this.termin);
    this.dialogRef.close();
  }

  edit() {
    this.terminService.updateTermin(this.termin);
    this.dialogRef.close();
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  onEnterPacijent(pacijent: Pacijent) {
    this.data.pacijent = pacijent;
  }

  onEnterRadnoMesto(radnoMesto: RadnoMesto) {
    this.data.radnoMesto = radnoMesto;
  }

  validate() {
    const options: FormValidatorModel = {
      rules: {
        pocetak: { required: [true, '*'] },
        zavrsetak: { required: [true, '*'] }
      }
    };
    const formObject: FormValidator = new FormValidator('#form-element', options);

    if (!formObject.validate('pocetak')) {
      alert('Niste uneli vreme početka termina!');
      return;
    } else if (!formObject.validate('zavrsetak')) {
      alert('Niste uneli vreme zavrsetka termina!');
      return;
    } else if (this.data.pacijent === undefined) {
      alert('Niste uneli pacijenta!');
      return;
    } else if (this.data.radnoMesto === undefined) {
      alert('Niste uneli radno mesto!');
      return;
    } else if (this.inputPacijent !== this.data.pacijent.prezime + ' ' + this.data.pacijent.ime + ' | ' + this.data.pacijent.kontakt) {
      alert('Nepostojeći pacijent!');
      return;
    } else if (this.inputRadnoMesto !== this.data.radnoMesto.naziv) {
      alert('Nepostojeće radno mesto!');
      return;
    }

    const year = this.data.clickedDate.getFullYear();
    const month = this.data.clickedDate.getMonth() + 1;
    const day = this.data.clickedDate.getDate();

    var formatStartTime = this.data.startTime.getHours() + ':' + this.data.startTime.getMinutes() + ':00';
    var formatEndTime = this.data.endTime.getHours() + ':' + this.data.endTime.getMinutes() + ':00';
    var checkStartTime = formatStartTime.split(':');
    var checkEndTime = formatEndTime.split(':');
    var startTimeHours = checkStartTime[0];
    var startTimeMinutes = checkStartTime[1];
    var endTimeHours = checkEndTime[0];
    var endTimeMinutes = checkEndTime[1];

    try {
      if (
        Number.parseInt(startTimeHours) > 23 ||
        Number.parseInt(startTimeMinutes) > 60 ||
        Number.parseInt(endTimeHours) > 23 ||
        Number.parseInt(endTimeMinutes) > 60 ||
        Number.parseInt(startTimeHours) < 0 ||
        Number.parseInt(startTimeMinutes) < 0 ||
        Number.parseInt(endTimeHours) < 0 ||
        Number.parseInt(endTimeMinutes) < 0 ||
        isNaN(Number.parseInt(startTimeHours)) ||
        isNaN(Number.parseInt(endTimeHours)) ||
        isNaN(Number.parseInt(startTimeMinutes)) ||
        isNaN(Number.parseInt(endTimeMinutes)) ||
        (startTimeHours == '00' &&
          startTimeMinutes == '00' &&
          endTimeHours == '00' &&
          endTimeMinutes == '00')
      ) {
        alert('Pogrešno uneto vreme trajanja termina!');
        return;
      } else {
        var forStartTime = new Date(
          Number.parseInt(year),
          Number.parseInt(month),
          Number.parseInt(day),
          Number.parseInt(startTimeHours),
          Number.parseInt(startTimeMinutes)
        );

        var forEndTime = new Date(
          Number.parseInt(year),
          Number.parseInt(month),
          Number.parseInt(day),
          Number.parseInt(endTimeHours),
          Number.parseInt(endTimeMinutes)
        );

        if (forStartTime < forEndTime) {
          this.termin.pocetak = formatStartTime;
          this.termin.zavrsetak = formatEndTime;
          this.termin.napomena = this.data.napomena;
          let strMonth: string = month;
          if (month < 10) {
            strMonth = '0' + strMonth;
          }
          let strDay: string = day;
          if (day < 10) {
            strDay = '0' + strDay;
          }
          this.termin.datum = year + '-' + strMonth + '-' + strDay;
          this.termin.pacijent = this.data.pacijent;
          this.termin.radnoMjesto = this.data.radnoMesto;

          // Da li je to zaposleno lice ulogovano u app?
          var zaposleni = {
            // zakucano
            id: 1,
            adresa: 'dadada',
            ime: 'string',
            kontakt: 'string',
            prezime: 'string',
            username: 'string',
            password: 'string',
            struka: {
              id: 1,
              naziv: 'doktor stomatologije',
              stepen: 'VII'
            },
            lookup: 'string string, doktor stomatologije'
          };

          this.termin.zaposleni = zaposleni;

          if (this.data.flag === 1) {
            this.add();
          } else if (this.data.flag === 2) {
            this.termin.id = this.data.id;
            this.edit();
          }

          return;
        } else {
          alert('Vreme početka termina je veće od vremena završetka!');

          return;
        }
      }
    } catch (err) {
      alert('Pogrešno uneto vreme trajanja termina!');
      return;
    }
  }
  setPacijent(pacijent: Pacijent): string {
    return pacijent.prezime + ' ' + pacijent.ime + ' | ' + pacijent.kontakt;
  }
}
