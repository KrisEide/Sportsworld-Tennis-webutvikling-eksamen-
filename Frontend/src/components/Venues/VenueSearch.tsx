import { useContext } from "react";
import type { IVenueContext } from "../../interfaces/IVenueContext"; 
import { VenueContext } from "../../contexts/VenueContext";

 const VenueSearch = () => {
	const vContext = useContext(VenueContext) as IVenueContext;

	return (
    <input
      type="text"
      placeholder="Search venue by name..."
      onChange={(e) => vContext.setSearchByName(e.target.value)}
      className="block mx-4 my-8 w-[calc(100%-2rem)] sm:mx-8 sm:w-auto border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#BBFF00]"
    />
  );
 }

 export default VenueSearch;