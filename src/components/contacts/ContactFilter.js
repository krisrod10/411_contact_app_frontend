import React, { useContext, useEffect, useRef } from "react";

// Context
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter, filtered } = contactContext;

  const text = useRef("");

  useEffect(() => {
    if (filtered === null) text.current.value = "";
  });

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form className="mt-2">
      <div className="form-group">
        <input
          className="form-control"
          ref={text}
          type="text"
          placeholder="Filter Contacts"
          onChange={onChange}
        />
      </div>
    </form>
  );
};

export default ContactFilter;