import PropTypes from 'prop-types';
import { HiCheck } from 'react-icons/hi2';

export default function Checkbox({ label, checked, onChange }) {
    return (
        <label className="flex items-center cursor-pointer group select-none">
            {/* Hidden Real Input */}
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="hidden"
            />

            {/* Custom Visual Box */}
            <div className={`
        w-4 h-4 rounded-sm border flex items-center justify-center transition-all duration-200 mr-3
        ${checked
                    ? 'bg-primary border-primary'
                    : 'bg-light-bg dark:bg-dark-input border-transparent group-hover:border-primary'}
      `}>
                {checked && <HiCheck className="text-white text-xs font-bold" />}
            </div>

            {/* Label Text */}
            <span className="text-heading-s-variant font-bold text-text-primary dark:text-white capitalize">
                {label}
            </span>
        </label>
    );
}

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};
