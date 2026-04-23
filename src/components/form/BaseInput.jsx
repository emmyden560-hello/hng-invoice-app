import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const BaseInput = forwardRef(({ label, error, className = "", ...props }, ref) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {/* 1. Label: Body 1 / Text Secondary */}
            {label && (
                <label className="text-body-1 text-text-secondary flex justify-between">
                    {label}
                    {/* Optional: Render error text inside label row if you want compact layout */}
                    {error && <span className="text-danger text-[10px] font-bold">{error}</span>}
                </label>
            )}

            {/* 2. Input Field */}
            <input
                ref={ref}
                className={`
          w-full px-5 py-4 rounded
          text-heading-s-variant font-bold
          bg-white dark:bg-dark-input
          text-text-primary dark:text-white
          border border-light-hover dark:border-dark-input
          
          /* Focus State: The "Active" purple border from design */
          focus:outline-none focus:border-primary
          
          /* Error State: Red border */
          ${error ? 'border-danger' : ''}
          
          transition-colors duration-200
        `}
                {...props}
            />
        </div>
    );
});

BaseInput.displayName = 'BaseInput';
BaseInput.propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    className: PropTypes.string,
};

export default BaseInput;
