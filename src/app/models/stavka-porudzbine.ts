import { Artikl } from './artikl';
import { Porudzbina } from './porudzbina';

export class StavkaPorudzbine {
  artikl: Artikl;
  cena: number;
  id: number;
  jedinicaMere: string;
  kolicina: number;
  porudzbina: Porudzbina;
  redniBroj: number;
  ukupno: number;
}
