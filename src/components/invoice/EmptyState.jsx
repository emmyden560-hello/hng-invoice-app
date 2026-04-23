export default function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-16 lg:py-24 text-center">
            <img
                src="./assets/illustration-empty.svg"
                alt="No invoices"
                className="w-[242px] h-[200px] mb-10"
            />

            <h2 className="text-heading-m font-bold text-text-primary dark:text-white mb-6">
                There is nothing here
            </h2>

            <p className="text-body-1 text-text-secondary max-w-[220px]">
                Create an invoice by clicking the <br />
                <span className="font-bold">New Invoice</span> button and get started
            </p>
        </div>
    );
}
