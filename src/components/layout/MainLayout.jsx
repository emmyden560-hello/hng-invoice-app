import Sidebar from './Sidebar';

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300 font-spartan">

            {/* The Fixed Navigation (Top on Mobile, Left on Desktop) */}
            <Sidebar />

            {/* The Content Container */}
            <main className="
        relative
        /* MOBILE: Push content down below the 72px header */
        pt-[104px] px-6 pb-24
        /* DESKTOP: Push content right of the 103px sidebar, center it */
        lg:pl-[103px] lg:pt-16 lg:px-0
        flex justify-center
      ">

                {/* Max Width Constraint (730px is standard for this design) */}
                <div className="w-full max-w-[730px]">
                    {children}
                </div>

            </main>
        </div>
    );
}
