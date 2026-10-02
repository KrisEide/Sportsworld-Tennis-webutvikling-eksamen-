import FinanceMoney from "../components/Finance/FinanceMoney";
import FinanceAthletes from "../components/Finance/FinanceAthletes";
import LoanComponent from "../components/Finance/FinanceLoan";

const FinancesPage = () => {
  return (
    <section className="px-4 py-8">
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-6 lg:gap-30 mb-8"> {/* distanse mellom komponenter*/}
      <FinanceMoney/> 
      <LoanComponent/>
      </div>
      {/* Viser alle tilgjengelige athletes */}
      <FinanceAthletes />
    </section>
  );
};

export default FinancesPage;
