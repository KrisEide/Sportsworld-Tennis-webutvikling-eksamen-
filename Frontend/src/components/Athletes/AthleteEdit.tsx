import { useRef, useContext, useState, type ChangeEvent } from "react";
import type { IAthlete } from "../../interfaces/IAthlete";
import { AthletesContext } from "../../contexts/AthleteContext";
import type { IAthletesContext } from "../../interfaces/IAthletesContext";
import AthleteService from "../../services/AthleteService";

interface AthleteEditInput {
  athlete: IAthlete;
  onClose: () => void; //for å kunne lukke redigeringsboksen.
}

const AthleteEdit = ({ athlete, onClose }: AthleteEditInput) => {
  const { updateAthlete } = useContext(AthletesContext) as IAthletesContext;

  //Inputfeltene i redigeringsvinduet
  const nameInput = useRef<HTMLInputElement | null>(null);
  const priceInput = useRef<HTMLInputElement | null>(null);
  const genderSelect = useRef<HTMLSelectElement | null>(null);
  const imageInput = useRef<HTMLInputElement | null>(null);

  //Statusmelding for redigeringsboksen
  const [editMessage, seteditMessage] = useState<string>("");

  //State som får tak i bilde når det velges av brukeren
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files != null && files.length > 0) {
      setImageFile(files[0]);
    }
  };

  const savingNewInfo = async () => {
    //Først tar vi en sjekk på at feltene har kommet frem ordentlig.
    // Hvis ikke avbryter vi istedenfor at det skjer noe rart.
    if (
      nameInput.current == null ||
      priceInput.current == null ||
      genderSelect.current == null
    ) {
      return;
    }

    const nameText = nameInput.current.value.trim();
    const priceText = priceInput.current.value.trim();
    const genderText = genderSelect.current.value.trim();

    if (nameText === "" || priceText === "" || genderText === "") {
      seteditMessage("You need to fill inn all boxes");
      return;
    }

    //Pristeksten til tall
    const priceToNumber = Number(priceText);

    if (isNaN(priceToNumber)) {
      seteditMessage("Price must be a number");
      return;
    }

    //Her blir det sjekket om brukeren har valgt et bilde
    let imageName = athlete.image;
    if (imageFile != null) {
      imageName = imageFile.name;
    }

    const editedAthlete: IAthlete = {
      id: athlete.id,
      name: nameText,
      gender: genderText,
      price: priceToNumber,
      purchaseStatus: athlete.purchaseStatus,
      image: imageName,
    };

    if (imageFile != null) {
      const imageResponse = await AthleteService.uploadImage(imageFile);
      if (!imageResponse.success) {
        seteditMessage("Error: uploading image");
        return;
      }
    }

    const response = await updateAthlete(editedAthlete);

    if (response.success) {
      //context gir tilbakemelding
      onClose();
    } else {
      seteditMessage("Statusmessage on the top of the page");
    }
  };

  let feedbackMessage = null;

  if (editMessage !== "") {
    feedbackMessage = (
      <p className="text-red-500 mb-4">Status: {editMessage}</p>
    );
  }
  return (
    <section className="mt-3 p-3 border rounded bg-gradient-to-r from-[#063A7F] to-[#11B7FF]  text-white">
      <h3>Edit Athlete</h3>
      <div className="mb-3 mt-3">
        {/* NAVN */}
        <label className="block mb-1 sm:inline sm:mb-0">Name</label>
        <input
          className="border bg-white text-black w-full min-w-0 py-2 sm:w-auto sm:py-0 sm:ml-3"
          ref={nameInput}
          type="text"
        />
      </div>

      {/* PRIS */}

      <div>
        <label className="block mb-1 sm:inline sm:mb-0">Price</label>
        <input
          className="border bg-white text-black w-full min-w-0 py-2 sm:w-auto sm:py-0 sm:ml-5"
          ref={priceInput}
          type="number"
        />
      </div>

      {/* Gender */}

      <div className="py-3 sm:p-3">
        <label className="block mb-1 sm:inline sm:mb-0">Gender:</label>
        <select className="border bg-white text-black w-full min-w-0 max-w-full py-2 sm:w-auto sm:py-0 sm:ml-4" ref={genderSelect}>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>
      </div>

      {/* Bilde */}

      <div className="mb-4">
        <label className="block mb-1 sm:inline sm:mb-0">Upload new image</label>
        <input
          className="border bg-white text-black w-full min-w-0 max-w-full py-2 sm:py-0"
          ref={imageInput}
          type="file"
          onChange={handleImageChange}
        />
      </div>

      {/* LAGRE OG AVBRYT KNAPP*/}
      <div className="mt-2 flex gap-2">
        <button onClick={savingNewInfo} className="border px-4 py-2 sm:px-2 sm:py-0">
          Save
        </button>
        <button onClick={onClose} className="border px-4 py-2 sm:px-2 sm:py-0">
          Cancel
        </button>
      </div>
      {feedbackMessage}
    </section>
  );
};

export default AthleteEdit;
