import React, { useState } from 'react';
import updateVenue from '../../utils/UpdateVenue.js';
import updateActivity from '../../utils/UpdateActivity.js'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditModal = ({ fields, initialValues, onClose, type }) => { 
  const [formData, setFormData] = useState(initialValues);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === 'venue') {
        const venueId = localStorage.getItem('venueID');
        await updateVenue(venueId, formData);
        toast.success("Venue updated successfully");
        console.log("Venue updated successfully");
      } else if (type === 'activity') {
        const activityId = localStorage.getItem('activityID');
        await updateActivity(activityId, formData);
        toast.success("Activity updated successfully");
        console.log("Activity updated successfully");
      }
      window.location.reload();
      onClose();
    } catch (error) {
      setError(error.message);
      // toast.success("Something Went wrong try again");

    }
  };

  return (
    <div className="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-gray-500 tw-bg-opacity-75 tw-z-50">
      <div className="tw-bg-white tw-p-6 tw-rounded-lg tw-shadow-lg tw-max-w-lg tw-w-full">
        <h2 className="tw-text-lg tw-font-semibold tw-mb-4">Edit Data</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div className="tw-mb-4" key={field.name}>
              <label htmlFor={field.name} className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">{field.label}</label>
              <input type={field.type || "text"} id={field.name} name={field.name} value={formData[field.name]} onChange={handleChange} className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border-gray-300 tw-shadow-sm tw-focus:ring-blue-500 tw-focus:border-blue-500 tw-sm:text-sm" />
            </div>
          ))}
          {error && <p className="tw-text-red-500">{error}</p>}
          <div className="tw-flex tw-justify-end">
            <button type="button" onClick={onClose} className="tw-mr-2 tw-py-2 tw-px-4 tw-bg-gray-200 tw-text-gray-700 tw-rounded-md tw-hover:bg-gray-300 tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-gray-500">Cancel</button>
            <button type="submit" className="tw-py-2 tw-px-4 tw-bg-blue-600 tw-text-white tw-rounded-md tw-hover:bg-blue-700 tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-blue-500">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
