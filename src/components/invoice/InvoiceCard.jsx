import { Link } from 'react-router-dom';
import { HiChevronRight } from 'react-icons/hi2';
import InvoiceStatus from './InvoiceStatus';
import { formatCurrency, formatDate } from '../../utils/formatters';

export default function InvoiceCard({ invoice }) {
    return (
        <Link
            to={`/invoice/${invoice.id}`}
            className="
        block bg-white dark:bg-dark-card 
        rounded-lg shadow-sm 
        border border-transparent hover:border-primary
        transition-all duration-200
        p-6 cursor-pointer
      "
        >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">

                {/* 1. ID (Top Left) */}
                <div className="order-1 md:col-span-1">
                    <span className="text-text-secondary dark:text-[#888EB0]">#</span>
                    <span className="text-heading-s-variant font-bold text-text-primary dark:text-white">
                        {invoice.id}
                    </span>
                </div>

                {/* 2. CLIENT NAME (Top Right on Mobile, Center on Desktop) */}
                <div className="order-2 md:order-3 md:col-span-1 justify-self-end md:justify-self-start text-body-1 text-text-secondary dark:text-white/75">
                    {invoice.clientName}
                </div>

                {/* 3. DUE DATE (Middle Left on Mobile, Left on Desktop) */}
                <div className="order-3 md:order-2 md:col-span-1 text-body-1 text-text-secondary dark:text-[#DFE3FA]">
                    <span className="md:hidden">Due </span>
                    {formatDate(invoice.paymentDue)}
                </div>

                {/* 4. AMOUNT (Bottom Left on Mobile - Row 3) */}
                <div className="order-4 md:order-4 md:col-span-1 row-start-3 md:row-auto text-heading-s font-bold text-text-primary dark:text-white">
                    {formatCurrency(invoice.total)}
                </div>

                {/* 5. STATUS (Bottom Right on Mobile - Row 3) */}
                <div className="order-5 md:order-5 md:col-span-1 row-start-3 md:row-auto col-start-2 md:col-auto justify-self-end flex items-center gap-4">
                    <InvoiceStatus status={invoice.status} />
                    <HiChevronRight className="hidden md:block text-primary" />
                </div>

            </div>
        </Link>
    );
}
