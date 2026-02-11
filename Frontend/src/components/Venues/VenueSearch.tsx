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
      className="m-8 flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#BBFF00]"
    />
  );
 }

 export default VenueSearch;