import React from "react";
import FormInputGroup from "./FormInputGroup";

/** UserProfileForm Component
 *
 * Renders a form for editing the user's profile information.
 *
 */

const UserProfileForm = ({
  formData,
  handleChange,
  handleSubmit,
  setIsEditing,
  error,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <FormInputGroup
            label="First Name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <FormInputGroup
            label="Last Name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <FormInputGroup
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <FormInputGroup
            label="Birth Date"
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
          <FormInputGroup
            label="New Password"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <FormInputGroup
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card-footer text-center">
        <button type="submit" className="btn btn-primary me-2">
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserProfileForm;
