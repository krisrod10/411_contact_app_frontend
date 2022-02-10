import React, { useContext, useEffect } from "react";

// Components
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";

// Context
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";
import AlertContext from "../../context/alert/alertContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);
  const alertContext = useContext(AlertContext);

  const { error, clearErrors } = contactContext;

  const { setAlert } = alertContext;

  useEffect(() => {
    authContext.loadUser();

    if (error !== null && error) {
      setAlert(error, "danger");
      clearErrors();
    }
  }, [error]);

  return (
    <div className="container">
      {/* <h1 className="text-dark">Home</h1> */}
      <div className="row">
        <div className="col-md-6 col-sm 12">
          <ContactForm />
        </div>
        <div className="col-md-6 col-sm 12">
          <ContactFilter />
          <Contacts />
        </div>
      </div>
    </div>
  );
};

export default Home;