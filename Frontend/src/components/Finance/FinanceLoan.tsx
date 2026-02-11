import { useState, useContext } from "react";
import { FinanceContext } from "../../contexts/FinanceContext";

const LoanComponent = () => {
  const financeContext = useContext(FinanceContext);
  const [loanAmount, setLoanAmount] = useState("");

  if (!financeContext) return <p>Finance context not available</p>;

  const handleLoan = async () => {
    const amount = Number(loanAmount);

    if (amount <= 0 || isNaN(amount)) return;

    const updated = await financeContext.takeLoan(amount);

    if (updated) {
      financeContext.loadFinance(); 
      setLoanAmount("");
    }
  };

  return (
    <div
    className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md justify-start">
      <input
      className="w-48 h-15 px-3 py-2 my-10 rounded-lg bg-white border border-white
                   text-black placeholder-black
                   focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="number"
        value={loanAmount}
        onChange={(e) => setLoanAmount(e.target.value)}
        placeholder="Loan amount"
      />

      <button 
      className="bg-black text-white mx-auto self-center rounded-md p-3 hover:bg-gray-500"
      onClick={handleLoan}>Loan cash</button>
    </div>
  );
}


export default LoanComponent;