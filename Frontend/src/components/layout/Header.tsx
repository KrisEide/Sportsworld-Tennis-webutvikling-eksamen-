import { Link, useLocation } from "react-router-dom";

// https://reactrouter.com/api/hooks/useLocation

const Header = () => {

	const location = useLocation();

  return (
    <header className="w-full bg-gradient-to-r from-[#063A7F] to-[#11B7FF] py-5 lg:py-8 px-4 flex flex-col lg:flex-row items-center justify-between gap-4">
      {/* LOGO */}
      <Link to="/" className="text-2xl font-bold tracking-wide text-[#BBFF00]">
        SportsWorld 🎾
      </Link>

      {/* NAV MENU */}
      <ul className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 lg:gap-6 font-bold text-[#BBFF00] [&_li]:whitespace-nowrap [&_a]:inline-block [&_a]:py-2 lg:[&_a]:py-0">
        <li className="text-lg  hover:text-[#DAFFA2]">
          {location.pathname === "/Athletes" && "🎾"}
          <Link to="/Athletes">Athletes</Link>
        </li>

        <li className="text-lg hover:text-[#DAFFA2]">
          {location.pathname === "/Register" && "🎾"}
          <Link to="/Register">Register</Link>
        </li>

        <li className="text-lg hover:text-[#DAFFA2]">
          {location.pathname === "/Finances" && "🎾"}
          <Link
            to="/Finances">
            Finances
          </Link>
        </li>

        <li className="text-lg hover:text-[#DAFFA2]">
           {location.pathname === "/Venue" && "🎾"}
          <Link
            to="/Venue">
            Venues
          </Link>
        </li>

        <li className="text-lg hover:text-[#DAFFA2]">
           {location.pathname === "/ManageVenues" && "🎾"}
          <Link
            to="/ManageVenues">
            Manage Venues
          </Link>
        </li>
      </ul>
    </header>
  );
}; 

export default Header;
