import PropTypes from 'prop-types';

const InvoiceStatus = ({ status }) => {
    // Normalize status to lowercase to prevent 'Paid' vs 'paid' bugs
    const safeStatus = status ? status.toLowerCase() : 'draft';

    // 1. Define Styles for each state
    // We use bg-opacity-5 (approx 0.06 alpha) for the background tint
    // and the full color for the text and the dot.
    const VARIANTS = {
        paid: {
            container: "bg-status-paid/5 text-status-paid",
            dot: "bg-status-paid"
        },
        pending: {
            container: "bg-status-pending/5 text-status-pending",
            dot: "bg-status-pending"
        },
        draft: {
            // Draft is special: Dark text in Light Mode, White text in Dark Mode
            container: `
        bg-status-draft/5 text-status-draft 
        dark:bg-status-draftDark/5 dark:text-status-draftDark
      `,
            dot: "bg-status-draft dark:bg-status-draftDark"
        }
    };

    const styles = VARIANTS[safeStatus] || VARIANTS.draft;

    return (
        <div
            className={`
        flex items-center justify-center gap-2 
        w-[104px] py-3 rounded-md
        text-heading-s-variant font-bold capitalize
        transition-colors duration-200
        ${styles.container}
      `}
        >
            {/* The Status Dot */}
            <span className={`h-2 w-2 rounded-full ${styles.dot}`} />

            {/* The Text */}
            {safeStatus}
        </div>
    );
};

InvoiceStatus.propTypes = {
    status: PropTypes.oneOf(['paid', 'pending', 'draft', 'Paid', 'Pending', 'Draft']).isRequired,
};

export default InvoiceStatus;
