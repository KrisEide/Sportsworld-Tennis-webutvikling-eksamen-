import { type IFinance } from "./IFinance";
import { type IAthlete } from "./IAthlete";
import { type IVenue } from "./IVenue";

export interface IDefaultResponse {
  success: boolean;
}

// --- Finance
export interface IFinanceResponse {
  success: boolean;
  data: IFinance | null;
}

// --- Athlete
export interface IAthleteListResponse {
  success: boolean;
  data: IAthlete[] | null;
}

export interface IAthleteSingleResponse {
  success: boolean;
  data: IAthlete | null;
}

// Venue 
export interface IVenueResponse {
  success: boolean;
  data: IVenue | null;
}
