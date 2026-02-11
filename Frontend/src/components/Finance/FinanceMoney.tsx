import { useContext } from "react";
import { FinanceContext } from "../../contexts/FinanceContext";

const FinanceMoney = () => {
  const financeContext = useContext(FinanceContext); //he
  const money = financeContext?.finance;

  if (!money) return <p>Laster finance..</p>;

  return (
    <article
    className="
        bg-black
        border border-[#68b8ce]
        rounded-xl 
        p-6 
        shadow-lg 
        text-white 
        w-64
      ">
      <h3 className="text-2xl font-bold">Finance</h3>
      <h3>Money left: {money.moneyLeft}</h3>
      <h3>Purchases: {money.numberOfPurchases}</h3>
      <h3>Money spent: {money.moneySpent}</h3>
    </article>
  );
};

export default FinanceMoney;
