import { Pacijent } from './pacijent';
import { Status } from './status';

export class Zub {
  id: number;
  pacijent: Pacijent;
  status1: Status;
  status2: Status;
  statusPovDesnoAkt: number;
  statusPovDesnoIni: number;
  statusPovDoleAkt: number;
  statusPovDoleIni: number;
  statusPovGoreAkt: number;
  statusPovGoreIni: number;
  statusPovLijevoAkt: number;
  statusPovLijevoIni: number;
  statusPovSredinaAkt: number;
  statusPovSredinaIni: number;
  zub: number;
}
