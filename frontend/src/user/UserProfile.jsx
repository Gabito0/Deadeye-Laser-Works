import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../auth/UserContext";
import DeadEyeLaserWorksApi from "../api/api";
import UserInfo from "./UserInfo";
import AccountStatus from "./AccountStatus";
import UserProfileForm from "./UserProfileForm";
import LoadingSpinner from "../common/LoadingSpinner";

/** UserProfile Component
 *
 * Displays and manages the user's profile, including personal information and account status.
 */

const UserProfile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    birthDate: currentUser.birthDate.split("T")[0],
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  if (!currentUser) return <LoadingSpinner />;

  /** Handle input changes */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  /** Toggle account activation status */
  const handleToggleActive = async () => {
    setLoading(true);
    setError(null);
    try {
      await (currentUser.isActive
        ? DeadEyeLaserWorksApi.deactivateUser(currentUser.username)
        : DeadEyeLaserWorksApi.activateUser(currentUser.username));
      setCurrentUser({ ...currentUser, isActive: !currentUser.isActive });
    } catch (err) {
      setError("An error occurred while updating the account status.");
    } finally {
      setLoading(false);
    }
  };

  /** Submit profile updates */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      birthDate: formData.birthDate,
    };

    if (formData.newPassword) {
      data.password = formData.newPassword;
    }

    try {
      const updatedUser = await DeadEyeLaserWorksApi.updateUserProfile(
        currentUser.username,
        data
      );
      setCurrentUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      setError("An error occurred while updating the profile.");
    } finally {
      setLoading(false);
    }
  };

  /** Delete user account */
  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await DeadEyeLaserWorksApi.deleteUser(currentUser.username);
      setCurrentUser(null);
      navigate("/");
    } catch (err) {
      setError("An error occurred while deleting the account.");
    } finally {
      setLoading(false);
    }
  };

  /** Send verification email */
  const handleSendVerificationEmail = async () => {
    setLoading(true);
    setError(null);
    try {
      await DeadEyeLaserWorksApi.sendVerificationEmail(
        currentUser.username,
        currentUser.email
      );
      setEmailSent(true);
    } catch (err) {
      setError("An error occurred while sending the verification email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg rounded border border-0">
            <div className="card-header bg-primary text-white rounded-top">
              <h2 className="mb-0">My Profile</h2>
            </div>
            <div className="card-body">
              {isEditing ? (
                <UserProfileForm
                  formData={formData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  setIsEditing={setIsEditing}
                  error={error}
                />
              ) : (
                <>
                  <div className="row">
                    <UserInfo currentUser={currentUser} />
                    <AccountStatus
                      currentUser={currentUser}
                      loading={loading}
                      handleToggleActive={handleToggleActive}
                      handleSendVerificationEmail={handleSendVerificationEmail}
                    />
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  {emailSent && (
                    <div className="alert alert-success">
                      Verification email sent!
                    </div>
                  )}
                </>
              )}
            </div>
            {!isEditing && (
              <div className="card-footer text-center ">
                <button
                  className="btn btn-primary me-2 rounded"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
                <button
                  className="btn btn-danger ms-2 rounded"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  Delete Account
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
