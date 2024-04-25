import React, { useState } from "react";
import updateVenue from "../../utils/UpdateVenue.js";
import updateActivity from "../../utils/UpdateActivity.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fetchActivities from "utils/MyActivities.js";
import Popup from "components/PopUpModel.js";

const EditModal = ({ fields, initialValues, onClose, type }) => {
  const [formData, setFormData] = useState(initialValues);
  const [error, setError] = useState(null);
  const [popup, setPopup] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // If the input type is checkbox, update the formData based on whether it's checked or not
    const newValue =
      type === "checkbox" ? (checked ? "available" : "unavailable") : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === "venue") {
        const venueId = localStorage.getItem("venueID");
        const response = await updateVenue(venueId, formData);
        toast.success("Venue updated successfully");
        console.log("Venue updated successfully" + response);
      } else if (type === "activity") {
        const activityId = localStorage.getItem("activityID");
        await updateActivity(activityId, formData);
        toast.success("Activity updated successfully");
        console.log("Activity updated successfully");
        setError("Activity updated successfully");
        showNotification("success", "Activity updated successfully.");
        // alert("Activity updated successfully")
      }

      window.location.reload();
      fetchActivities();
      setError("Activity updated successfully");
      showNotification("success", "Activity updated successfully.");
      onClose();
    } catch (error) {
      setError(error.message);
      toast.success("Something Went wrong try again");
    }
  };

  const showNotification = (type, message) => {
    setPopup({ type, message });
    setTimeout(() => {
      setPopup(null);
    }, 2000);
  };

  //if type is venue then show venue name, description, location and available check box
  return (
    <div className="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-gray-500 tw-bg-opacity-75 tw-z-50">
      <div className="tw-bg-white tw-p-6 tw-rounded-lg tw-shadow-lg tw-max-w-lg tw-w-full">
        <h2 className="tw-text-lg tw-font-semibold tw-mb-4">Edit Data</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div className="tw-mb-4" key={field.name}>
              <label
                htmlFor={field.name}
                className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
              >
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border-gray-300 tw-shadow-sm tw-focus:ring-blue-500 tw-focus:border-blue-500 tw-sm:text-sm"
              />
              {type === "venue" && field.name === "availability" && (
                <div className="tw-mt-1">
                  <input
                    type="checkbox"
                    id="availability"
                    name="availability"
                    checked={formData.availability === "available"}
                    onChange={handleChange}
                    className="tw-mr-1"
                  />
                  <label
                    htmlFor="availability"
                    className="tw-text-sm tw-text-gray-700"
                  >
                    Availability
                  </label>
                </div>
              )}
            </div>
          ))}

          {error && <p className="tw-text-red-500">{error}</p>}
          <div className="tw-flex tw-justify-end">
            <button
              type="button"
              onClick={onClose}
              className="tw-mr-2 tw-py-2 tw-px-4 tw-bg-gray-200 tw-text-gray-700 tw-rounded-md tw-hover:bg-gray-300 tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="tw-py-2 tw-px-4 tw-bg-blue-600 tw-text-white tw-rounded-md tw-hover:bg-blue-700 tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
        <ToastContainer />
        {popup && (
          <Popup
            type={popup.type}
            message={popup.message}
            onClose={() => setPopup(null)}
          />
        )}
      </div>
    </div>
  );
};

export default EditModal;
