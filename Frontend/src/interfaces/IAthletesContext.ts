import type { IAthlete } from "./IAthlete";
import type {
  IAthleteSingleResponse,
  IDefaultResponse,
} from "./ResponseInterfaces";

export interface IAthletesContext {
  athletes: IAthlete[]; //listen over alle atleter
  getAthleteQuantity: () => number; //Hvor mange utøvere det er
  saveAthlete: (newAthlete: IAthlete) => Promise<IAthleteSingleResponse>; //for å lage ny atleter
  statusMessage: string; //melding om feil
  loadAthletes: () => Promise<void>; //Hente alle utøvere på nytt
  registerAthlete: (id: number) => Promise<void>; //oppdater registret eller ikke
  updateAthlete: (editedAthlete: IAthlete) => Promise<IDefaultResponse>; //Redigere Athletes
  deleteAthlete: (id: number) => Promise<IDefaultResponse>; //delete
}
