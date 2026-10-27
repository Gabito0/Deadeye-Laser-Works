import React, { useContext, useState, useEffect } from "react";
import UserContext from "../auth/UserContext";
import AdminServiceCard from "./AdminServiceCard";
import AddServiceForm from "./AdminAddServiceForm";
import DeadEyeLaserWorksApi from "../api/api";

/** AdminServiceList component
 *
 * Renders a list of services that admin users can manage. Allows adding, editing,
 * and deleting services, and toggling their active status.
 */

const AdminServiceList = () => {
  const { services, setServices } = useContext(UserContext);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    /** Fetches the list of all services from the API */
    const fetchServices = async () => {
      try {
        const fetchedServices = await DeadEyeLaserWorksApi.getAllServices();
        setServices(fetchedServices);
      } catch (err) {
        console.error("AdminServiceList fetchServices: problem loading", err);
      }
    };

    fetchServices();
  }, [setServices]);

  /** Handles adding a new service to the list */
  const handleServiceAdd = (newService) => {
    setServices([...services, newService]);
    setShowAddForm(false);
  };

  /** Handles updating an existing service in the list */
  const handleServiceUpdate = (updatedService) => {
    setServices(
      services.map((service) =>
        service.serviceId === updatedService.serviceId
          ? updatedService
          : service
      )
    );
  };

  /** Handles deleting a service from the list */
  const handleServiceDelete = (serviceId) => {
    setServices(services.filter((service) => service.serviceId !== serviceId));
  };

  return (
    <div className="container py-5 ">
      <h1 className="text-center mb-4">Manage Services</h1>
      <button
        className="btn btn-primary mb-4 rounded"
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? "Cancel" : "New Service"}
      </button>
      {showAddForm && (
        <AddServiceForm
          onServiceAdd={handleServiceAdd}
          onCancel={() => setShowAddForm(false)}
        />
      )}
      {services && services.length > 0 ? (
        <div className="row">
          {services.map((service) => (
            <AdminServiceCard
              key={service.serviceId}
              service={service}
              onServiceUpdate={handleServiceUpdate}
              onServiceDelete={handleServiceDelete}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">Sorry, no current services available</p>
      )}
    </div>
  );
};

export default AdminServiceList;
