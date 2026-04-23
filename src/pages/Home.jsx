import { useState } from 'react';
import { useInvoices } from '../context/InvoiceContext';
import InvoiceCard from '../components/invoice/InvoiceCard';
import EmptyState from '../components/invoice/EmptyState';
import Button from '../components/common/Button';
import { HiPlus, HiChevronDown } from "react-icons/hi2";
import InvoiceForm from '../components/form/InvoiceForm';

export default function Home() {
    const { invoices } = useInvoices();
    const [filterStatus, setFilterStatus] = useState(null); // 'paid', 'pending', 'draft' or null

    const [isFormOpen, setIsFormOpen] = useState(false);

    // 1. Filter Logic
    const filteredInvoices = filterStatus
        ? invoices.filter(inv => inv.status === filterStatus)
        : invoices;

    // 2. Dynamic Header Text
    const invoiceCountText = invoices.length === 0
        ? 'No invoices'
        : `There are ${invoices.length} total invoices`;

    return (
        <div className="w-full">
            {/* --- HEADER SECTION --- */}
            <div className="flex justify-between items-center mb-8 lg:mb-16">

                {/* Title & Count */}
                <div className="flex flex-col">
                    <h1 className="text-heading-m md:text-heading-l font-bold text-text-primary dark:text-white">
                        Invoices
                    </h1>
                    <p className="text-body-1 text-text-secondary dark:text-white/75">
                        {/* Desktop: "There are 7 total invoices", Mobile: "7 invoices" */}
                        <span className="hidden md:inline">{invoiceCountText}</span>
                        <span className="md:hidden">{invoices.length} invoices</span>
                    </p>
                </div>

                {/* Actions: Filter & New Button */}
                <div className="flex items-center gap-4 md:gap-10">

                    {/* Filter Dropdown (Simplified for now) */}
                    <div className="flex items-center gap-3 cursor-pointer">
                        <span className="text-heading-s-variant font-bold text-text-primary dark:text-white">
                            Filter <span className="hidden md:inline">by status</span>
                        </span>
                        <HiChevronDown className="text-primary font-bold" />
                    </div>

                    {/* New Invoice Button */}
                    <Button
                        variant="primary"
                        onClick={() => setIsFormOpen(true)}
                        icon={
                            <div className="bg-white p-2 rounded-full">
                                <HiPlus className="text-primary font-bold text-sm" />
                            </div>
                        }
                        className="pl-2 pr-2 !py-3 rounded-full" // Custom padding to match the design's pill shape
                    >
                        New <span className="hidden md:inline">Invoice</span>
                    </Button>
                </div>
            </div>

            {/* --- LIST SECTION --- */}
            <div className="flex flex-col gap-4">
                {filteredInvoices.length > 0 ? (
                    filteredInvoices.map((invoice) => (
                        <InvoiceCard key={invoice.id} invoice={invoice} />
                    ))
                ) : (
                    <EmptyState />
                )}
            </div>

            <InvoiceForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
            />
        </div>
    );
}
