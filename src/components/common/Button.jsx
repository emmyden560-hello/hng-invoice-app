import PropTypes from 'prop-types';

// Map variants to Tailwind classes
const VARIANTS = {
    // Button 1 & 2: Primary Purple
    primary: "bg-primary hover:bg-primary-hover text-white",

    // Button 5: Destructive Red
    danger: "bg-danger hover:bg-danger-hover text-white",

    // Button 3: Edit (Theme Adaptive)
    // Light: Light Grey bg, Dark Text
    // Dark: Dark Blue bg, White Text
    secondary: `
    bg-[#F9FAFE] text-[#7E88C3] hover:bg-[#DFE3FA] hover:text-[#7E88C3]
    dark:bg-dark-input dark:text-white dark:hover:bg-white dark:hover:text-[#7E88C3]
  `,

    // Button 4: Save as Draft (Dark Slate)
    draft: "bg-draft hover:bg-draft-hover text-draft-text dark:text-white",

    // Button 6: Add New Item (Full width, dashed or solid)
    item: "w-full bg-[#F9FAFE] text-[#7E88C3] hover:text-primary dark:bg-dark-input dark:text-white dark:hover:text-text-secondary",

    // Button 7: Mark as Draft (Light Grey bg, Dark Text)
    dark: "bg-[#373B53] text-gray-200 hover:bg-[#0C0E16] dark:bg-[#373B53] dark:text-gray-200 dark:hover:bg-[#1E2139]"

};

export default function Button({
    children,
    variant = 'primary',
    icon,
    className = '',
    ...props
}) {
    return (
        <button
            // Base styles: 
            // - heading-s (15px Bold)
            // - Rounded corners (rounded-3xl for pills)
            // - Flex layout for centering icon + text
            // - Transition for smooth hover effects
            className={`
        flex items-center justify-center gap-4 px-6 py-4 rounded-3xl 
        text-heading-s transition-colors duration-200 font-bold
        ${VARIANTS[variant]} 
        ${className}
      `}
            {...props}
        >
            {/* Render Icon if present (useful for the "+" in 'New Invoice') */}
            {icon && <span className="mt-[-2px]">{icon}</span>}

            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'danger', 'secondary', 'draft', 'item']),
    icon: PropTypes.node,
    className: PropTypes.string,
};
