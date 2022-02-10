import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Context
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;

  const contactContext = useContext(ContactContext);
  const { clearContacts } = contactContext;

  const onLogout = () => {
    logout();
    clearContacts();
  };

  const authLinks = (
    <>
      <li className="nav-item nav-link text-white">
        Hello {user && user.name}
      </li>
      <li className="nav-item">
        <a onClick={onLogout} href="#!" className="nav-link text-white">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/register">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/login">
          Login
        </Link>
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary text-white">
      <h4 className="my-auto">
        <i className={icon} /> {title}
      </h4>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse float-sm-right"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav float-sm-right ml-auto my-auto">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/about">
              About
            </Link>
          </li>
          {isAuthenticated ? authLinks : guestLinks}
          <li className="nav-item nav-link text-white d-none d-md-block">|</li>
          <li className="nav-item">
            <a
              href="https"
              target="_blank"
              className="nav-link text-white"
            >
              <i class="fab fa-github"></i> GitHub{" "}
              <i class="fas fa-external-link-alt"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Navbar.prototypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Contact App",
  icon: "far fa-address-card",
};

export default Navbar;