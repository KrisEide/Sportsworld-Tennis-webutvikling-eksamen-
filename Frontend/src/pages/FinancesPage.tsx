import FinanceMoney from "../components/Finance/FinanceMoney";
import FinanceAthletes from "../components/Finance/FinanceAthletes";
import LoanComponent from "../components/Finance/FinanceLoan";

const FinancesPage = () => {
  return (
    <>
      <div className="flex justify-center gap-30"> {/* distanse mellom komponenter*/}
      <FinanceMoney/> 
      <LoanComponent/>
      </div>
      {/* Viser alle tilgjengelige athletes */}
      <FinanceAthletes />
    </>
  );
};

export default FinancesPage;
