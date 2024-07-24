import React, { useState, useEffect } from "react";
import StarRating from "../common/StarRating";

/** ReviewForm component
 *
 * A form for editing an existing review with a text and star rating.
 *
 */

const ReviewForm = ({ review, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    reviewText: review.reviewText,
    rating: review.rating,
  });

  useEffect(() => {
    setFormData({
      reviewText: review.reviewText,
      rating: review.rating,
    });
  }, [review]);

  /** Handle form input changes */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  /** Handle form submission */
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSave(review.reviewId, formData);
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit" className="btn btn-primary me-2">
        Save
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default ReviewForm;
