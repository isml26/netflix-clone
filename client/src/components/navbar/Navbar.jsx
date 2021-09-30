import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";
import { logout } from "../../context/auth/AuthActions";
import { Notifications, Search, ArrowDropDown } from "@material-ui/icons";
import "./navbar.scss";
function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { dispatch } = React.useContext(AuthContext);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => {
      window.onscroll = null;
    };
  };
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />

          <Link to="/" className="link">
            <span>HomePage</span>
          </Link>
          <Link to="/series" className="link">
            <span className="navbarMainLinks">Series</span>
          </Link>
          <Link to="movies" className="link">
            <span className="navbarMainLinks">Movies</span>
          </Link>

          <span>New And Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <Search className="icon" />
          <span>KID</span>
          <Notifications className="icon" />
          <img
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={()=>dispatch(logout())}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
