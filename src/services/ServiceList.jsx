import React, { useContext, useEffect, useState } from "react";
import UserContext from "../auth/UserContext";
import ServiceCard from "./ServiceCard";
import DeadEyeLaserWorksApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";

/** ServiceList Component
 *
 * Displays a list of active services offered by DeadEye Laser Works.
 */

const ServiceList = () => {
  const { services, setServices } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        let fetchedServices = await DeadEyeLaserWorksApi.getAllServices();
        setServices(fetchedServices);
        setLoading(false);
      } catch (err) {
        console.error("ServiceList fetchServices: problem loading", err);
        setError(err);
        setLoading(false);
      }
    }
    fetchServices();
  }, [setServices]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <p className="text-primary text-center display-6">
        There was an error loading the services.
      </p>
    );

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Our Services</h1>
      {services && services.length > 0 ? (
        <div className="row">
          {services.map(
            (service) =>
              service.isActive && (
                <div
                  className="col-lg-4 col-md-6 mb-4"
                  style={{ height: "60vh" }}
                  key={service.serviceId}
                >
                  <ServiceCard
                    serviceId={service.serviceId}
                    title={service.title}
                    description={service.description}
                    price={service.price}
                  />
                </div>
              )
          )}
        </div>
      ) : (
        <p className="text-center">Sorry, no current services available</p>
      )}
    </div>
  );
};

export default ServiceList;
