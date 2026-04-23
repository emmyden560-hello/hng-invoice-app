import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const BaseInput = forwardRef(({ label, error, className = '', ...props }, ref) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <div className="flex justify-between">
                <label className={`text-body-1 font-medium ${error ? 'text-danger' : 'text-text-secondary dark:text-[#DFE3FA]'}`}>
                    {label}
                </label>
                {error && <span className="text-xs font-semibold text-danger">can&apos;t be empty</span>}
            </div>

            <input
                ref={ref}
                className={`
          w-full px-5 py-4 rounded text-heading-s-variant font-bold 
          bg-white dark:bg-dark-input border 
          outline-none transition-colors duration-200
          text-text-primary dark:text-white
          
          /* --- THE HOVER & FOCUS LOGIC --- */
          ${error
                        ? 'border-danger'
                        : 'border-light-border dark:border-dark-input hover:border-primary focus:border-primary'}
        `}
                {...props}
            />
        </div>
    );
});

BaseInput.displayName = 'BaseInput';

BaseInput.propTypes = {
    label: PropTypes.string,
    error: PropTypes.object,
    className: PropTypes.string,
};

export default BaseInput;
