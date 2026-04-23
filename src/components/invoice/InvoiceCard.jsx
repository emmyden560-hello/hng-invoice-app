import { Link } from 'react-router-dom';
import { HiChevronRight } from 'react-icons/hi2';
import InvoiceStatus from './InvoiceStatus';
import { formatCurrency, formatDate } from '../../utils/formatters';

// 👇 The "default" keyword here is what fixes the error
export default function InvoiceCard({ invoice }) {
    return (
        <Link
            to={`/invoice/${invoice.id}`}
            className="
        block bg-white dark:bg-dark-card 
        rounded-lg shadow-sm border border-transparent
        hover:border-primary transition-colors duration-200
        p-6 mb-4 cursor-pointer
      "
        >
            {/* GRID LAYOUT: Handles both Mobile (2 rows) and Desktop (1 row) */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">

                {/* 1. ID */}
                <div className="md:col-span-1 mb-4 md:mb-0">
                    <span className="text-text-tertiary">#</span>
                    <span className="text-heading-s-variant font-bold text-text-primary dark:text-white">
                        {invoice.id}
                    </span>
                </div>

                {/* 2. Due Date */}
                <div className="md:col-span-1 mb-2 md:mb-0 text-body-1 text-text-secondary dark:text-white">
                    Due {formatDate(invoice.paymentDue)}
                </div>

                {/* 3. Client Name */}
                <div className="col-span-2 md:col-span-1 mb-4 md:mb-0 text-body-1 text-text-tertiary dark:text-white text-right md:text-left">
                    {invoice.clientName}
                </div>

                {/* 4. Total Amount */}
                <div className="col-span-1 md:col-span-1 text-heading-s font-bold text-text-primary dark:text-white text-lg">
                    {formatCurrency(invoice.total)}
                </div>

                {/* 5. Status & Arrow */}
                <div className="col-span-1 md:col-span-1 flex items-center justify-end gap-5">
                    <InvoiceStatus status={invoice.status} />
                    <HiChevronRight className="hidden md:block text-primary font-bold" />
                </div>

            </div>
        </Link>
    );
}
