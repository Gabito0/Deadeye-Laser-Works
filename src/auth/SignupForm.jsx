import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppAlert from "../common/AppAlert";

/** SignupForm component
 *
 * Renders a form for user registration, managing state for form inputs and handling form submission.
 */

const SignupForm = ({ signup }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState("");

  // console.debug(
  //   "SignupForm",
  //   "signup=",
  //   typeof signup,
  //   "formData=",
  //   formData,
  //   "confirmPassword=",
  //   confirmPassword,
  //   "formErrors=",
  //   formErrors
  // );

  /** Handles form submission:
   * - Validates that the password and confirmPassword fields match.
   * - Calls the signup function provided via props with formData.
   * - Redirects to the homepage on success or sets form errors on failure.
   */
  async function handleSubmit(evt) {
    evt.preventDefault();
    if (formData.password !== confirmPassword) {
      setFormErrors(["Passwords do not match"]);
      return;
    }
    try {
      let result = await signup(formData);
      // console.log(result);
      if (result.success) {
        navigate("/");
      } else {
        handleErrors(result.err);
      }
    } catch (err) {
      handleErrors(err.message);
    }
  }

  /** Formats and sets error messages for display */
  function handleErrors(errors) {
    if (Array.isArray(errors)) {
      const formattedErrors = errors.map((error) => {
        if (
          error.includes(
            'duplicate key value violates unique constraint "users_email_key"'
          )
        ) {
          return "Email is already taken";
        }
        return error;
      });
      setFormErrors(formattedErrors);
    } else {
      setFormErrors([errors]);
    }
  }

  /** Updates form data state when input fields change */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  /** Updates confirmPassword state when the confirm password input changes */
  function handleConfirmPasswordChange(evt) {
    setConfirmPassword(evt.target.value);
  }

  return (
    <div className="container-xxl position-absolute top-50 start-50 translate-middle">
      <div className="container col-md-9 col-lg-8">
        <h2 className="mb-3">Sign Up</h2>
        <div className="card rounded">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row jumbotron box8">
                <div className="col-12 form-group text-center">
                  <div className="col-sm-6 mx-auto">
                    <label className="text-primary-emphasis" htmlFor="username">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control shadow"
                      name="username"
                      id="username"
                      value={formData.username}
                      autoComplete="username"
                      onChange={handleChange}
                      placeholder="Enter your username."
                    />
                  </div>
                </div>
                <div className="col-sm-6 form-group mt-2">
                  <label className="text-primary-emphasis" htmlFor="first-name">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control shadow"
                    name="firstName"
                    id="first-name"
                    autoComplete="first-name"
                    placeholder="Enter your first name."
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-sm-6 form-group mt-2">
                  <label className="text-primary-emphasis" htmlFor="last-name">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control shadow"
                    name="lastName"
                    id="last-name"
                    placeholder="Enter your last name."
                    required
                    onChange={handleChange}
                    value={formData.lastName}
                    autoComplete="last-name"
                  />
                </div>
                <div className="col-sm-6 form-group mt-2">
                  <label className="text-primary-emphasis" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control shadow"
                    name="email"
                    id="email"
                    placeholder="Enter your email."
                    required
                    onChange={handleChange}
                    value={formData.email}
                    autoComplete="email"
                  />
                </div>
                <div className="col-sm-6 form-group mt-2">
                  <label className="text-primary-emphasis" htmlFor="birth-date">
                    Date Of Birth
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    className="form-control shadow"
                    id="birth-date"
                    required
                    onChange={handleChange}
                    value={formData.birthDate}
                    autoComplete="birth-date"
                  />
                </div>
                <div className="col-sm-6 form-group mt-2">
                  <label className="text-primary-emphasis" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control shadow"
                    id="password"
                    required
                    onChange={handleChange}
                    value={formData.password}
                    autoComplete="password"
                  />
                </div>
                <div className="col-sm-6 form-group mt-2">
                  <label
                    className="text-primary-emphasis"
                    htmlFor="confirm-password"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    className="form-control shadow"
                    id="confirm-password"
                    required
                    onChange={handleConfirmPasswordChange}
                    autoComplete="confirmed-password"
                    value={confirmPassword}
                  />
                </div>
                {formErrors.length ? (
                  <AppAlert type="danger" messages={formErrors} />
                ) : null}
                <div className="form-group mb-0 mt-3 row justify-content-center">
                  <button className="btn btn-primary col-md-8 rounded ">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
