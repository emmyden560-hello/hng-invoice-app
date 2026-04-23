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
                <div className="col-start-1 md:col-auto">
                    <span className="text-text-secondary dark:text-[#888EB0]">#</span>
                    <span className="text-heading-s-variant font-bold text-text-primary dark:text-white">
                        {invoice.id}
                    </span>
                </div>

                <div className="col-start-2 justify-self-end md:col-auto md:justify-self-start text-body-1 text-text-secondary dark:text-white/75 text-right md:text-left">
                    {invoice.clientName}
                </div>
                {/* FORCE row-start-2 to push it below the ID */}
                <div className="col-start-1 row-start-2 md:col-auto md:row-auto text-body-1 text-text-secondary dark:text-[#DFE3FA]">
                    <span className="md:hidden">Due </span>
                    {formatDate(invoice.paymentDue)}
                </div>

                {/* 4. AMOUNT (Bottom Row on Mobile) */}
                <div className="col-start-1 row-start-3 md:col-auto md:row-auto text-heading-s font-bold text-text-primary dark:text-white">
                    {formatCurrency(invoice.total)}
                </div>

                {/* 5. STATUS (Bottom Row on Mobile) */}
                <div className="col-start-2 row-start-3 justify-self-end md:col-auto md:row-auto flex items-center gap-4">
                    <InvoiceStatus status={invoice.status} />
                    <HiChevronRight className="hidden md:block text-primary" />
                </div>

            </div>
        </Link>
    );
}
