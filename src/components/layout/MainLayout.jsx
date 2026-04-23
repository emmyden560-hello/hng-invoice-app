import Sidebar from './Sidebar';

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
            <Sidebar />

            {/* 
         Content Area Calculation:
         - Mobile: pt-[72px] (Push down below header)
         - Desktop: pl-[103px] (Push right next to sidebar)
         - Container: Limits max-width for large screens
      */}
            <main className="pt-[72px] lg:pt-0 lg:pl-[103px]">
                <div className="max-w-[730px] mx-auto px-6 py-8 lg:py-[72px]">
                    {children}
                </div>
            </main>
        </div>
    );
}
