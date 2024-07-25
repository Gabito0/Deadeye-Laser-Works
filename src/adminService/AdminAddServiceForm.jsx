import React, { useState } from "react";
import DeadEyeLaserWorksApi from "../api/api";

/** AddServiceForm component
 *
 * Renders a form to add a new service to the system.
 */

const AddServiceForm = ({ onServiceAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    isActive: true,
  });

  /** Handle input change */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  /** Handle form submission */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newServiceData = {
      ...formData,
      price: parseInt(formData.price, 10),
    };
    try {
      const newService = await DeadEyeLaserWorksApi.addService(newServiceData);
      onServiceAdd(newService);
      setFormData({
        title: "",
        description: "",
        price: "",
        isActive: true,
      });
    } catch (err) {
      // console.error("AddServiceForm handleSubmit: problem adding service", err);
    }
  };

  return (
    <div className="col-lg-4 col-md-6 mb-4" style={{ height: "60vh" }}>
      <div className="card shadow-lg h-100">
        <form
          onSubmit={handleSubmit}
          className="card-body d-flex flex-column rounded"
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
              Add Service
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceForm;
