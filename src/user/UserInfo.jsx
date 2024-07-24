import React from "react";

/** UserInfo Component
 *
 * A component that displays detailed user information in a card-like format.
 *
 */

const UserInfo = ({ currentUser }) => {
  return (
    <div className="col-md-6">
      <h5 className="card-title">User Information</h5>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <strong>Username:</strong> {currentUser.username}
        </li>
        <li className="list-group-item">
          <strong>First Name:</strong> {currentUser.firstName}
        </li>
        <li className="list-group-item">
          <strong>Last Name:</strong> {currentUser.lastName}
        </li>
        <li className="list-group-item">
          <strong>Email:</strong> {currentUser.email}
        </li>
        <li className="list-group-item">
          <strong>Birth Date:</strong>{" "}
          {new Date(currentUser.birthDate).toLocaleDateString()}
        </li>
      </ul>
    </div>
  );
};

export default UserInfo;
