import type { IVenue } from "./IVenue";

export interface IVenueContext {
	venues: IVenue[];
	setSearchByName: (text: string) => void;
	getVenueQuantity: () => number;
}

// setSearchByName tar inn søketekst og getVenueQuantity returnerer anntall venues