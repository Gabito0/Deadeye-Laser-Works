import React, { useState, useEffect, useContext } from "react";
import DeadEyeLaserWorksApi from "../api/api";
import UserContext from "../auth/UserContext";

/** UserOrderList Component
 *
 * Renders a list of services (orders) that the current user has requested.
 */

const UserOrderList = () => {
  const [userServices, setUserServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUserServices = async () => {
      try {
        if (currentUser) {
          let fetchedUserServices = await DeadEyeLaserWorksApi.getUserServices(
            currentUser.username
          );
          setUserServices(fetchedUserServices);
        }
        setLoading(false);
      } catch (err) {
        // console.error("UserOrderList fetchUserServices: problem loading", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchUserServices();
  }, [currentUser]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>There was an error loading the orders.</p>;

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">My Orders</h1>
      {userServices && userServices.length > 0 ? (
        <div className="row">
          {userServices.map((userService) => (
            <div
              className="col-lg-4 col-md-6 mb-4"
              key={userService.userServiceId}
            >
              <div className="card shadow-lg h-100 rounded">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{userService.title}</h5>
                  <p className="card-text">
                    <strong>Service:</strong> {userService.title}
                  </p>
                  <p className="card-text">
                    <strong>Additional Info:</strong> {userService.additionInfo}
                  </p>
                  <p className="card-text">
                    <strong>Status:</strong>{" "}
                    <span
                      style={{
                        color: userService.isCompleted ? "green" : "red",
                      }}
                    >
                      {userService.isCompleted ? "Completed" : "Pending"}
                    </span>
                  </p>
                  <p className="card-text">
                    <strong>Price:</strong> ${userService.confirmedPrice}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-primary">No orders available.</p>
      )}
    </div>
  );
};

export default UserOrderList;
