import { createContext, useState, useEffect, type ReactNode } from "react";
import type { IVenue } from "../interfaces/IVenue";
import type { IVenueContext } from "../interfaces/IVenueContext";
import VenuesService from "../services/VenuesService";

export const VenueContext = createContext<IVenueContext | null>(null);

interface Props {
  children: ReactNode;
}

export const VenueProvider = ({children} : Props) => {

	// ALLE VENUES 
	const [venues, setVenues] = useState<IVenue[]>([]);

	// state for search
	const [searchByName, setSearchByName] = useState("");

	// henter venue en gang bare
	useEffect(() => {
		fetchVenues();
	}, []);

	const fetchVenues = async () => {
		const response = await VenuesService.getAllVenues();
		if (response.success && response.data) {
			setVenues(response.data);
		}
	};

	// Filter
	const filteredVenues = venues.filter(v => v.name?.toLocaleLowerCase().includes(searchByName.toLocaleLowerCase()));

	// counter
	const getVenueQuantity = (): number => {
    	return venues.length;
	};

    return (
      <VenueContext.Provider 
	  value={{ 
		venues: filteredVenues,
		setSearchByName,
		getVenueQuantity,
		 }}>
        {children}
      </VenueContext.Provider>
    )
};