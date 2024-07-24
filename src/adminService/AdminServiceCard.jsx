import React, { useState } from "react";
import DeadEyeLaserWorksApi from "../api/api";

/** AdminServiceCard component
 *
 * Renders a card with details of a service and provides functionality for admin users
 * to edit, activate, deactivate, or delete the service.
 */

const AdminServiceCard = ({ service, onServiceUpdate, onServiceDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: service.title,
    description: service.description,
    price: service.price,
    isActive: service.isActive,
  });

  /** Handle input change */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  /** Handle form submission to save service changes */
  const handleSave = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      price: parseInt(formData.price, 10),
    };
    try {
      const updatedService = await DeadEyeLaserWorksApi.updateService(
        service.serviceId,
        updatedFormData
      );
      onServiceUpdate(updatedService);
      setIsEditing(false);
    } catch (err) {
      console.error("AdminServiceCard handleSave: problem saving", err);
    }
  };

  /** Handle canceling the edit mode */
  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price,
      isActive: service.isActive,
    });
  };

  /** Handle deleting the service */
  const handleDelete = async () => {
    try {
      await DeadEyeLaserWorksApi.deleteService(service.serviceId);
      onServiceDelete(service.serviceId);
    } catch (err) {
      console.error("AdminServiceCard handleDelete: problem deleting", err);
    }
  };

  /** Handle deactivating the service */
  const handleDeactivate = async () => {
    try {
      const updatedService = await DeadEyeLaserWorksApi.deactivateService(
        service.serviceId
      );
      onServiceUpdate(updatedService);
    } catch (err) {
      console.error(
        "AdminServiceCard handleDeactivate: problem deactivating",
        err
      );
    }
  };

  /** Handle activating the service */
  const handleActivate = async () => {
    try {
      const updatedService = await DeadEyeLaserWorksApi.activateService(
        service.serviceId
      );
      onServiceUpdate(updatedService);
    } catch (err) {
      console.error("AdminServiceCard handleActivate: problem activating", err);
    }
  };

  return (
    <div className="col-lg-4 col-md-6 mb-4" style={{ height: "60vh" }}>
      <div className="card shadow-lg h-100 rounded">
        {isEditing ? (
          <form
            onSubmit={handleSave}
            className="card-body d-flex flex-column"
            style={{ overflowY: "auto" }}
          >
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="isActive">Active</label>
              <select
                className="form-control"
                id="isActive"
                name="isActive"
                value={formData.isActive}
                onChange={handleChange}
                required
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
            </div>
            <div className="mt-3 d-flex justify-content-between">
              <button type="submit" className="btn btn-primary me-2 rounded">
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{service.title}</h5>
            <p className="card-text flex-grow-1">{service.description}</p>
            <p className="card-text">
              <strong>Price:</strong> ${service.price}
            </p>
            <p className="card-text">
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color: service.isActive ? "green" : "red",
                }}
              >
                {service.isActive ? "Active" : "Inactive"}
              </span>
            </p>
            <div className="mt-3 d-flex justify-content-between">
              <button
                className="btn btn-primary rounded"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id={`dropdownMenuButton${service.serviceId}`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Options
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end rounded"
                  aria-labelledby={`dropdownMenuButton${service.serviceId}`}
                >
                  <li>
                    <button
                      className="dropdown-item "
                      onClick={handleDeactivate}
                    >
                      Deactivate
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleActivate}>
                      Activate
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleDelete}>
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminServiceCard;
