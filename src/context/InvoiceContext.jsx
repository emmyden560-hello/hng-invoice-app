import { createContext, useReducer, useEffect, useContext } from 'react';
import initialData from '../data.json'; // Import your JSON file

const InvoiceContext = createContext();

// 1. Definition of Actions (The "What happened" logic)
const invoiceReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_INVOICE':
            return [action.payload, ...state];

        case 'UPDATE_INVOICE':
            return state.map((invoice) =>
                invoice.id === action.payload.id ? action.payload : invoice
            );

        case 'DELETE_INVOICE':
            return state.filter((invoice) => invoice.id !== action.payload);

        case 'MARK_AS_PAID':
            return state.map((invoice) =>
                invoice.id === action.payload
                    ? { ...invoice, status: 'paid' }
                    : invoice
            );

        default:
            return state;
    }
};

// 2. Lazy Initialization (The "Storage Strategy")
// We only read from LocalStorage ONCE when the app boots up.
const init = () => {
    const localData = localStorage.getItem('invoice-app-data');
    return localData ? JSON.parse(localData) : initialData;
};

export function InvoiceProvider({ children }) {
    // 3. The Reducer Hook
    const [invoices, dispatch] = useReducer(invoiceReducer, [], init);

    // 4. Persistence Effect
    // Whenever 'invoices' changes (add/edit/delete), we automatically sync to LocalStorage.
    useEffect(() => {
        localStorage.setItem('invoice-app-data', JSON.stringify(invoices));
    }, [invoices]);

    // 5. Public API (The functions your components will actually call)
    const addInvoice = (invoice) => {
        dispatch({ type: 'ADD_INVOICE', payload: invoice });
    };

    const updateInvoice = (updatedInvoice) => {
        dispatch({ type: 'UPDATE_INVOICE', payload: updatedInvoice });
    };

    const deleteInvoice = (id) => {
        dispatch({ type: 'DELETE_INVOICE', payload: id });
    };

    const markAsPaid = (id) => {
        dispatch({ type: 'MARK_AS_PAID', payload: id });
    };

    return (
        <InvoiceContext.Provider value={{
            invoices,
            addInvoice,
            updateInvoice,
            deleteInvoice,
            markAsPaid
        }}>
            {children}
        </InvoiceContext.Provider>
    );
}

// 6. Custom Hook (For clean imports)
export function useInvoices() {
    const context = useContext(InvoiceContext);
    if (!context) {
        throw new Error('useInvoices must be used within an InvoiceProvider');
    }
    return context;
}
