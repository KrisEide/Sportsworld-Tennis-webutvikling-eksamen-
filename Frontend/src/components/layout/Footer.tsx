// import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-[#063A7F] to-[#11B7FF] py-8 px-4 h-[300px] flex items-center justify-between text-[#BBFF00]">
      <section>
        <ul>
          <h3 className="font-bold tracking-wide">Partners</h3>
          <li>Real Tennis Club</li>
          <li>Greatest Sports Equipments</li>
          <li>Thunder Energy</li>
        </ul>
      </section>

      <section>
        <p>www.sportsworld.com</p>
      </section>

      <section>
        <ul>
          <h3 className="font-bold tracking-wide">Contact</h3>
          <li>sportsworld@sportsmail.com</li>
          <li>+47 12345678</li>

          <h3 className="font-bold tracking-wide">Address</h3>
          <li>Sportsgata 32, 0343 Levanger </li>

          <FontAwesomeIcon icon={faFacebook} className="text-3xl pt-5" />
          <FontAwesomeIcon icon={faInstagram} className="text-3xl pt-5" />
          <FontAwesomeIcon icon={faTwitter} className="text-3xl pt-5" />
          <FontAwesomeIcon icon={faYoutube} className="text-3xl pt-5" />
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
