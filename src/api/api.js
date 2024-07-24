import axios from "axios";

// const BASE_URL = "http://localhost:3001";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
// console.log(BASE_URL);

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class DeadEyeLaserWorksApi {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${DeadEyeLaserWorksApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get the current user. */
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /**
   *
   *
   * Data can include:
   *   { firstName, lastName, password, email, birthDate, isActive }
   *
   * Returns { username, firstName, lastName, email, birthDate, isActive }
   *
   * Authorization required: correct user or admin
   */
  static async updateUserProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "put");
    return res.user;
  }

  /** Delete a user. */
  static async deleteUser(username) {
    let res = await this.request(`users/${username}`, {}, "delete");
    return res.deleted;
  }

  /** Deactivate a user. */
  static async deactivateUser(username) {
    let res = await this.request(`users/${username}/deactivate`, {}, "patch");
    return res.user;
  }

  /** Activate a user. */
  static async activateUser(username) {
    let res = await this.request(`users/${username}/activate`, {}, "patch");
    return res.user;
  }

  /** Get token for login from username, password. */
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site. */
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Send verification email */
  static async sendVerificationEmail(username, email) {
    return await this.request(
      `auth/send-verification/${username}`,
      { email },
      "post"
    );
  }

  /** Confirm user email. */
  static async confirmEmail(token) {
    let res = await this.request(`auth/confirmation/${token}`);
    return res.user;
  }

  // User Services API routes

  /** Get all services associated with a specific user. */
  static async getUserServices(username) {
    let res = await this.request(`user-services/${username}`);
    return res.userServices;
  }

  /**
   *
   *
   * Adds a service to a user.
   *
   * Request body:
   *   { username, serviceId, confirmedPrice, additionInfo }
   *
   * Returns:
   *   { userService:
   *      { userServiceId, userId, serviceId, confirmedPrice, isCompleted, additionInfo } }
   *
   * Authorization required: correct user or admin
   */
  static async addUserService(
    username,
    serviceId,
    confirmedPrice,
    additionInfo
  ) {
    let data = { username, serviceId, confirmedPrice, additionInfo };
    let res = await this.request(`user-services/${username}`, data, "post");
    return res.userService;
  }

  /**
   *
   *
   * Marks a user service as completed and updates the fulfilled date to the current date.
   *
   * Path parameters:
   *   - username: The username of the user whose service is to be marked complete.
   *   - userServiceId: The ID of the user service to be marked complete.
   *
   * Response format:
   *   {
   *     userService: {
   *       userServiceId,
   *       userId,
   *       serviceId,
   *       confirmedPrice,
   *       isCompleted,
   *       additionInfo,
   *       confirmationCode,
   *       requestedDate,
   *       fulfilledDate
   *     }
   *   }
   *
   * Authorization required: admin
   */
  static async completeUserService(username, userServiceId) {
    let res = await this.request(
      `user-services/${username}/complete/${userServiceId}`,
      {},
      "patch"
    );
    return res.userService;
  }

  /**
   *
   *
   * Updates the price of a user's service to a new value.
   *
   * Request body:
   *   { price: newPrice }
   *
   * Path parameters:
   *   - username: The username of the user whose service price is to be updated.
   *   - userServiceId: The ID of the user service to be updated.
   *
   * Response format:
   *   { result: { userServiceId, userId, serviceId, confirmedPrice, isCompleted, additionInfo } }
   *
   * Authorization required: admin
   */
  static async updateUserServicePrice(username, userServiceId, price) {
    let data = { price };
    let res = await this.request(
      `user-services/${username}/price/${userServiceId}`,
      data,
      "patch"
    );
    return res.result;
  }

  // Service API routes

  /** Get all services. */
  static async getAllServices() {
    let res = await this.request(`services`);
    return res.services;
  }

  /** Get details of a specific service by its ID. */
  static async getService(serviceId) {
    let res = await this.request(`services/${serviceId}`);
    return res.service;
  }

  static async addService(data) {
    let res = await this.request(`services`, data, "post");
    return res.service;
  }

  /** Get all reviews for a specific service by its ID. */
  static async getServiceReviews(serviceId) {
    let res = await this.request(`services/${serviceId}/reviews`);
    return res.reviews;
  }

  /** Activate a specific service by its ID. */
  static async activateService(serviceId) {
    let res = await this.request(`services/${serviceId}/activate`, {}, "patch");
    return res.service;
  }

  /** Deactivate a specific service by its ID. */
  static async deactivateService(serviceId) {
    let res = await this.request(
      `services/${serviceId}/deactivate`,
      {},
      "patch"
    );
    return res.service;
  }

  /**
   *
   *
   * Updates details of a specific service by its ID.
   *
   * Path parameters:
   *   - serviceId: The ID of the service to update.
   *
   * Request body should contain:
   *   - title(required): The new title of the service.
   *   - description(required): The new description of the service.
   *   - price(required): The new price of the service.
   *   - isActive(required): The new active status of the service.
   *
   * Response format:
   *   {
   *     service: {
   *       serviceId,
   *       title,
   *       description,
   *       price,
   *       isActive
   *     }
   *   }
   *
   * Authorization required: admin
   */
  static async updateService(serviceId, data) {
    let res = await this.request(`services/${serviceId}`, data, "patch");
    return res.service;
  }

  /** Delete a specific service by its ID. */
  static async deleteService(serviceId) {
    let res = await this.request(`services/${serviceId}`, {}, "delete");
    return res.deleted;
  }

  // Review API routes

  /** Get a specific review by its ID. */
  static async getReview(reviewId) {
    let res = await this.request(`reviews/${reviewId}`);
    return res.review;
  }

  /**
   *
   *
   * Adds a new review.
   *
   * Path parameters:
   *   - username: The username of the user adding the review.
   *
   * Request body:
   *   {
   *     userId(require): number,
   *     serviceId(require): number,
   *     reviewText(require): string,
   *     rating(require): number
   *   }
   *
   * Response format:
   *   {
   *     review: {
   *       reviewId,
   *       userId,
   *       serviceId,
   *       reviewText,
   *       rating,
   *       time
   *     }
   *   }
   *
   * Authorization required: correct user or admin
   */
  static async addReview(username, data) {
    let res = await this.request(`reviews/${username}`, data, "post");
    return res.review;
  }

  /** Update a review. */
  static async updateReview(reviewId, username, data) {
    let res = await this.request(
      `reviews/${reviewId}/${username}`,
      data,
      "patch"
    );
    return res.review;
  }

  /** Delete a review. */
  static async deleteReview(reviewId, username) {
    let res = await this.request(
      `reviews/${reviewId}/${username}`,
      {},
      "delete"
    );
    return res.deleted;
  }

  static async getAllUsersServices() {
    let res = await this.request(`user-services`, {}, "get");
    return res.userServices;
  }
}

export default DeadEyeLaserWorksApi;
