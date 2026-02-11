import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  AthletesPage,
  RegistrerAthletesPage,
  FinancesPage,
  VenuePage,
  ManageVenuesPage,
} from "../pages";
import Layout from "../components/layout/Layout";
import { AthletesProvider } from "../contexts/AthleteContext";
import { FinanceProvider } from "../contexts/FinanceContext";
import NotFoundPage from "../pages/NotFoundPage";
//import MainHeader from "../components/shared/MainHeader";
//import Header from "../components/layout/Header";
//import Footer from "../components/layout/Footer";

const AppRouting = () => {
  return (
    <BrowserRouter>
      <FinanceProvider>
        {" "}
        <AthletesProvider>
          <Routes>
            {/* Layout nester alle pages her, og outlet renderer alt som er nested routes  */}
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/Athletes" element={<AthletesPage />} />
              <Route path="/Register" element={<RegistrerAthletesPage />} />
              <Route path="/Finances" element={<FinancesPage />} />
              <Route path="/Venue" element={<VenuePage />} />
              <Route path="/ManageVenues" element={<ManageVenuesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </AthletesProvider>
      </FinanceProvider>
    </BrowserRouter>
  );
};

export default AppRouting;
