import React, { useState, useContext, useEffect } from "react";

//Context
import contactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  const ContactContext = useContext(contactContext);
  const { current, addContact, clearCurrent, updateContact } = ContactContext;

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const { name, email, phone, type } = contact;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      clearFormFields();
    }
  }, [contactContext, current]);

  const clearFormFields = () => {
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
  };

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (current === null) addContact(contact);
    else updateContact(contact);

    clearFormFields();
    clearCurrent();
  };

  const clearAll = (e) => {
    clearCurrent();
  };

  return (
    <>
      <div align="center" className="my-3">
        <h3>{current === null ? "Add" : "Edit"} Contacts</h3>
      </div>
      <form className="my-2" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="phone"
            placeholder="Phone"
            value={phone}
            onChange={onChange}
            required
          />
        </div>
        Contact Type:{" "}
        <div className="form-group">
          <input
            type="radio"
            name="type"
            value="personal"
            checked={type === "personal"}
            onChange={onChange}
          />{" "}
          Personal{" "}
          <input
            type="radio"
            name="type"
            value="professional"
            checked={type === "professional"}
            onChange={onChange}
          />{" "}
          Professional
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-block">
            {current === null ? "Add" : "Update"} Contact
          </button>
        </div>
        {current && (
          <div className="form-group">
            <button className="btn btn-secondary btn-block" onClick={clearAll}>
              Reset
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default ContactForm;