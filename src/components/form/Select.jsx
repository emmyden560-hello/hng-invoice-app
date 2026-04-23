import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { HiChevronDown } from 'react-icons/hi2';

export default function Select({ label, value, options, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedLabel = options.find(opt => opt.value === value)?.label || value;

    return (
        <div className="flex flex-col gap-2 relative" ref={containerRef}>
            <label className="text-body-1 font-medium text-text-secondary dark:text-[#DFE3FA]">
                {label}
            </label>

            {/* --- TRIGGER BUTTON --- */}
            <div
                className={`
          w-full px-5 py-4 rounded text-heading-s-variant font-bold 
          bg-white dark:bg-dark-input border border-light-border dark:border-dark-input
          flex justify-between items-center cursor-pointer
          hover:border-primary transition-colors duration-200
          ${isOpen ? 'border-primary' : ''}
        `}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-text-primary dark:text-white">{selectedLabel}</span>
                <HiChevronDown className={`text-primary font-bold transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* --- DROPDOWN LIST --- */}
            <div className={`
        absolute top-[85px] left-0 w-full z-20
        bg-white dark:bg-dark-dropdown shadow-xl rounded-lg overflow-hidden
        transition-all duration-200 origin-top
        ${isOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-0 invisible'}
      `}>
                {options.map((option, index) => (
                    <div
                        key={option.value}
                        onClick={() => {
                            onChange(option.value);
                            setIsOpen(false);
                        }}
                        className={`
              px-6 py-4 cursor-pointer text-heading-s-variant font-bold
              border-light-border dark:border-[#1E2139] last:border-0
              text-text-primary dark:text-white
              
              /* HOVER EFFECT: Text turns Purple */
              hover:text-primary dark:hover:text-[#9277FF] transition-colors
            `}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
        </div>
    );
}

Select.propTypes = {
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
};
