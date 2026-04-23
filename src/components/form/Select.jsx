import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { HiChevronDown } from 'react-icons/hi2';

export default function Select({ label, value, options, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Close dropdown if clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Find the label for the current value (e.g., value "30" -> "Net 30 Days")
    const selectedLabel = options.find(opt => opt.value === value)?.label || value;

    return (
        <div className="flex flex-col gap-2 relative" ref={containerRef}>
            {label && <label className="text-body-1 text-text-secondary">{label}</label>}

            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`
          w-full px-5 py-4 rounded flex justify-between items-center
          text-heading-s-variant font-bold
          bg-white dark:bg-dark-input
          text-text-primary dark:text-white
          border 
          ${isOpen ? 'border-primary' : 'border-light-hover dark:border-dark-input'}
          focus:outline-none
          transition-colors duration-200
        `}
            >
                {selectedLabel}
                <HiChevronDown className="text-primary font-bold text-lg" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-[85px] w-full z-50 rounded-lg shadow-xl overflow-hidden bg-white dark:bg-dark-input">
                    {options.map((option, index) => (
                        <div
                            key={option.value}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                            className={`
                px-6 py-4 cursor-pointer
                text-heading-s-variant font-bold
                text-text-primary dark:text-text-secondary
                hover:text-primary dark:hover:text-white
                border-b border-light-hover dark:border-dark-card last:border-0
                transition-colors duration-200
              `}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

Select.propTypes = {
    label: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.any
    })).isRequired,
};
