import { useContext } from 'react';
// import { ThemeContext } from '../../context/ThemeContext'; // (We will build this hook next)
import logo from '/assets/logo.svg'; // You'll need to grab the SVG from Figma
import { HiMoon, HiSun } from "react-icons/hi2";

export default function Sidebar() {
    // Mocking the theme state for now - we will wire this up to Context later
    const isDark = false;
    const toggleTheme = () => console.log("Switch Theme");

    return (
        <aside className="
      z-50 flex bg-dark-card
      
      /* Mobile/Tablet: Top Header (Horizontal) */
      fixed top-0 left-0 w-full h-[72px] flex-row justify-between items-center
      
      /* Desktop: Left Sidebar (Vertical) */
      lg:fixed lg:top-0 lg:left-0 lg:h-full lg:w-[103px] lg:flex-col lg:rounded-r-[20px]
    ">

            {/* 1. Logo Container */}
            <div className="
        relative h-full w-[72px] lg:w-full lg:h-[103px] 
        bg-primary rounded-r-[20px] flex items-center justify-center overflow-hidden
        group cursor-pointer
      ">
                {/* The lighter purple shape inside the logo background */}
                <div className="absolute bottom-0 w-full h-[50%] bg-white/10 rounded-tl-[20px]" />
                <img src={logo} alt="Invoice App" className="relative z-10 w-7 lg:w-10" />
            </div>

            {/* 2. Bottom Actions (Theme + Avatar) */}
            <div className="flex h-full lg:h-auto lg:w-full lg:flex-col items-center pr-6 lg:pr-0 lg:pb-6">

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="
            px-6 lg:px-0 lg:py-8 
            text-text-secondary hover:text-text-primary dark:hover:text-white 
            transition-colors duration-200
          "
                    aria-label="Toggle Theme"
                >
                    {isDark ? (
                        <HiSun className="text-xl lg:text-2xl" />
                    ) : (
                        <HiMoon className="text-xl lg:text-2xl" />
                    )}
                </button>

                {/* Divider Line */}
                <div className="w-[1px] h-full lg:w-full lg:h-[1px] bg-[#494E6E] mx-6 lg:mx-0" />

                {/* User Avatar */}
                <div className="ml-2 lg:ml-0 lg:mt-6">
                    <img
                        src='./assets/avatar.png'
                        alt="User Profile"
                        className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-transparent hover:border-primary transition-all duration-200 cursor-pointer"
                    />
                </div>

            </div>
        </aside>
    );
}
