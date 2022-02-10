import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    // alert("Got TOken in set auth - " + token);
    axios.defaults.headers.common["x-auth-token"] = token;
    // alert("Value of x-auth - " + axios.defaults.headers.common["x-auth-token"]);
  } else {
    // alert("DANGER");
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;