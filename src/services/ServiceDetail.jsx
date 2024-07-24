import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DeadEyeLaserWorksApi from "../api/api";
import StarRating from "../common/StarRating";
import ReviewForm from "../review/ReviewForm";
import AddReviewForm from "../review/AddReviewForm";
import UserContext from "../auth/UserContext";
import LoadingSpinner from "../common/LoadingSpinner";

/** ServiceDetail Component
 *
 * Renders the details of a specific service, including its description, price, and reviews.
 */

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const { currentUser } = useContext(UserContext);
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editReviewId, setEditReviewId] = useState(null);
  const [addReview, setAddReview] = useState(false);

  useEffect(() => {
    const getCurrentService = async () => {
      try {
        let currentService = await DeadEyeLaserWorksApi.getService(serviceId);
        setService(currentService);
      } catch (err) {
        console.error("ServiceDetail loadServiceInfo: problem loading", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const getServiceReviews = async () => {
      try {
        let reviews = await DeadEyeLaserWorksApi.getServiceReviews(serviceId);
        setReviews(reviews);
      } catch (err) {
        console.error("ServiceDetail getServiceReviews: problem loading", err);
        setError(err);
      }
    };

    getCurrentService();
    getServiceReviews();
  }, [serviceId]);

  const handleEdit = (reviewId) => {
    setEditReviewId(reviewId);
  };

  const handleSave = async (reviewId, formData) => {
    try {
      await DeadEyeLaserWorksApi.updateReview(
        reviewId,
        currentUser.username,
        formData
      );
      const updatedReviews = await DeadEyeLaserWorksApi.getServiceReviews(
        serviceId
      );
      setReviews(updatedReviews);
      setEditReviewId(null);
    } catch (err) {
      console.error("ServiceDetail handleSave: problem saving", err);
    }
  };

  const handleCancel = () => {
    setEditReviewId(null);
  };

  const handleAddReviewSave = async (formData) => {
    try {
      const reviewData = {
        userId: currentUser.id,
        serviceId: +serviceId,
        reviewText: formData.reviewText,
        rating: +formData.rating,
      };
      await DeadEyeLaserWorksApi.addReview(currentUser.username, reviewData);
      const updatedReviews = await DeadEyeLaserWorksApi.getServiceReviews(
        serviceId
      );
      setReviews(updatedReviews);
      setAddReview(false);
    } catch (err) {
      console.error("ServiceDetail handleAddReviewSave: problem saving", err);
    }
  };

  const handleAddReviewCancel = () => {
    setAddReview(false);
  };

  const handleDelete = async (reviewId) => {
    try {
      await DeadEyeLaserWorksApi.deleteReview(reviewId, currentUser.username);
      const updatedReviews = await DeadEyeLaserWorksApi.getServiceReviews(
        serviceId
      );
      setReviews(updatedReviews);
    } catch (err) {
      console.error("ServiceDetail HandleDelete: problem deleting", err);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <p className="text-primary text-center display-6">
        There was an error loading the service details.
      </p>
    );

  return (
    <div className="container py-5">
      <div className="card shadow-lg mb-4 rounded">
        <div className="card-body">
          {service ? (
            <>
              <h1 className="card-title">{service.title}</h1>
              <p className="card-text">{service.description}</p>
              <p className="card-text">
                <strong>Price:</strong> ${service.price}
              </p>
              {currentUser && (
                <Link
                  to={`/services/${serviceId}/add-user-service`}
                  className="btn btn-primary mt-3 rounded"
                >
                  Add this Service
                </Link>
              )}
            </>
          ) : (
            <p>Service not found.</p>
          )}
        </div>
      </div>

      <h2 className="my-4">Reviews</h2>
      {currentUser && (
        <div className="mb-4">
          <button
            className="btn btn-primary rounded"
            onClick={() => setAddReview(true)}
          >
            Add Review
          </button>
        </div>
      )}
      {addReview && (
        <AddReviewForm
          onSave={handleAddReviewSave}
          onCancel={handleAddReviewCancel}
        />
      )}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div className="card my-3 rounded" key={review.reviewId}>
            {editReviewId === review.reviewId ? (
              <ReviewForm
                review={review}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <div className="card-body position-relative">
                <div className="d-flex justify-content-between">
                  <div>
                    <h5 className="card-title">{review.firstName}</h5>
                    <p className="card-text">{review.reviewText}</p>
                    <p className="card-text">
                      <strong>Rating:</strong>{" "}
                      <StarRating rating={review.rating} />
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        Posted on {new Date(review.time).toLocaleDateString()}
                      </small>
                    </p>
                  </div>
                  {((currentUser && currentUser.username === review.username) ||
                    (currentUser && currentUser.status === "admin")) && (
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id={`dropdownMenuButton${review.reviewId}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Options
                      </button>
                      <ul
                        className="dropdown-menu dropdown-menu-end rounded"
                        aria-labelledby={`dropdownMenuButton${review.reviewId}`}
                      >
                        {currentUser &&
                          currentUser.username === review.username && (
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => handleEdit(review.reviewId)}
                              >
                                Edit
                              </button>
                            </li>
                          )}
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handleDelete(review.reviewId)}
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-primary text-center display-6">
          No reviews available.
        </p>
      )}
    </div>
  );
};

export default ServiceDetail;
