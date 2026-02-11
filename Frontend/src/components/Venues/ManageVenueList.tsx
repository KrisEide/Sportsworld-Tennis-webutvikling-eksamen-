import { useState, type ReactNode } from "react";
import { type IVenue } from "../../interfaces/IVenue";
import VenuesService from "../../services/VenuesService";
import VenueItem from "./VenueItem";

const ManageVenueList = () => {
  const [venues, setVenues] = useState<IVenue[]>([]);

  const getVenues = async () => {
    const response = await VenuesService.getAllVenues();

    if (response.success && response.data != null) {
      setVenues(response.data);
    }
  };

  const deleteVenueFunction = async (id: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this venue?"
    );
    if (!confirmDelete) return;

    const deleteResult = await VenuesService.deleteVenue(id);
    if (deleteResult.success) {
      // fjernes fra state slik at ui oppdateders
      setVenues((prev) => prev.filter((v) => v.id !== id));
    } else {
      //Putte inn html status istedenfor
      alert("Could not delete venue!" + deleteResult.error);
    }
  }; // send som prop til managevenueitem


  const getVenuesJSX = (): ReactNode => {
    const venuesJSX = venues.map((venue, index) => {
      return <VenueItem key={"venue" + index} venue={venue} onDelete={() => deleteVenueFunction(venue.id)} />;
    });
    return venuesJSX;
  };

  return (
    <>
      <section className="m-4 flex justify-center">
        <button
          onClick={getVenues}
          className="bg-gray-900 text-white px-4 py-2 rounded border border-[#11B7FF] hover:bg-gray-800 hover:text-[#11B7FF] transition-colors cursor-pointer"
        >
          Show venues
        </button>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-8">
        {getVenuesJSX()}
      </section>
    </>
  );
};

export default ManageVenueList;
