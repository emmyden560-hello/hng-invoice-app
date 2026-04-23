import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HiCalendarDays } from "react-icons/hi2"; // Using HeroIcons 2
import PropTypes from 'prop-types';

// We inject custom CSS via a style tag or global CSS to override the library's defaults
// to match the #252945 Dark Blue theme.

export default function DatePicker({ label, selected, onChange }) {
    return (
        <div className="flex flex-col gap-2 w-full">
            {label && <label className="text-body-1 text-text-secondary">{label}</label>}

            <div className="relative">
                <ReactDatePicker
                    selected={selected}
                    onChange={onChange}
                    dateFormat="d MMM yyyy"
                    className={`
            w-full px-5 py-4 rounded cursor-pointer
            text-heading-s-variant font-bold
            bg-white dark:bg-dark-input
            text-text-primary dark:text-white
            border border-light-hover dark:border-dark-input
            focus:outline-none focus:border-primary
          `}
                />
                <div className="absolute right-4 top-4 text-text-secondary pointer-events-none">
                    <HiCalendarDays />
                </div>
            </div>
        </div>
    );
}

DatePicker.propTypes = {
    label: PropTypes.string,
    selected: PropTypes.instanceOf(Date),
    onChange: PropTypes.func.isRequired,
};
