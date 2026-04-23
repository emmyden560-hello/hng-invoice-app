import { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { HiTrash } from 'react-icons/hi2';
import { useInvoices } from '../../context/InvoiceContext';
import Button from '../common/Button';
import BaseInput from './BaseInput';
import Select from './Select';
import DatePicker from './DatePicker';

export default function InvoiceForm({ invoice, isOpen, onClose }) {
    const { addInvoice, updateInvoice } = useInvoices();

    const { control, register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            senderAddress: { street: '', city: '', postCode: '', country: '' },
            clientName: '',
            clientEmail: '',
            clientAddress: { street: '', city: '', postCode: '', country: '' },
            createdAt: new Date(),
            paymentTerms: 30,
            description: '',
            items: [{ name: '', quantity: 1, price: 0, total: 0 }],
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    });

    useEffect(() => {
        if (isOpen) {
            if (invoice) {
                reset({ ...invoice, createdAt: new Date(invoice.createdAt) });
            } else {
                reset({
                    senderAddress: { street: '', city: '', postCode: '', country: '' },
                    clientName: '',
                    clientEmail: '',
                    clientAddress: { street: '', city: '', postCode: '', country: '' },
                    createdAt: new Date(),
                    paymentTerms: 30,
                    description: '',
                    items: [{ name: '', quantity: 1, price: 0, total: 0 }],
                });
            }
        }
    }, [isOpen, invoice, reset]);

    const processSubmit = (data, status = 'pending') => {
        const formattedItems = data.items.map(item => ({
            ...item,
            total: Number(item.quantity) * Number(item.price)
        }));

        const grandTotal = formattedItems.reduce((acc, item) => acc + item.total, 0);

        const finalData = {
            ...data,
            items: formattedItems,
            total: grandTotal,
            paymentDue: new Date(data.createdAt.getTime() + data.paymentTerms * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            createdAt: data.createdAt.toISOString().split('T')[0],
            status: status,
        };

        if (invoice) {
            updateInvoice({ ...finalData, id: invoice.id });
        } else {
            const id = `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(1000 + Math.random() * 9000)}`;
            addInvoice({ ...finalData, id });
        }
        onClose();
    };

    const onSavePending = (data) => processSubmit(data, 'pending');
    const onSaveDraft = (data) => processSubmit(data, 'draft');

    return (
        <div className={`fixed inset-0 z-40 flex justify-start transition-all duration-300 ease-in-out ${isOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'}`}>
            <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />

            <div className={`relative w-full md:w-[719px] h-full bg-white dark:bg-dark-bg flex flex-col transform transition-transform duration-300 ease-in-out top-[72px] h-[calc(100vh-72px)] md:top-0 md:h-full md:pl-[103px] rounded-r-[20px] ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                <div className="px-6 py-6 md:pl-14 pt-8 md:pt-14">
                    <h2 className="text-heading-m font-bold text-text-primary dark:text-white">
                        {invoice ? `Edit #${invoice.id}` : 'New Invoice'}
                    </h2>
                </div>

                <form className="flex-1 overflow-y-auto px-6 md:px-14 pb-8 scrollbar-hide">

                    {/* --- BILL FROM --- */}
                    <h4 className="text-primary font-bold text-body-1 mb-6">Bill From</h4>

                    {/* Wiring Error: senderAddress.street */}
                    <BaseInput
                        label="Street Address"
                        {...register('senderAddress.street', { required: true })}
                        error={errors.senderAddress?.street}
                        className="mb-6"
                    />

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                        <BaseInput label="City" {...register('senderAddress.city', { required: true })} error={errors.senderAddress?.city} />
                        <BaseInput label="Post Code" {...register('senderAddress.postCode', { required: true })} error={errors.senderAddress?.postCode} />
                        <BaseInput label="Country" {...register('senderAddress.country', { required: true })} error={errors.senderAddress?.country} />
                    </div>

                    {/* --- BILL TO --- */}
                    <h4 className="text-primary font-bold text-body-1 mb-6">Bill To</h4>

                    <BaseInput label="Client Name" {...register('clientName', { required: true })} error={errors.clientName} className="mb-6" />
                    <BaseInput label="Client Email" {...register('clientEmail', { required: true })} error={errors.clientEmail} className="mb-6" />
                    <BaseInput label="Street Address" {...register('clientAddress.street', { required: true })} error={errors.clientAddress?.street} className="mb-6" />

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                        <BaseInput label="City" {...register('clientAddress.city', { required: true })} error={errors.clientAddress?.city} />
                        <BaseInput label="Post Code" {...register('clientAddress.postCode', { required: true })} error={errors.clientAddress?.postCode} />
                        <BaseInput label="Country" {...register('clientAddress.country', { required: true })} error={errors.clientAddress?.country} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <Controller control={control} name="createdAt" render={({ field }) => (
                            <DatePicker label="Invoice Date" selected={field.value} onChange={field.onChange} />
                        )} />
                        <Controller control={control} name="paymentTerms" render={({ field }) => (
                            <Select label="Payment Terms" value={field.value} onChange={field.onChange} options={[{ label: "Net 1 Day", value: 1 }, { label: "Net 7 Days", value: 7 }, { label: "Net 30 Days", value: 30 }]} />
                        )} />
                    </div>

                    <BaseInput label="Project Description" {...register('description', { required: true })} error={errors.description} className="mb-8" />

                    {/* --- ITEM LIST --- */}
                    <h3 className="text-heading-s text-[#777F98] font-bold mb-4">Item List</h3>
                    <div className="flex flex-col gap-4 mb-8">
                        {fields.map((item, index) => (
                            <div key={item.id} className="flex gap-4 items-start">
                                <div className="flex-[3]">
                                    <BaseInput
                                        label={index === 0 ? "Item Name" : ""}
                                        {...register(`items.${index}.name`, { required: true })}
                                        error={errors.items?.[index]?.name} // <--- Wiring Array Errors
                                    />
                                </div>
                                <div className="flex-[1]">
                                    <BaseInput
                                        label={index === 0 ? "Qty." : ""} type="number"
                                        {...register(`items.${index}.quantity`, { required: true })}
                                        error={errors.items?.[index]?.quantity}
                                    />
                                </div>
                                <div className="flex-[1.5]">
                                    <BaseInput
                                        label={index === 0 ? "Price" : ""} type="number" step="0.01"
                                        {...register(`items.${index}.price`, { required: true })}
                                        error={errors.items?.[index]?.price}
                                    />
                                </div>
                                <div className="flex-[0.5] pt-[14px] flex justify-center items-center">
                                    <button type="button" onClick={() => remove(index)}>
                                        <HiTrash className="text-text-secondary hover:text-danger text-lg" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <Button variant="item" type="button" onClick={() => append({ name: '', quantity: 1, price: 0, total: 0 })}>+ Add New Item</Button>
                    </div>
                </form>

                <div className="p-6 md:px-14 flex items-center bg-white dark:bg-dark-bg shadow-[0_-10px_30px_rgba(0,0,0,0.1)] rounded-br-[20px]">
                    {invoice ? (
                        <div className="flex w-full justify-end gap-2">
                            <Button variant="secondary" onClick={onClose}>Cancel</Button>
                            <Button variant="primary" onClick={handleSubmit(onSavePending)}>Save Changes</Button>
                        </div>
                    ) : (
                        <div className="flex w-full justify-between">
                            <Button variant="secondary" onClick={onClose}>Discard</Button>
                            <div className="flex gap-2">
                                <Button variant="dark" onClick={handleSubmit(onSaveDraft)}>Save as Draft</Button>
                                <Button variant="primary" onClick={handleSubmit(onSavePending)}>Save & Send</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
