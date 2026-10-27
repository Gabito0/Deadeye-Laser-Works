import React, { useState } from "react";

/** AddReviewForm component
 *
 * A form for submitting a new review with a text and a star rating.
 *
 */

const AddReviewForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    reviewText: "",
    rating: 1,
  });

  /** Handle form input changes */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: name === "rating" ? parseInt(value, 10) : value,
    }));
  };

  /** Handle form submission */
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 text-primary">
      <div className="mb-3">
        <label className="form-label" htmlFor="reviewText">
          Review
        </label>
        <textarea
          className="form-control"
          id="reviewText"
          name="reviewText"
          value={formData.reviewText}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="rating">
          Rating
        </label>
        <select
          className="form-control"
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} Stars
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary me-2 rounded">
        Save
      </button>
      <button
        type="button"
        className="btn btn-secondary rounded"
        onClick={onCancel}
      >
        Cancel
      </button>
    </form>
  );
};

export default AddReviewForm;
