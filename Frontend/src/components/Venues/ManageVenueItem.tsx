import { useRef, useState } from "react";
import VenuesService from "../../services/VenuesService";
import type { IVenue } from "../../interfaces/IVenue";

const ManageVenueItem = () => {
  const idInput = useRef<HTMLInputElement | null>(null);
  const nameInput = useRef<HTMLInputElement | null>(null);
  const capacityInput = useRef<HTMLInputElement | null>(null);

  const [statusMessage, setStatusMessage] = useState<string>("");
  const [statusMessageType, setStatusMessageType] = useState<"success" | "error" | "">("");
  const [currentVenue, setCurrentVenue] = useState<IVenue | null>(null);

  // Søk etter venue id 
  const getVenueById = async () => {
    if (
      idInput.current /*samme som != null*/ &&
      idInput.current.value.trim() != ""
    ) {
      //.trim fjerner space før og etter innhold
      //sjekk om det er et tall, prøver å endre fra tekst til tall.
      const idParsed = Number(idInput.current.value);

      if (!isNaN(idParsed)) {
        // idparsed er et tall
        //er det et tall kan vi be venue sercive å få tak i
        const response = await VenuesService.getVenueById(idParsed);

       if (response.success && response.data) {
        setCurrentVenue(response.data);


        if (nameInput.current) {
          nameInput.current.value = response.data.name ?? "Ikke satt";
        }
        if (capacityInput.current) {
          capacityInput.current.value = response.data.capacity.toString();
        }
       
        setStatusMessage(`Venue with ID ${idParsed} was found!`);
        setStatusMessageType("success");
      } else {
        setStatusMessage(`Venue with ID ${idParsed} was not found!`);
        setStatusMessageType("error");
      }
    }
    }
  };

  // endre venue
  const editVenue = async () => {
    if (
      idInput.current &&
      nameInput.current &&
      capacityInput.current &&
      idInput.current.value != "" &&
      nameInput.current.value != "" &&
      capacityInput.current.value != ""
    ) {
      const id = Number(idInput.current.value);
      const name = nameInput.current.value;
      const capacity = Number(capacityInput.current.value);

      if (!isNaN(id)) {
        const editedVenue: IVenue = {
          id: id,
          name: name,
          capacity: capacity,
          image: currentVenue?.image,
        };
        VenuesService.putVenue(editedVenue);

        // Fiks statusmelding her !
      }
    }
  };

  return (
    <section className="max-w-md bg-[#474747] border border-[#11B7FF] rounded-xl shadow-md p-6">
      <h3 className="text-2xl font-bold text-center m-4">Edit venue</h3>

      <div className="m-4">
        <div className="flex gap-2">
          <input
            ref={idInput}
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#BBFF00]"
            type="number"
            placeholder=" ID..."
          />
          <button
            onClick={getVenueById}
            className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 hover:text-[#BBFF00] transition-colors cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>

      <div className="m-4">
        <div className="flex gap-2">
          <input
            ref={nameInput}
            placeholder=" Name..."
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#BBFF00]"
            type="text"
          />
        </div>
      </div>

      <div className="m-4">
        <div className="flex gap-2">
          <input
            ref={capacityInput}
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#BBFF00]"
            type="number"
            placeholder=" Capacity..."
          />
        </div>
      </div>

      <button
        onClick={editVenue}
        className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 hover:text-[#BBFF00] transition-colors cursor-pointer"
      >
        Save changes
      </button>

      <p
        // styling skjer dynamisk ved hjelp av ternary operator basert på statusmessagetype sin state
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
        className={`mt-4 text-sm font-bold 
          ${
            statusMessageType === "success"
              ? "text-green-400"
              : statusMessageType === "error"
              ? "text-red-400"
              : "text-white"
          }`}
      >
        Status: {statusMessage}
      </p>
    </section>
  );
};

export default ManageVenueItem;
