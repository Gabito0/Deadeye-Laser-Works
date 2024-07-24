import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DeadEyeLaserWorksApi from "../api/api";
import UserContext from "../auth/UserContext";
import LoadingSpinner from "../common/LoadingSpinner";

/** AdminAddOrderForm component
 *
 * Renders a form to add a user service with a specified price and additional information.
 *
 */

const AdminAddOrderForm = () => {
  const { serviceId } = useParams();
  const { currentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    confirmedPrice: "",
    additionInfo: "",
  });
  const [service, setService] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getService() {
      try {
        let currentService = await DeadEyeLaserWorksApi.getService(serviceId);
        setService(currentService);
        setFormData((data) => ({
          ...data,
          confirmedPrice: currentService.price,
        }));
      } catch (err) {
        console.error("AdminAddOrderForm getService: problem loading", err);
        setError(err);
      }
    }

    getService();
  }, [serviceId]);

  /** Handle form data change */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  /** Handle form submission */
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await DeadEyeLaserWorksApi.addUserService(
        currentUser.username,
        +serviceId,
        +formData.confirmedPrice,
        formData.additionInfo
      );
      navigate(`/services`);
    } catch (err) {
      console.error(
        "AdminAddOrderForm handleSubmit: problem adding service",
        err
      );
      setError(err);
    }
  };

  if (!service) return <LoadingSpinner />;
  if (error)
    return (
      <p className="text-primary text-center display-6">
        There was an error loading the service details.
      </p>
    );

  return (
    <div className="container py-5">
      <h1 className="mb-4">Add Service</h1>
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">{service.title}</h2>
          <p className="card-text">{service.description}</p>
          <p className="card-text">
            <strong>Price:</strong> ${service.price}
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {error && <p className="alert alert-danger">Error: {error.message}</p>}
        <div className="mb-3">
          <label className="form-label" htmlFor="confirmedPrice">
            Confirmed Price
          </label>
          <input
            type="number"
            className="form-control"
            id="confirmedPrice"
            name="confirmedPrice"
            value={formData.confirmedPrice}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="additionInfo">
            Please provide details about the item you want to service
          </label>
          <textarea
            className="form-control"
            id="additionInfo"
            name="additionInfo"
            value={formData.additionInfo}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary rounded">
          Add Service
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2 rounded"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AdminAddOrderForm;
