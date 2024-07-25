import React from "react";
/** Presentational component for showing bootstrap-style alerts.
 *
 *  { LoginForm, SignupForm, ProfileForm} -> Alert
 */

const AppAlert = ({ type = "danger", messages = [] }) => {
  // console.debug("Alert", "type=", type, "messages=", messages);
  // console.log(messages, "Alert");
  return (
    <div className={`alert alert-${type} mt-4 rounded`} role="alert">
      {messages.map((error) => (
        <p className="mb-0 small" key={error}>
          {error}
        </p>
      ))}
    </div>
  );
};

export default AppAlert;
