import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppAlert from "../common/AppAlert";
import UserContext from "./UserContext";

/** Login form
 *
 * Shows form and manages update to state on changes.
 * On submission:
 *  - calls login function prop
 *  - redirects to /homepage route
 *
 *
 */

const LoginForm = ({ login }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  // console.debug(
  //   "LoginForm",
  //   "login=",
  //   typeof login,
  //   "formData=",
  //   formData,
  //   "formErrors=",
  //   formErrors,
  //   "rememberMe",
  //   rememberMe
  // );

  /** Handle form submit:
   *
   *  Calls login func and, if successful, redirect to /homepage.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(formData, rememberMe);
    // console.log(result, "handleLogin");
    if (!result.success) {
      setFormErrors(result.err);
      // console.log(result);
    }
  }

  /**Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((l) => ({ ...l, [name]: value }));
  }

  function handleCheckBoxChange(evt) {
    setRememberMe(evt.target.checked);
  }

  return (
    <div className="container-xxl position-absolute top-50 start-50 translate-middle ">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3">Log In</h3>
        <div className="card rounded">
          <div className="card-body pb-lg-2">
            <form onSubmit={handleSubmit}>
              <div className="form-group ">
                <label htmlFor="username" className="text-primary-emphasis">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  className="form-control mt-1 shadow"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="password" className="text-primary-emphasis">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="form-control shadow mt-1"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
              </div>

              {formErrors.length ? (
                <AppAlert type="danger" messages={formErrors} />
              ) : null}
              <div className=" card-body row justify-content-center ">
                <button className="btn btn-primary col-md-8 mt-4 rounded">
                  Submit
                </button>
              </div>
              <div className="form-check card-body position-absolute">
                <input
                  type="checkbox"
                  className="form-check-input rounded border border-dark"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={handleCheckBoxChange}
                />
                <label
                  htmlFor="remember-me"
                  className="form-check-label text-primary"
                >
                  Remember Me
                </label>
                <div className="mt-2 text-primary">
                  <div>
                    <p>
                      Not a Member? <Link to={"/signup"}>Sign Up</Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
