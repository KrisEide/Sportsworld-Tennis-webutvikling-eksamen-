import { useContext, useEffect, useState, } from "react";
import { type IVenue } from "../../interfaces/IVenue";
import VenueItem from "./VenueItem";
import type { IVenueContext } from "../../interfaces/IVenueContext";
import { VenueContext } from "../../contexts/VenueContext";

const VenueList = () => {

  // Context kobling 
  const { venues, getVenueQuantity } = 
  useContext(VenueContext) as IVenueContext;

  // Lokal state for sorteringsfunskjonen
  const [sortedVenues, setSortedVenues] = useState<IVenue[]>([]);

  // staten til sorteringsfunskjonen
  // https://www.w3schools.com/typescript/typescript_union_types.php
  const [sortCapacity, setSortCapacity] = useState<"default" | "asc" | "desc">("default");

  // reseter sorteringslisten når en venue endres
  useEffect(() => {
    setSortedVenues(venues);
  }, [venues]);

  // sorteringsfusnkjon ut ifra hvor mange plasser det er på en stadion
  const sortByCapacity = (order: "default" | "asc" | "desc") => {
    setSortCapacity(order);

    setSortedVenues((prev) => {
      // kopi av arayet før sortering, så original arrayet ikke blir endret på noen måte
      const copySortedVenue = [...prev];
      if (order === "asc") copySortedVenue.sort((a, b) => a.capacity - b.capacity);
      if(order === "desc") copySortedVenue.sort((a, b) => b.capacity - a.capacity);
      return copySortedVenue;
    });
  };

  return (
    <>
      <section className="mb-4 grid grid-flow-col gap-4 items-center">
        <select
          value={sortCapacity}
          onChange={(e) =>
            sortByCapacity(e.target.value as "default" | "asc" | "desc")
          }
          className="ml-8 border border-gray-300 rounded px-2 py-1 w-60 focus:outline-none focus:ring-2 focus:ring-[#BBFF00]"
        >
          <option value="default">Default</option>
          <option value="asc">Ascending 🔼</option>
          <option value="desc">Descending 🔽</option>
        </select>
      </section>

      <section>
        <p className="ml-8">Total venues: {getVenueQuantity()}</p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-8">
        {sortedVenues.map((venue, index) => (
          <VenueItem key={"venue" + index} venue={venue} />
        ))}
      </section>
    </>
  );
};

export default VenueList;