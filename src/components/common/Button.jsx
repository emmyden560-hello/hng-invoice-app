import PropTypes from 'prop-types';

const VARIANTS = {
    primary: "bg-primary text-white hover:bg-[#9277FF]", // Purple -> Light Purple
    secondary: "bg-[#F9FAFE] text-[#7E88C3] hover:bg-[#DFE3FA] dark:bg-[#252945] dark:text-white dark:hover:bg-white dark:hover:text-[#7E88C3]", // Complex Dark Mode Hover
    danger: "bg-danger text-white hover:bg-[#FF9797]", // Red -> Pinkish Red
    dark: "bg-[#373B53] text-[#DFE3FA] hover:bg-[#0C0E16] dark:bg-[#373B53] dark:text-[#DFE3FA] dark:hover:bg-[#1E2139]", // Draft Button
    item: "bg-[#F9FAFE] text-[#7E88C3] hover:bg-[#DFE3FA] w-full dark:bg-[#252945] dark:text-white dark:hover:bg-white dark:hover:text-[#7E88C3]" // Add New Item Button
};

export default function Button({ children, variant = 'primary', onClick, className = '', icon, type = "button" }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`
        flex items-center justify-center gap-4 px-6 py-4 rounded-full 
        font-bold text-heading-s-variant transition-colors duration-200 
        ${VARIANTS[variant]} 
        ${className}
      `}
        >
            {icon && <span>{icon}</span>}
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'dark', 'item']),
    onClick: PropTypes.func,
    className: PropTypes.string,
    icon: PropTypes.node,
    type: PropTypes.string,
};
