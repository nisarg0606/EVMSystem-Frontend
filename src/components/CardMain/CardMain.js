import React, { useState, useLayoutEffect } from "react";
import classNames from "classnames";
import EditModal from "../CardMain/EditModel.js";
import { Button, Container } from "reactstrap";
import DeleteVenue from "../../utils/DeleteVenue.js";
import DeleteActivity from "../../utils/DeleteActivity.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShowBookingModel from "../../components/CardMain/ShowBookingModel.js";
import BookingModal from "../../components/CardMain/ShowBookingModel.js";
import BookSlotModel from "./ShowBookSlotModel.js";
import BookActivityModel from "./ShowBookingActivityModel.js";
import Popup from "components/PopUpModel.js";
import Download from "views/IndexSections/Download.js";
import CsvDownloadModel from "../../components/CardMain/CsvDownloadModel.js";

const CardMain = ({
  id,
  imageSrc,
  title,
  description,
  Capacity,
  availability,
  activityType,
  location,
  venueOwner,
  venueOwnerEmail,
  cardType,
  date,
  price,
  start_time,
  end_time,
  status,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showBookingSlot, setShowBookingSlot] = useState(false);
  const [ShowBookingActivity, setshowBookingActivity] = useState(false);
  const [DownloadCSVParticipents, setdownloadCSVParticipents] = useState(false);
  const token = localStorage.getItem("token");
  const [isMobile, setIsMobile] = useState(false);
  const [venueId, setVenueId] = useState("");
  const userRole = localStorage.getItem("role");
  const [popup, setPopup] = useState(null);
  const [error, setError] = useState(null);

  const fields = [
    { name: "name", label: "Title" },
    { name: "description", label: "Description" },
    { name: "location", label: "location" },
    { name: "availability", label: "Availability" },
  ];

  const handleEdit = async (id, type) => {
    setShowEditModal(true);
    if (type === "activity") {
      localStorage.setItem("activityID", id);
      console.log("Activity ID set:", id);
    } else if (type === "venue") {
      localStorage.setItem("venueID", id);
      console.log("Venue ID set:", id);
    }
  };

  const handleShowBooking = async (id, type) => {
    setShowBookingModal(true);
    if (type === "venue") {
      localStorage.setItem("venueID", id);
      console.log("Venue ID set:", id);
    }
  };

  const handleCloseShowBookingModal = () => {
    setShowBookingModal(false);
    localStorage.removeItem("venueID");
  };

  const handleBookSlot = async (id, type) => {
    setShowBookingSlot(true);
    if (type === "venue") {
      localStorage.setItem("venueID", id);
      console.log("Venue ID set:", id);
    }
  };

  const handleBookActivity = async (id, type, price) => {
    setshowBookingActivity(true);
    if (type === "activity") {
      localStorage.setItem("activityID", id);
      localStorage.setItem("price", price);
      console.log("activityid ID set:", id);
    }
  };

  const handleCsvDownload = (id) => {
    setdownloadCSVParticipents(true);
    localStorage.setItem("activityID", id);
  };

  const handleScvDownloadClose = () => {
    setshowBookingActivity(false);
    localStorage.removeItem("activityID");
  };

  const handleCloseShowBookingActivity = () => {
    setshowBookingActivity(false);
    localStorage.removeItem("activityID");
  };

  const handleCloseShowBookSlot = () => {
    setShowBookingSlot(false);
    localStorage.removeItem("venueID");
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    localStorage.removeItem("venueID");
    localStorage.removeItem("activityID");
  };

  const handleDelete = async (id, isVenue) => {
    try {
      let response;
      if (isVenue) {
        response = await DeleteVenue(id);
        console.log("Venue Deleted");
        toast.success("Venue deleted successfully");
      } else {
        response = await DeleteActivity(id);
        console.log("Activity Deleted");
        toast.success("Activity deleted successfully");
        setError("Activity deleted successfully");
        showNotification("success", "Activity deleted successfully");
      }
      // wait for 2 seconds before reloading the page
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      if (isVenue) {
        console.log("Venue Deleting failed.");
        toast.error("Failed to delete venue: " + error.message);
      } else {
        console.log("DeleteActivity Deleting failed.");
        toast.error("Failed to delete activity: " + error.message);
      }
    }
  };

  const initialValues = {
    name: title,
    description: description,
    location: location,
    availability: availability,
    id: venueId,
  };

  useLayoutEffect(() => {
    function updateIsMobile() {
      setIsMobile(window.innerWidth <= 768);
    }

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  const showNotification = (type, message) => {
    setPopup({ type, message });
    setTimeout(() => {
      setPopup(null);
    }, 2000);
  };

  return (
    <Container className="container-lg">
      <div className="tw-bg-white tw-border tw-border-gray-200 tw-rounded-lg tw-shadow-md tw-dark:bg-gray-800 tw-dark:border-gray-700 tw-flex tw-min-h-full overflow-hidden hover:tw-shadow-lg tw-mb-4 tw-relative">
        {popup && (
          <Popup
            type={popup.type}
            message={popup.message}
            onClose={() => setPopup(null)}
          />
        )}
        {!isMobile && (
          <div className="tw-flex-shrink-0 tw-relative">
            <img
              className="tw-object-cover tw-w-32 tw-h-full"
              src={imageSrc}
              alt=""
            />
          </div>
        )}

        <div className="tw-p-4 tw-flex-1 tw-flex tw-flex-col tw-justify-between">
          <div>
            <div className="tw-flex tw-justify-between tw-items-center">
              <h5 className="tw-mb-2 tw-text-lg tw-font-semibold tw-tracking-tight tw-text-gray-900 dark:text-white">
                {title}
              </h5>
              <div className="tw-flex tw-justify-between tw-items-center">
                {cardType === "venue" && (
                  <>
                    {userRole !== "customer" && token && (
                      <>
                        <Button onClick={() => handleShowBooking(id, "venue")}>
                          Show booking
                        </Button>
                      </>
                    )}
                  </>
                )}

                {cardType === "venue" && token && (
                  <Button onClick={() => handleBookSlot(id, "venue")}>
                    Book slot
                  </Button>
                )}

                {userRole === "customer" && (
                  <>
                    {cardType === "activity" && (
                      <Button
                        onClick={() =>
                          handleBookActivity(id, "activity", price)
                        }
                      >
                        Book activity
                      </Button>
                    )}
                  </>
                )}
                {userRole === "venueOwner/eventPlanner" && (
                  <>
                    {cardType === "activity" && (
                      <Button onClick={() => handleCsvDownload(id, "activity")}>
                        Download Csv of Participants
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="tw-flex tw-items-center">
              {/* Render either Availability Tag or Activity Type Tag */}
              {availability && !activityType && (
                <span
                  className={classNames(
                    "tw-py-0.5 tw-px-2 tw-text-xs tw-font-medium tw-rounded-full text-white",
                    {
                      "tw-bg-green-500": availability === "available",
                      "tw-bg-red-500": availability === "unavailable",
                    }
                  )}
                >
                  {availability}
                </span>
              )}

              {activityType && !availability && (
                <div className=" tw-top-2 tw-right-2 tw-text-xs tw-font-medium tw-rounded-full text-white tw-bg-green-500 tw-px-2 tw-py-0.5">
                  {activityType}
                </div>
              )}
            </div>

            <br></br>
            <p
              className={classNames(
                "tw-text-sm tw-text-gray-700 dark:text-gray-400",
                { "tw-h-0 tw-overflow-hidden": !expanded }
              )}
            >
              {description}
            </p>
            <br></br>
            {expanded && Capacity && (
              <div className="tw-text-sm tw-text-gray-700 dark:text-gray-400">
                Capacity: {Capacity}
              </div>
            )}
            {expanded && location && (
              <div className="tw-text-sm tw-text-gray-700 dark:text-gray-400">
                location: {location}
              </div>
            )}
            <br></br>
            {expanded && venueOwner && (
              <div className="tw-text-sm tw-text-gray-700 dark:text-gray-400">
                {venueOwner}
              </div>
            )}
            {expanded && venueOwnerEmail && (
              <div className="tw-text-sm tw-text-gray-700 dark:text-gray-400">
                {venueOwnerEmail}
              </div>
            )}
            {expanded && date && (
              <div className="tw-text-sm tw-text-gray-700 dark:text-gray-400">
                Date :{date}
              </div>
            )}
            {expanded && price && !activityType && (
              <div className="tw-text-sm tw-text-gray-700 dark:text-gray-400">
                Price per hour : ${price}
              </div>
            )}
            {expanded && price && activityType && (
              <div className="tw-text-sm tw-text-gray-700 dark:text-gray-400">
                Price for the ticket : ${price}
              </div>
            )}
            {expanded && start_time && (
              <div className="tw-text-sm tw-text-gray-700 dark:text-gray-400">
                Start Time :{start_time}
              </div>
            )}
            {expanded && end_time && (
              <div className="tw-text-sm tw-text-gray-700 dark:text-gray-400">
                End Time :{end_time}
              </div>
            )}
            {/* {expanded && status && (
              <div className="tw-text-sm tw-text-gray-700 dark:text-gray-400">
                {status}
              </div>
            )} */}
          </div>

          <div className="tw-flex tw-justify-end">
            <Button
              className={classNames(
                "tw-inline-flex tw-items-center tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-center tw-text-white tw-bg-blue-700 tw-rounded-lg tw-hover:bg-blue-800 tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
                { "tw-transform rotate-180": expanded }
              )}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Read less" : "Read more"}
              <svg
                className="tw-w-3.5 tw-h-3.5 tw-ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Button>

            {userRole !== "customer" && (
              <>
                {token && (
                  <>
                    {cardType === "venue" && (
                      <Button
                        className="tw-ml-2 tw-inline-flex tw-items-center tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-center tw-text-white tw-bg-green-600 tw-rounded-lg tw-hover:bg-green-700 tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-green-300 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-green-800"
                        onClick={() => handleEdit(id, "venue")}
                      >
                        Edit
                      </Button>
                    )}

                    {cardType === "activity" && (
                      <Button
                        className="tw-ml-2 tw-inline-flex tw-items-center tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-center tw-text-white tw-bg-green-600 tw-rounded-lg tw-hover:bg-green-700 tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-green-300 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-green-800"
                        onClick={() => handleEdit(id, "activity")}
                      >
                        Edit
                      </Button>
                    )}

                    {cardType === "venue" && (
                      <Button
                        className="tw-ml-2 tw-inline-flex tw-items-center tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-center tw-text-white tw-bg-red-600 tw-rounded-lg tw-hover:bg-red-700 tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-red-300 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-800"
                        onClick={() => handleDelete(id, true)}
                      >
                        Delete
                      </Button>
                    )}

                    {cardType === "activity" && (
                      <Button
                        className=" tw-ml-2 tw-inline-flex tw-items-center tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-center tw-text-white tw-bg-red-600 tw-rounded-lg tw-hover:bg-red-700 tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-red-300 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-800"
                        onClick={() => handleDelete(id, false)}
                      >
                        Delete
                      </Button>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
        {showEditModal && (
          <EditModal
            fields={fields}
            initialValues={initialValues}
            onClose={handleCloseModal}
            type={cardType}
          />
        )}
        {showBookingModal && (
          <BookingModal
            onClose={handleCloseShowBookingModal}
            id={localStorage.getItem("venueID")}
          />
        )}

        {showBookingSlot && (
          <BookSlotModel
            onClose={handleCloseShowBookSlot}
            id={localStorage.getItem("venueID")}
          />
        )}

        {ShowBookingActivity && (
          <BookActivityModel
            onClose={handleCloseShowBookingActivity}
            id={localStorage.getItem("activityID")}
            InitialPrice={localStorage.getItem("price")}
          />
        )}

        {DownloadCSVParticipents && (
          <CsvDownloadModel
            onClose={handleScvDownloadClose}
            id={localStorage.getItem("activityID")}
          />
        )}
      </div>
      <ToastContainer />
    </Container>
  );
};

export default CardMain;
