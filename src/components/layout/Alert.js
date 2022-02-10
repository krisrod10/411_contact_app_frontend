import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import Modal from "./Modal";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const customId = "custom-id-yes";

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    /* alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle"></i> {alert.msg}
      </div>
    )) */
    <>
      {alertContext.alerts.length > 0 &&
        alertContext.alerts.map((alert) => {
          if (alert.type === "danger") {
            toast.error(alert.msg, {
              toastId: customId,
              position: "bottom-right",
            });
          }
        })}
      <ToastContainer />
    </>
  );
};
export default Alerts;