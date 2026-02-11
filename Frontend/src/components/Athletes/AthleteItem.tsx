import { useContext, useState } from "react";
import type { IAthlete } from "../../interfaces/IAthlete";
import { AthletesContext } from "../../contexts/AthleteContext";
import type { IAthletesContext } from "../../interfaces/IAthletesContext";
import AthleteEdit from "./AthleteEdit";

interface AthleteItemData {
  athlete: IAthlete;
  isLeftColumn: boolean; // Er athlete på venstre eller høyre side.
}

const AthleteItem = ({ athlete, isLeftColumn }: AthleteItemData) => {
  const imageUrl = "http://localhost:5285/images/" + athlete.image;

  //state for å vise redigeringsboksen eller ikke.
  const [showEditWindow, setshowEditWindow] = useState<boolean>(false);

  //state for å vise "delete warning" box.
  const [showDeleteWarning, setShowDeleteWarning] = useState<boolean>(false);

  //Hvor redigeringsviduet skal ligge.
  //Her har vi en utfordring: Hvordan skal dette håndteres på mobil skjer? Da er det ikke plass til redigeringsboks ut til venstre eller høyre.
  // Vi må indikere at dette bare skal skje på store skjermer(ikke mobil) med "md" som er medium.

  const editWindowposition = isLeftColumn
    ? "md:right-full md:mr-4"
    : "md:left-full md:ml-4";

  let editWindow = null;

  if (showEditWindow) {
    editWindow = (
      <div className={"md:absolute md:top-0 " + editWindowposition}>
        <AthleteEdit
          athlete={athlete}
          onClose={() => setshowEditWindow(false)} // lukker vinduet
        />
      </div>
    );
  }

  const { deleteAthlete } = useContext(AthletesContext) as IAthletesContext;

  // knappen blir tryppet på og vinduet vises.
  const deleteClick = async () => {
    setShowDeleteWarning(true);
  };

  //Her godtar du sletting.
  const confirmDelete = async () => {
    // athlete blir slettet.
    await deleteAthlete(athlete.id);
    // vinduet lukkes
    setShowDeleteWarning(false);
  };

  const cancleDelete = () => {
    //vinduet lukkes uten at brukeren sletter athlete.
    setShowDeleteWarning(false);
  };

  let deleteWarning = null;

  if (showDeleteWarning) {
    deleteWarning = (
      //Her legger boksen seg oppå atleten og dekker hele boksen.
      <section className="absolute inset-0 border pt-10 font-bold bg-gradient-to-r from-[#063A7F] to-[#11B7FF]">
        <div>
          <p>Are you sure you want to delete {athlete.name}?</p>
        </div>
        <div className="pt-8">
          <button
            onClick={cancleDelete}
            className="border p-5 cursor-pointer
              hover:bg-gradient-to-r
              hover:from-[#063A7F]
              hover:to-[#11B7FF]
              transition
              active:scale-94
              "
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="border p-5 hover:bg-gradient-to-r
              hover:from-[#7F0606]
              hover:to-[#FF4D4D]
              transition
              active:scale-94"
          >
            Delete
          </button>
        </div>
      </section>
    );
  }

  return (
    //kortet med tennis spillere
    //"overflow-hidden" for at bilde ikke skal stikke utenfor boksen.

    <article className="relative mb-2">
      <div className="border rounded-lg overflow-hidden shadow-md">
        <section className="relative">
          <img
            src={imageUrl}
            alt={`Picture of ${athlete.name}`}
            className="w-full h-48 object-cover"
          />

          {/* Knapper for Edit og Delete. */}
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={() => setshowEditWindow(true)}
              className="bg transparent border border-white text-white text-xs px-3 py-1 rounded cursor-pointer
              hover:bg-gradient-to-r
              hover:from-[#063A7F]
              hover:to-[#11B7FF]
              transition
              active:scale-94
              "
            >
              Edit
            </button>
            <button
              onClick={deleteClick}
              className="bg transparent border border-white text-white text-xs px-3 py-1 rounded cursor-pointer
              hover:bg-gradient-to-r
              hover:from-[#7F0606]
              hover:to-[#FF4D4D]
              transition
              active:scale-94"
            >
              Delete
            </button>
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#063A7F] to-[#11B7FF]  text-white px-6 pt-4 pb-5 text-left">
          <h3 className="font-bold text-lg">
            {athlete.id}. {athlete.name} ({athlete.gender})
          </h3>
          <p className="mb-1">Price: {athlete.price} NOK</p>
          {/* Kjøpt eller tilgjengelig */}
          <div className="mt-4 flex justify-end">
            <span
              className={
                "inline-block px-4 py-1 rounded-md text-sm font-semibold  " +
                (athlete.purchaseStatus ? "bg-green-600" : "bg-orange-500")
              }
            >
              {athlete.purchaseStatus ? "Purchased" : "Available"}
            </span>
          </div>
        </section>

        {/* Redigeringsboks */}
        {editWindow}
        {/* Advarselboks */}
        {deleteWarning}
      </div>
    </article>
  );
};

export default AthleteItem;
