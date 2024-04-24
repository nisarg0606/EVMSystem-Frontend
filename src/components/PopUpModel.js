import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

const Popup = ({ type, message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleDismiss = () => {
    setVisible(false);
    onClose();
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'error':
        return 'tw-bg-red-100';
      case 'success':
        return 'tw-bg-green-100';
      case 'warning':
        return 'tw-bg-yellow-100';
      case 'alert':
        return 'tw-bg-blue-100';
      default:
        return 'tw-bg-gray-100';
    }
  };

  const popupClasses = classNames(
    'tw-fixed',
    'tw-top-0',
    'tw-right-0',
    'tw-m-4',
    'tw-z-50',
    'tw-transition-opacity',
    'tw-duration-500',
    {
      'tw-opacity-100': visible,
      'tw-opacity-0': !visible,
    }
  );

  return (
    <div className={popupClasses}>
      <div className={`tw-rounded-md tw-shadow-lg tw-max-w-md ${getBackgroundColor()} tw-border tw-border-${type}-400 tw-text-${type}-700 tw-transition-transform tw-transform tw-duration-500 tw-ease-out`}>
        <div className="tw-p-4">
          <div className="tw-flex tw-items-center tw-justify-between">
            <div className="tw-flex-1 tw-flex">
              <svg
                className={`tw-h-6 tw-w-6 tw-text-${type}-400`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <p className="tw-ml-3 tw-font-medium">{message}</p>
            </div>
            <div className="tw-ml-4 tw-flex-shrink-0 tw-flex">
              <button
                className={`tw-text-${type}-400 focus:tw-outline-none focus:tw-text-${type}-500`}
                onClick={handleDismiss}
              >
                <svg
                  className="tw-h-5 tw-w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.293 7.293a1 1 0 0 0-1.414 1.414L10.586 10l-1.707 1.707a1 1 0 1 0 1.414 1.414L12 11.414l1.707 1.707a1 1 0 0 0 1.414-1.414L13.414 10l1.707-1.707a1 1 0 0 0-1.414-1.414L12 8.586 10.293 7.293a1 1 0 0 0-1.414 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
