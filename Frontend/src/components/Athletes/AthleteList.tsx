import type { IAthlete } from "../../interfaces/IAthlete";
import AthleteItem from "./AthleteItem";

interface AthleteListData {
  athletes: IAthlete[];
  // athletes er en array av Iathlete
}

const AthleteList = ({ athletes }: AthleteListData) => {
  const getAthleteJSX = () => {
    //Her brukes .map som går gjennom alle elementene i listen og lager et AthleteItem av alle athletes
    const athleteJSX = athletes.map((athlete, index) => {
      let isLeftColumn = false;

      if (
        index === 0 ||
        index === 2 ||
        index === 4 ||
        index === 6 ||
        index === 8 ||
        index === 10 ||
        index === 12 ||
        index === 14 ||
        index === 16 ||
        index === 18 ||
        index === 20
      ) {
        isLeftColumn = true;
      } else {
        isLeftColumn = false;
      }

      return (
        <AthleteItem
          key={"athlete" + index}
          athlete={athlete}
          isLeftColumn={isLeftColumn}
        />
      );
      //Det som returneres her blir noe slikt:
      // <AthleteItem key="athlete0" athlete={...} /> osv  pr. athlete.
      //det er index som setter plassen i listen den har.
    });
    return athleteJSX;
  };

  return (
    <section className="mt-8">
      {/* skrur på CSS grid */}
      {/* På små skjermer vises det 1 og 1 under hverandre */}
      {/* På større skjermer er det 2 og 2. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {getAthleteJSX()}
      </div>
    </section>
  );
}; // End AthleteList

export default AthleteList;
