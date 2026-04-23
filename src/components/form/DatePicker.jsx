import PropTypes from 'prop-types';
import { HiCalendarDays } from 'react-icons/hi2';
import { format } from 'date-fns';

export default function DatePicker({ label, selected, onChange }) {
    // Convert Date object to YYYY-MM-DD string for input value
    const inputValue = selected ? selected.toISOString().split('T')[0] : '';

    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-body-1 font-medium text-text-secondary dark:text-[#DFE3FA]">
                {label}
            </label>

            <div className="relative group">
                {/* Custom Visual Layer (The "Fake" Input) */}
                <div className="
          w-full px-5 py-4 rounded text-heading-s-variant font-bold 
          bg-white dark:bg-dark-input border border-light-border dark:border-dark-input
          flex justify-between items-center
          group-hover:border-primary transition-colors duration-200
          text-text-primary dark:text-white
        ">
                    <span>{selected ? format(selected, 'd MMM yyyy') : 'Select Date'}</span>
                    <HiCalendarDays className="text-text-secondary" />
                </div>

                {/* Invisible Real Input sitting on top */}
                <input
                    type="date"
                    value={inputValue}
                    onChange={(e) => onChange(new Date(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
            </div>
        </div>
    );
}

DatePicker.propTypes = {
    label: PropTypes.string,
    selected: PropTypes.instanceOf(Date),
    onChange: PropTypes.func.isRequired,
};
