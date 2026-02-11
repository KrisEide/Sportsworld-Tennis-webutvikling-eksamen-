import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
// Reactrouter - Outlet 
// https://reactrouter.com/api/components/Outlet
const Layout = () => {
	return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 min-h-[700px]">
          {/* outlet brukes til å vise sider som er nested inni felles layout, 
          slik at header og footer kan gjennbrukes, og bare innholdet byttes utifra 
          hvilken rute spom er aktiv  */}
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}


export default Layout;
