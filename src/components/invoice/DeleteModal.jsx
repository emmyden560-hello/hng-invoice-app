import PropTypes from 'prop-types';
import Button from '../common/Button';

export default function DeleteModal({ invoiceId, onDelete, onCancel }) {
    return (
        // 1. The Backdrop (Dark Overlay)
        // fixed inset-0 covers the whole screen. z-50 ensures it's on top.
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">

            {/* Overlay background with blur effect */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onCancel} // Click outside to close
            />

            {/* 2. The Modal Card */}
            <div className="
        relative z-10 w-full max-w-[480px] 
        bg-white dark:bg-dark-card 
        p-12 rounded-lg shadow-2xl animate-fade-in-up
      ">

                {/* Title */}
                <h2 className="text-heading-m font-bold text-text-primary dark:text-white mb-4">
                    Confirm Deletion
                </h2>

                {/* Warning Text */}
                <p className="text-body-1 text-text-secondary dark:text-gray-300 mb-6">
                    Are you sure you want to delete invoice
                    <span className="font-bold mx-1">#{invoiceId}</span>?
                    This action cannot be undone.
                </p>

                {/* Actions */}
                <div className="flex justify-end gap-2">
                    {/* Cancel Button */}
                    <Button variant="secondary" onClick={onCancel}>
                        Cancel
                    </Button>

                    {/* Confirm Delete Button */}
                    <Button variant="danger" onClick={onDelete}>
                        Delete
                    </Button>
                </div>

            </div>
        </div>
    );
}

DeleteModal.propTypes = {
    invoiceId: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};
