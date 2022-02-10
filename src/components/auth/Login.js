import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;

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
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill in all fields!", "danger");
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <div className="container mt-4">
      <div align="center">
        <h2>
          Account <span className="text-primary">Login</span>
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
                onChange={onChange}
                minLength="5"
                required
              />
            </div>
            <input
              type="submit"
              value="Login"
              className="btn btn-primary btn-block"
            />
          </form>
        </div>
        <div className="col-lg-3 col-md-2 col-sm-1"></div>
      </div>
    </div>
  );
};

export default Login;