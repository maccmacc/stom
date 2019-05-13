import { Dobavljac } from './dobavljac';

export class Porudzbina {
  id: number;
  datum: Date;
  dobavljac: Dobavljac;
  isporuceno: Date;
  iznos: number;
  lookup: string;
  placeno: boolean;
  ukupno: number;
}
