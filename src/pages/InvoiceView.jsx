import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { HiChevronLeft } from 'react-icons/hi2';
import { useInvoices } from '../context/InvoiceContext';
import InvoiceStatus from '../components/invoice/InvoiceStatus';
import Button from '../components/common/Button';
import InvoiceForm from '../components/form/InvoiceForm';
import DeleteModal from '../components/invoice/DeleteModal';
import { formatDate, formatCurrency } from '../utils/formatters';

export default function InvoiceView() {
    const { id } = useParams(); // Get "XM9141" from url
    const navigate = useNavigate();
    const { invoices, markAsPaid, deleteInvoice } = useInvoices();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [isEditOpen, setIsEditOpen] = useState(false);

    // Find the specific invoice
    const invoice = invoices.find(inv => inv.id === id);

    // Handle 404 - Invoice not found
    if (!invoice) {
        return (
            <div className="text-center py-20">
                <h2 className="text-heading-m text-text-primary dark:text-white">Invoice not found</h2>
                <Link to="/" className="text-primary font-bold mt-4 inline-block">Go back home</Link>
            </div>
        );
    }


    // 1. The Actual Delete Logic (Runs only when user clicks "Delete" inside the modal)
    const confirmDelete = () => {
        deleteInvoice(invoice.id);
        navigate('/'); // Redirect to home
    };

    return (
        <div className="animate-fade-in relative">

            {/* --- CONDITIONAL RENDER: The Edit Form --- */}
            <InvoiceForm
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                invoice={invoice} // Pass the current invoice data!
            />

            {/* --- CONDITIONAL RENDER: The Delete Modal --- */}
            {isDeleteModalOpen && (
                <DeleteModal
                    invoiceId={invoice.id}
                    onDelete={confirmDelete}
                    onCancel={() => setIsDeleteModalOpen(false)}
                />
            )}

            {/* --- 1. Navigation --- */}
            <Link to="/" className="inline-flex items-center gap-6 mb-8 text-heading-s-variant font-bold text-text-primary dark:text-white hover:text-text-secondary transition-colors">
                <HiChevronLeft className="text-primary" />
                Go back
            </Link>

            {/* --- 2. Header (Status & Actions) --- */}
            <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6 mb-6 flex justify-between items-center">

                {/* Left: Status Label */}
                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
                    <span className="text-body-1 text-text-secondary">Status</span>
                    <InvoiceStatus status={invoice.status} />
                </div>

                {/* Right: Actions (Desktop Only - Mobile usually moves this to bottom, but we'll keep simple for now) */}
                <div className="hidden md:flex gap-2">
                    <Button variant="secondary" onClick={() => setIsEditOpen(true)}>Edit</Button>
                    <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)}>Delete</Button>
                    {invoice.status === 'pending' && (
                        <Button variant="primary" onClick={() => markAsPaid(invoice.id)}>
                            Mark as Paid
                        </Button>
                    )}
                </div>
            </div>

            {/* --- 3. Details Card --- */}
            <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-8 md:p-12 text-body-1 text-text-secondary dark:text-white/75">

                {/* Top Row: ID & Sender Address */}
                <div className="flex flex-col md:flex-row justify-between mb-12">
                    <div className="mb-8 md:mb-0">
                        <h1 className="text-heading-s md:text-heading-m font-bold text-text-primary dark:text-white mb-2">
                            <span className="text-text-tertiary">#</span>{invoice.id}
                        </h1>
                        <p>{invoice.description}</p>
                    </div>
                    <div className="text-right flex flex-col md:items-end">
                        <p>{invoice.senderAddress.street}</p>
                        <p>{invoice.senderAddress.city}</p>
                        <p>{invoice.senderAddress.postCode}</p>
                        <p>{invoice.senderAddress.country}</p>
                    </div>
                </div>

                {/* Middle Grid: Dates & Bill To */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">

                    {/* Column 1: Dates */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <p className="mb-3">Invoice Date</p>
                            <h3 className="text-heading-s font-bold text-text-primary dark:text-white">
                                {formatDate(invoice.createdAt)}
                            </h3>
                        </div>
                        <div>
                            <p className="mb-3">Payment Due</p>
                            <h3 className="text-heading-s font-bold text-text-primary dark:text-white">
                                {formatDate(invoice.paymentDue)}
                            </h3>
                        </div>
                    </div>

                    {/* Column 2: Bill To */}
                    <div>
                        <p className="mb-3">Bill To</p>
                        <h3 className="text-heading-s font-bold text-text-primary dark:text-white mb-2">
                            {invoice.clientName}
                        </h3>
                        <p>{invoice.clientAddress.street}</p>
                        <p>{invoice.clientAddress.city}</p>
                        <p>{invoice.clientAddress.postCode}</p>
                        <p>{invoice.clientAddress.country}</p>
                    </div>

                    {/* Column 3: Sent To */}
                    <div className="col-span-2 md:col-span-1">
                        <p className="mb-3">Sent to</p>
                        <h3 className="text-heading-s font-bold text-text-primary dark:text-white">
                            {invoice.clientEmail}
                        </h3>
                    </div>
                </div>

                {/* Bottom: Items Table */}
                <div className="rounded-lg overflow-hidden bg-[#F9FAFE] dark:bg-dark-input/50 mt-8">
                    {/* Table Header (Hidden on Mobile) */}
                    <div className="hidden md:grid grid-cols-5 p-8 pb-4 text-body-2 font-bold text-text-secondary">
                        <div className="col-span-2">Item Name</div>
                        <div className="text-center">QTY.</div>
                        <div className="text-right">Price</div>
                        <div className="text-right">Total</div>
                    </div>

                    {/* Table Body */}
                    <div className="p-6 md:p-8 pt-0">
                        {invoice.items.map((item, index) => (
                            <div key={index} className="grid grid-cols-2 md:grid-cols-5 items-center py-4 border-b last:border-0 border-light-hover dark:border-transparent text-heading-s-variant font-bold text-text-primary dark:text-white">

                                {/* Mobile Layout: Name + Qty/Price mixed */}
                                <div className="col-span-2 md:hidden mb-2">{item.name}</div>
                                <div className="md:hidden text-text-secondary">{item.quantity} x {formatCurrency(item.price)}</div>

                                {/* Desktop Layout */}
                                <div className="hidden md:block col-span-2">{item.name}</div>
                                <div className="hidden md:block text-center text-text-secondary">{item.quantity}</div>
                                <div className="hidden md:block text-right text-text-secondary">{formatCurrency(item.price)}</div>

                                {/* Total (Always Visible) */}
                                <div className="text-right col-span-1 md:col-span-1">{formatCurrency(item.total)}</div>
                            </div>
                        ))}
                    </div>

                    {/* Footer: Grand Total */}
                    <div className="bg-[#373B53] dark:bg-black p-8 flex justify-between items-center text-white rounded-b-lg">
                        <span className="text-body-2">Amount Due</span>
                        <span className="text-heading-m font-bold">{formatCurrency(invoice.total)}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
