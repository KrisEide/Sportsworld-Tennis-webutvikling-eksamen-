import { createContext, useState, useEffect, type ReactNode } from "react";
import FinanceService from "../services/FinanceService";
import type { IFinance } from "../interfaces/IFinance";
import type { IFinanceContext } from "../interfaces/IFinanceContext";

export const FinanceContext = createContext<IFinanceContext | null>(null);

interface Props {
  children: ReactNode;
}

export const FinanceProvider = ({ children }: Props) => {
  const [finance, setFinance] = useState<IFinance | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  // Hent finance fra backend ved oppstart
  const loadFinance = async () => {
    const response = await FinanceService.getMoney();
    if (response.success && response.data) {
      setFinance(response.data);
      setStatusMessage(""); //trenger ikke egt
    }
  };

  useEffect(() => {
    loadFinance();
  }, []);

  // kjøp athlete 
  const purchaseAthlete = async (
    athleteId: number,
    athletePrice: number
  ): Promise<boolean> => {
    if (!finance) {
      setStatusMessage("Finance data not loaded");
      return false;
    }

    // sjekk moneyleft for lån av atlet
    if ((finance.moneyLeft ?? 0) < athletePrice) {
      setStatusMessage("Not sufficient funds, take a loan!");
      return false;
    }

    const response = await FinanceService.purchaseAthlete(athleteId);

    if (response.success && response.data) {
      setFinance(response.data); // oppdater økonomi
      return true;
    }

    setStatusMessage("could not update finance");
    return false;
  };

  // tar lånet
  const takeLoan = async (amount: number): Promise<boolean> => {
    const response = await FinanceService.takeLoan(amount);

    if (response.success && response.data) {
      setFinance(response.data); // Oppdater økonomi
      setStatusMessage("");
      return true;
    }

    setStatusMessage("could not take loan"); 
    return false;
  };

  const value: IFinanceContext = {
    finance,
    loadFinance,
    purchaseAthlete,
    takeLoan, 
    statusMessage,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};
