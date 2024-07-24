import React from "react";

/** AccountStatus Component
 *
 * Displays the account status details for the current user, including activation status
 * and email verification status.
 */

const AccountStatus = ({
  currentUser,
  loading,
  handleToggleActive,
  handleSendVerificationEmail,
}) => {
  return (
    <div className="col-md-6">
      <h5 className="card-title">Account Status</h5>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>Active:</strong>{" "}
            <span style={{ color: currentUser.isActive ? "green" : "red" }}>
              {currentUser.isActive ? "Active" : "Inactive"}
            </span>
          </div>
          <button
            className={`btn btn-sm rounded ${
              currentUser.isActive ? "btn-danger" : "btn-success"
            }`}
            onClick={handleToggleActive}
            disabled={loading}
          >
            {loading
              ? "Updating..."
              : currentUser.isActive
              ? "Deactivate"
              : "Activate"}
          </button>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>Verified:</strong>{" "}
            <span style={{ color: currentUser.isVerified ? "green" : "red" }}>
              {currentUser.isVerified ? "Verified" : "Not Verified"}
            </span>
          </div>
          {!currentUser.isVerified && (
            <button
              className="btn btn-warning btn-sm"
              onClick={handleSendVerificationEmail}
              disabled={loading}
            >
              {loading ? "Sending..." : "Verify Email"}
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default AccountStatus;
