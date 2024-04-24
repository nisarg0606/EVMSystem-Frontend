import React, { useState } from 'react';
import classNames from 'classnames';

const CardMain = ({ imageSrc, title, description, Capacity, availability, activityType, location ,venueOwner,venueOwnerEmail}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="tw-min-w-lg bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 tw-flex tw-h-full overflow-hidden hover:shadow-lg tw-mb-4 relative">

      <div className="tw-flex-shrink-0 tw-relative">
        <img className="tw-object-cover tw-w-32 tw-h-full" src={imageSrc} alt="" />
      </div>

      <div className="tw-p-4 tw-flex-1 tw-flex tw-flex-col tw-justify-between">
        <div>
          <h5 className="tw-mb-2 tw-text-lg tw-font-semibold tw-tracking-tight tw-text-gray-900 dark:text-white">{title}</h5>
          <div className="tw-flex tw-items-center">
  {/* Render either Availability Tag or Activity Type Tag */}
  {availability && !activityType && (
    <span
      className={classNames(
        'tw-py-0.5 tw-px-2 tw-text-xs tw-font-medium tw-rounded-full text-white',
        { 'tw-bg-green-500': availability === 'available', 'tw-bg-red-500': availability === 'unavailable' }
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
          <p className={classNames(
            'tw-text-sm tw-text-gray-700 dark:text-gray-400',
            { 'tw-h-0 tw-overflow-hidden': !expanded }
          )}>{description}</p>
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
        </div>
        <div className="tw-flex tw-justify-end">
          <button
            className={classNames(
              'tw-inline-flex tw-items-center tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-center tw-text-white tw-bg-blue-700 tw-rounded-lg tw-hover:bg-blue-800 tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
              { 'tw-transform rotate-180': expanded }
            )}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Read less' : 'Read more'}
            <svg className="tw-w-3.5 tw-h-3.5 tw-ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardMain;
