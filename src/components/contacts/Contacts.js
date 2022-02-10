import React, { useContext, useEffect } from "react";
// import { TransitionGroup, CSSTransition } from "react-transition-group";

// Component
import ContactItem from "./ContactItem";
import Spinner from "../layout/Spinner";

// Context
import ContactContext from "../../context/contact/contactContext";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h3>No contacts to display!</h3>;
  }

  return (
    <>
      {contacts !== null && !loading ? (
        <>
          {filtered !== null
            ? filtered.map((contact) => (
                <ContactItem key={contact._id} contact={contact} />
              ))
            : contacts.map((contact) => (
                <ContactItem key={contact._id} contact={contact} />
              ))}
        </>
      ) : (
        <Spinner />
      )}
      {/* <TransitionGroup>
        {filtered !== null
          ? filtered.map((contact) => (
              <CSSTransition key={contact.id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contacts.map((contact) => (
              <CSSTransition key={contact.id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup> */}
    </>
  );
};

export default Contacts;