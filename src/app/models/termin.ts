import { DecimalPipe, Time } from "@angular/common";
import { StringMap } from "@angular/core/src/render3/jit/compiler_facade_interface";

export class Termin {
  id: number;
  datum: string;
  napomena: string;
  pocetak: string;
  zavrsetak: string;

  pacijent: {
    id: number;
    adresa: string;
    datumUpisa: Date;
    email: string;
    ime: string;
    prezime: string;
    kontakt: string;
    lookup: string;
    napomena: string;
    ukupno: number;
    datumRodjenja: Date;
  };

  radnoMjesto: {
    id: number;
    naziv: string;

    ordinacija: {
      id: number;
      adresa: string;
      naziv: string;
    };
  };

  zaposleni: {
    id: number;
    adresa: string;
    ime: string;
    prezime: string;
    kontakt: string;
    lookup: string;
    password: string;
    username: string;

    struka: {
      id: number;
      naziv: string;
      stepen: string;
    };
  };
}
