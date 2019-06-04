import { Dijagnoza } from './dijagnoza';
import { Materijal } from './materijal';
import { Pacijent } from './pacijent';
import { RadnoMesto } from './radno-mesto';
import { VrstaIntervencije } from './vrsta-intervencije';
import { Racun } from './racun';
import { Zaposleni } from './zaposleni';

export class IzvrsenaIntervencija {
  datum: Date;
  dijagnoza: Dijagnoza;
  id: number;
  iznos: number;
  materijal: Materijal;
  napomena: string;
  pacijent: Pacijent;
  placeno: number;
  popust: number;
  povrsine: string;
  racun: Racun;
  radnoMesto: RadnoMesto;
  vrstaIntervencije: VrstaIntervencije;
  zaposleni: Zaposleni;
  zub: number;
}
