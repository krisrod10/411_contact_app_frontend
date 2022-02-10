import React, { useContext, useState, useEffect } from "react";

// Context
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error !== null && error) {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all fields!", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match! Try again!", "danger");
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className="container mt-4">
      <div align="center">
        <h2>
          Account <span className="text-primary">Register</span>
        </h2>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-2 col-sm-1"></div>
        <div
          className="col-lg-6 col-md-8 col-sm-10 mt-3"
          // style={{ margin: "0 auto", width: "70%" }}
        >
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                placeholder="You Name"
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                placeholder="You Email id"
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                placeholder="Your Password"
                minLength="5"
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                value={password2}
                placeholder="Please confirm the same password"
                minLength="5"
                onChange={onChange}
                required
              />
            </div>
            <input
              type="submit"
              value="Register"
              className="btn btn-primary btn-block"
            />
          </form>
        </div>
        <div className="col-lg-3 col-md-2 col-sm-1"></div>
      </div>
    </div>
  );
};

export default Register;