import { useState, useRef, useEffect } from 'react'; // Import hooks
import { useInvoices } from '../context/InvoiceContext';
import InvoiceCard from '../components/invoice/InvoiceCard';
import EmptyState from '../components/invoice/EmptyState';
import Button from '../components/common/Button';
import InvoiceForm from '../components/form/InvoiceForm';
import Checkbox from '../components/common/Checkbox'; // Import Checkbox
import { HiPlus, HiChevronDown } from "react-icons/hi2";

export default function Home() {
    const { invoices } = useInvoices();

    // 1. Filter State (Array of strings)
    const [statusFilters, setStatusFilters] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Ref for clicking outside
    const filterRef = useRef(null);

    // 2. Close filter when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilterOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [filterRef]);

    // 3. Toggle Filter Logic
    const handleFilterChange = (status) => {
        if (statusFilters.includes(status)) {
            setStatusFilters(statusFilters.filter(s => s !== status));
        } else {
            setStatusFilters([...statusFilters, status]);
        }
    };

    // 4. Apply Filter
    // If array is empty, show ALL. Otherwise, show matches.
    const filteredInvoices = statusFilters.length === 0
        ? invoices
        : invoices.filter(inv => statusFilters.includes(inv.status));

    // Header Text Logic
    const invoiceCountText = invoices.length === 0
        ? 'No invoices'
        : `There are ${invoices.length} total invoices`;

    return (
        <div className="w-full">
            {/* --- HEADER --- */}
            <div className="flex justify-between items-center mb-8 lg:mb-16">

                <div className="flex flex-col">
                    <h1 className="text-heading-m md:text-heading-l font-bold text-text-primary dark:text-white">
                        Invoices
                    </h1>
                    <p className="text-body-1 text-text-secondary dark:text-white/75">
                        <span className="hidden md:inline">{invoiceCountText}</span>
                        <span className="md:hidden">{invoices.length} invoices</span>
                    </p>
                </div>

                <div className="flex items-center gap-4 md:gap-10">

                    {/* --- FILTER DROPDOWN --- */}
                    <div className="relative" ref={filterRef}>
                        {/* Trigger */}
                        <div
                            className="flex items-center gap-3 cursor-pointer group select-none"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                            <span className="text-heading-s-variant font-bold text-text-primary dark:text-white">
                                Filter <span className="hidden md:inline">by status</span>
                            </span>
                            <HiChevronDown
                                className={`text-primary font-bold transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`}
                            />
                        </div>

                        {/* Dropdown Menu */}
                        <div className={`
              absolute top-10 left-1/2 -translate-x-1/2 w-[192px]
              bg-white dark:bg-dark-card shadow-xl rounded-lg p-6
              flex flex-col gap-4 z-30
              transition-all duration-200 origin-top
              ${isFilterOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-0 invisible'}
            `}>
                            {['draft', 'pending', 'paid'].map((status) => (
                                <Checkbox
                                    key={status}
                                    label={status}
                                    checked={statusFilters.includes(status)}
                                    onChange={() => handleFilterChange(status)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* --- NEW INVOICE BUTTON --- */}
                    <Button
                        variant="primary"
                        onClick={() => setIsFormOpen(true)}
                        icon={
                            <div className="bg-white p-2 rounded-full">
                                <HiPlus className="text-primary font-bold text-sm" />
                            </div>
                        }
                        className="pl-2 !py-2 pr-4"
                    >
                        New <span className="hidden md:block">Invoice</span>
                    </Button>
                </div>
            </div>

            {/* --- LIST --- */}
            <div className="flex flex-col gap-4">
                {filteredInvoices.length > 0 ? (
                    filteredInvoices.map((invoice) => (
                        <InvoiceCard key={invoice.id} invoice={invoice} />
                    ))
                ) : (
                    <EmptyState />
                )}
            </div>

            {/* --- FORM DRAWER --- */}
            <InvoiceForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
            />
        </div>
    );
}
