import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeadEyeLaserWorksApi from "../api/api";
import UserContext from "../auth/UserContext";

/** EmailVerificationRoute component
 *
 * This component handles the email verification process for users.
 */

const EmailVerificationRoute = () => {
  const { token } = useParams();
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const user = await DeadEyeLaserWorksApi.confirmEmail(token);
        if (user) {
          setCurrentUser(user);
          navigate("/homepage");
        } else {
          setError("Email verification failed. Please try again.");
        }
      } catch (err) {
        // console.error("Email verification failed:", err);
        setError(
          "An error occurred during email verification. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, setCurrentUser, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return null;
};

export default EmailVerificationRoute;
