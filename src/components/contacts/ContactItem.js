import React, { useContext } from "react";
import PropTypes from "prop-types";

// Context
import contactContext from "../../context/contact/contactContext";

const ContactItem = ({ contact }) => {
  const ContactContext = useContext(contactContext);
  const { deleteContact, setCurrent, clearCurrent } = ContactContext;

  const { _id, name, email, phone, type } = contact;

  const onDelete = (e) => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div className="card my-2 bg-white">
      <div className="card-header">
        <h5 className="d-inline align-middle card-title text-primary">
          {name}
        </h5>
        <span
          className={
            "badge badge-sm d-inline align-middle mx-auto my-auto float-right " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </div>
      <div className="card-body m-0 p-0 pl-4 pt-2">
        <i className="fas fa-envelope-open"></i> {email}
        <br />
        <i className="fas fa-phone-alt"></i> {phone}
      </div>
      <div className="card-footer bg-white border-0">
        <button
          className="btn btn-sm btn-dark px-4 mr-1"
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button className="btn btn-sm btn-danger px-4 mr-1" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;