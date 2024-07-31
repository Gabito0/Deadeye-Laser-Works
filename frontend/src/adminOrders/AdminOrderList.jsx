import React, { useState, useEffect } from "react";
import DeadEyeLaserWorksApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";

/** OrderList Component
 *
 * Renders a list of user services (orders) with details and management options.
 */

const OrderList = () => {
  const [userServices, setUserServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUserServiceId, setEditUserServiceId] = useState(null);
  const [formData, setFormData] = useState({ confirmedPrice: "" });

  useEffect(() => {
    const fetchUserServices = async () => {
      try {
        let fetchedUserServices =
          await DeadEyeLaserWorksApi.getAllUsersServices();
        setUserServices(fetchedUserServices);
        setLoading(false);
      } catch (err) {
        console.error("OrderList fetchUserServices: problem loading", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchUserServices();
  }, []);

  /** Mark a user service as completed */
  const handleComplete = async (username, userServiceId) => {
    try {
      await DeadEyeLaserWorksApi.completeUserService(username, userServiceId);
      const updatedUserServices =
        await DeadEyeLaserWorksApi.getAllUsersServices();
      setUserServices(updatedUserServices);
    } catch (err) {
      console.error("OrderList handleComplete: problem completing", err);
      setError(err);
    }
  };

  /** Handle form data change */
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  /** Save the updated price of a user service */
  const handleSavePrice = async (username, userServiceId) => {
    try {
      await DeadEyeLaserWorksApi.updateUserServicePrice(
        username,
        userServiceId,
        formData.confirmedPrice
      );
      const updatedUserServices =
        await DeadEyeLaserWorksApi.getAllUsersServices();
      setUserServices(updatedUserServices);
      setEditUserServiceId(null);
    } catch (err) {
      console.error("OrderList handleSavePrice: problem saving price", err);
      setError(err);
    }
  };

  /** Cancel editing the price of a user service */
  const handleCancelEdit = () => {
    setEditUserServiceId(null);
    setFormData({ confirmedPrice: "" });
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <p className="text-primary text-center display-6">
        There was an error loading the orders.
      </p>
    );

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Order History</h1>
      {userServices && userServices.length > 0 ? (
        <div className="row">
          {userServices.map((userService) => (
            <div
              className="col-lg-4 col-md-6 mb-4"
              key={userService.userServiceId}
            >
              <div className="card shadow-lg h-100 rounded">
                {editUserServiceId === userService.userServiceId ? (
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{userService.username}</h5>
                    <p className="card-text">
                      <strong>Service:</strong> {userService.title}
                    </p>
                    <p className="card-text">
                      <strong>Additional Info:</strong>{" "}
                      {userService.additionInfo}
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
                    <div className="form-group">
                      <label
                        htmlFor={`confirmedPrice-${userService.userServiceId}`}
                      >
                        Confirmed Price
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id={`confirmedPrice-${userService.userServiceId}`}
                        name="confirmedPrice"
                        value={formData.confirmedPrice}
                        onChange={handlePriceChange}
                        required
                      />
                    </div>
                    <div className="mt-3 d-flex justify-content-between">
                      <button
                        className="btn btn-primary rounded"
                        onClick={() =>
                          handleSavePrice(
                            userService.username,
                            userService.userServiceId
                          )
                        }
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{userService.username}</h5>
                    <p className="card-text">
                      <strong>Service:</strong> {userService.title}
                    </p>
                    <p className="card-text">
                      <strong>Additional Info:</strong>{" "}
                      {userService.additionInfo}
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
                    {!userService.isCompleted && (
                      <>
                        <button
                          className="btn btn-primary mt-auto rounded"
                          onClick={() =>
                            handleComplete(
                              userService.username,
                              userService.userServiceId
                            )
                          }
                        >
                          Mark as Completed
                        </button>
                        <button
                          className="btn btn-secondary mt-2"
                          onClick={() => {
                            setEditUserServiceId(userService.userServiceId);
                            setFormData({
                              confirmedPrice: userService.confirmedPrice,
                            });
                          }}
                        >
                          Change Price
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No orders available.</p>
      )}
    </div>
  );
};

export default OrderList;
