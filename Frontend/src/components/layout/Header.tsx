import { Link, useLocation } from "react-router-dom";

// https://reactrouter.com/api/hooks/useLocation

const Header = () => {

	const location = useLocation();

  return (
    <header className="w-full bg-gradient-to-r from-[#063A7F] to-[#11B7FF] py-8 px-4 flex items-center justify-between">
      {/* LOGO */}
      <Link to="/" className="text-2xl font-bold tracking-wide text-[#BBFF00]">
        SportsWorld 🎾
      </Link>

      {/* NAV MENU */}
      <ul className="flex items-center gap-6 font-bold text-[#BBFF00]">
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

