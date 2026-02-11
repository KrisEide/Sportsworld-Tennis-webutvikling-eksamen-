import { useContext, useRef, useState, useEffect } from "react";
import { AthletesContext } from "../contexts/AthleteContext";
import type { IAthletesContext } from "../interfaces/IAthletesContext";
import AthleteList from "../components/Athletes/AthleteList";
import type { IAthlete } from "../interfaces/IAthlete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const AthletesPage = () => {
  const { athletes, statusMessage } = useContext(
    AthletesContext
  ) as IAthletesContext;

  let feedbackMessage = null;

  if (statusMessage !== "")
    // !== betyr "ikke lik". Så hvis denne if setningen er TRUE så kommer statusMessage.
    // hvis det er en tekst i statusMessage så blir det laget en <p> som vier teksten i rødt.{
    feedbackMessage = (
      <p className="text-red-500 mb-4">Status: {statusMessage}</p>
    );

  //---- Søkefelt og funkjson ----

  //Her er setFilteredAthletes den funkjsonen som blir brukt for å oppdatere Athletes på siden.
  const [filteredAthletes, setFilteredAthletes] = useState<IAthlete[]>([]);

  const nameOrIdSearchInput = useRef<HTMLInputElement | null>(null);

  //useEffect kjører hver gang athletes endrer seg.
  useEffect(() => {
    setFilteredAthletes(athletes);
  }, [athletes]);

  //funksjonen som kjører når du trykker på "søk"
  const filterAthletes = () => {
    if (nameOrIdSearchInput.current == null) {
      return;
    }

    //Det er "nameSearchInput.current.value" som er det brukeren har skrevet.
    const searchValue = nameOrIdSearchInput.current.value.trim().toLowerCase();

    //hvis søkerfeltet er tomt så vis alle athletes.
    if (searchValue === "") {
      setFilteredAthletes(athletes);
      return;
    }

    const findAthleteNameOrId = athletes.filter((athleteCheck) => {
      const searchedId = athleteCheck.id === Number(searchValue);
      const searchedName = athleteCheck.name
        .toLowerCase()
        .includes(searchValue);

      return searchedId || searchedName;
    });

    //Her sier vi oppdater "filteredAthletes" med DENNE filtrerte listen.
    setFilteredAthletes(findAthleteNameOrId);
  };

  return (
    <section className="max-w-3xl mx-auto mt-12 text-center">
      <h1 className="text-3xl font-bold mb-4">Athletes</h1>
      <div className="mb-7 flex gap-2">
        <input
          ref={nameOrIdSearchInput}
          className="flex-1 border rounded border-grey-300 px-3 py-2"
          type="search"
          placeholder="Search for athlete by name or ID"

          // OnChange aktiveres når brukeren søker.
          //Dette oppdaterer searchAthlete også kan vi bruke den teksten for å filtrere på athlete.
        />
        <button
          onClick={filterAthletes}
          className="border px-3 py-2 rounded cursor-pointer
              hover:bg-gradient-to-r
              hover:from-[#063A7F]
              hover:to-[#11B7FF]
              active:scale-94" //når du trykker skalerer den ned til 94% størrelse
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      {/* Det er her statusmeldingen blir vist, hvis den finnes */}
      {feedbackMessage}

      <AthleteList athletes={filteredAthletes} />
    </section>
  );
};

export default AthletesPage;
