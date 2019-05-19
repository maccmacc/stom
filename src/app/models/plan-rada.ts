import { Zaposleni } from './zaposleni';
import { Pacijent } from './pacijent';

export class PlanRada {
  id: number;
  datum: Date;
  lookup: string;
  pacijent: Pacijent;
  zaposleni: Zaposleni;
}
