import { useRef, useState, type ChangeEvent } from "react";
import { type IVenue } from "../../interfaces/IVenue";
import VenuesService from "../../services/VenuesService";

const VenueAdd = () => {
  const [image, setImage] = useState<File | null>(null);
  const nameInput = useRef<HTMLInputElement | null>(null);
  const capacityInput = useRef<HTMLInputElement | null>(null);

  const [statusMessage, setStatusMessage] = useState<string>("");
  const [statusMessageType, setStatusMessageType] = useState<
    "success" | "error" | ""
  >("");

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files != null) {
      setImage(files[0]);
      console.log(files[0]);
    }
  };

  const saveVenue = async () => {
    if (
      nameInput.current &&
      nameInput.current.value.trim() != "" &&
      capacityInput.current &&
      capacityInput.current.value.trim() != "" &&
      image != null
    ) {
      // Error
      const capacity = parseInt(capacityInput.current.value);
      if (isNaN(capacity)) {
        setStatusMessage("Capacity must be a number!");
        setStatusMessageType("error");
        return;
      }

      const newVenue: IVenue = {
        id: 0,
        name: nameInput.current.value,
        capacity: parseInt(capacityInput.current.value),
        image: image.name, // image objektet sitt filnavn
      };

      try {
        // venter på postvenue i venuesservice
        const response = await VenuesService.postVenue(newVenue, image);

        // sjekker response fins og er succes
        if (response && response.success) {
          setStatusMessage("A new venue was created!");
          setStatusMessageType("success");

          // tømmer felter
          nameInput.current.value = "";
          capacityInput.current.value = "";
          setImage(null);
        } else {
          // response er undefiner eller success=false
          setStatusMessage(response?.error || "Something went wrong!");
          setStatusMessageType("error");
        }
      } catch (error) {
        setStatusMessage("Error!!");
        setStatusMessage("error");
      }
    }
  };

  return (
    <section className="max-w-md bg-[#474747] border border-[#11B7FF] rounded-xl shadow-md p-6">
      <h3 className="text-2xl font-bold text-center m-4">Save new venue</h3>

      <div className="mb-4">
        <div className="flex gap-2">
          <input
            ref={nameInput}
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#BBFF00]"
            type="text"
            placeholder="Name of venue..."
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="flex gap-2">
          <input
            ref={capacityInput}
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#BBFF00]"
            type="number"
            placeholder="Number of people..."
          />
        </div>
      </div>

      <div className="mb-4">
        <label>Upload a picture</label>
        <input
          onChange={changeHandler}
          type="file"
          className="w-58 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 hover:text-[#BBFF00] transition-colors cursor-pointer"
        />
      </div>

      <button
        onClick={saveVenue}
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

export default VenueAdd;
