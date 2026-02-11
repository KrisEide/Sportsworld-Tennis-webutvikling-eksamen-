import axios from "axios";
import type { IFinanceResponse } from "../interfaces/ResponseInterfaces";

const epoint = "http://localhost:5285/api/finance";

//henter penger fra db
const getMoney = async (): Promise<IFinanceResponse> => {
  try {
    const response = await axios.get(epoint);
    return {
      success: true,
      data: response.data,
    };
  } catch {
    return {
      success: false,
      data: null,
    };
  }
};


// sender lånebeløp til backend og får oppdatert Finance tilbake
const takeLoan = async (amount: number): Promise<IFinanceResponse> => {
  try {
    const response = await axios.post(`${epoint}/loan/${amount}`);
    return {
      success: true,
      data: response.data,
    };
  } catch{
    return {
      success: false,
      data: null,
    };
  }
};



//oppdater values
const purchaseAthlete = async (athleteId: number) => {
  try {
    const response = await axios.put(`${epoint}/purchase/${athleteId}`);

    return {
      success: true,
      data: response.data
    };
  } catch {
    return {
      success: false,
      data: null,
    };
  }
};


export default {
  getMoney,
  takeLoan,
  purchaseAthlete
};
