import { useContext } from "react";
import { AthletesContext } from "../../contexts/AthleteContext";
import { FinanceContext } from "../../contexts/FinanceContext";


function FinanceAthletes() {
  const athletesContext = useContext(AthletesContext);
  const financeContext = useContext(FinanceContext);


  if (!athletesContext) {
    return <p>Error: AthletesContext not available</p>; //feilmelding for context
  }

  const { athletes } = athletesContext;

  return (
    <div>
      
      <h2 className="flex justify-center text-2xl font-semibold mb-4">Available Athletes</h2>

      {financeContext?.statusMessage && (
  <div className="bg-red-200 text-red-800 font-semibold p-2 mb-4"> 
    {financeContext.statusMessage}
  </div> //status message når ikke råd til atlet, så man må ta lån
)}

     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center w-full max-w-[900px] mx-auto">
        {athletes
          .filter((atlt) => !atlt.purchaseStatus) // viser bare tilgjengelige atleter
          .map((a) => (
           <div
              key={a.id}
              className="border border-[#68b8ce] p-4 w-[200px] h-[340px] rounded-lg shadow-sm flex flex-col"
                >
             <img
             src={`http://localhost:5285/images/${a.image}`}
             alt={a.name}
             className="w-full rounded-lg mb-2 h-48 object-cover" 
            />

              <h3 className="text-lg font-medium">{a.name}</h3>
              <p className="text-sm text-white-700">gender: {a.gender}</p>
              <p className="text-sm text-white-700">price: {a.price}</p>

              <p className="text-sm font-medium mt-2 font-bold"> {/*viser her om atlet er registrert eller ikke, vil alltid være nei her siden det bare vises !registered*/}
                Purchased: {a.purchaseStatus ? "Yes" : "No"} 
              </p>
                    <button
                      className="bg-black text-white mx-auto rounded-md p-3 hover:bg-gray-500 mt-4"
                       onClick={async () => {
                    const success = await financeContext?.purchaseAthlete(a.id, a.price);
                    if (success) {
                    athletesContext?.registerAthlete(a.id); //oppdaterer finance, registrer atlet i db, "fjerner fra siden"
                 }
                    }}>
                      Register
                  </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default FinanceAthletes;
