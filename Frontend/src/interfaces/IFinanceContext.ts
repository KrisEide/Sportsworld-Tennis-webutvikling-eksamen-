import { type IFinance } from "./IFinance";

export interface IFinanceContext {
  finance: IFinance | null; //holder økonomidata, eller holder 0 før det er lastet
  loadFinance: () => Promise<void>; //henter finans på nytt fra backend
  purchaseAthlete: (athleteId: number, athletePrice: number) => Promise<boolean>;//kjøpre atlet, returner om velykket
  statusMessage: string;// feilmelding til bruker
  takeLoan: (amount: number) => Promise<boolean>; //tar et lån, returner om lån er velykket
}

