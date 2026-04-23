import Sidebar from './Sidebar';

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300 font-spartan">

            <Sidebar />

            <main className="
        relative flex justify-center
        
        /* MOBILE: Push down 72px */
        pt-[104px] px-6 pb-24
        
        /* TABLET: Push down 80px (Header grows) */
        md:pt-[130px] md:px-12 md:pb-10
        
        /* DESKTOP: Push right 103px, Reset Top Padding */
        lg:pl-[103px] lg:pt-[72px] lg:px-0
      ">

                {/* Constraint Container */}
                <div className="w-full max-w-[730px]">
                    {children}
                </div>

            </main>
        </div>
    );
}