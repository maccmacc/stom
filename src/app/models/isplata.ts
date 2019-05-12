import { Zaposleni } from './zaposleni';

export class Isplata {
  id: number;
  datum: Date;
  iznos: number;
  napomena: string;
  zaposleni: Zaposleni;
}
