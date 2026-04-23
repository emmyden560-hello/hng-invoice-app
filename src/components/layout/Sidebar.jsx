import { HiMoon, HiSun } from 'react-icons/hi2';
import { useTheme } from '../../context/ThemeContext';
import logo from '/assets/logo.svg';
import avatar from '/assets/avatar.png';

export default function Sidebar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <aside className="
      z-50 bg-[#373B53] flex transition-all duration-300
      
      /* MOBILE & TABLET (Default): Top Bar */
      fixed top-0 left-0 w-full h-[72px] md:h-[80px] 
      flex-row justify-between items-center pr-6
      
      /* DESKTOP (lg+): Left Sidebar */
      lg:h-screen lg:w-[103px] lg:flex-col lg:rounded-r-[20px] lg:pr-0 lg:pb-6
    ">

            {/* LOGO */}
            <div className="
        h-full lg:h-[103px] w-[72px] md:w-[80px] lg:w-full 
        bg-primary rounded-r-[20px] 
        relative flex items-center justify-center overflow-hidden group cursor-pointer
      ">
                <img src={logo} alt="Logo" className="w-20 h-20 lg:w-25 lg:h-25 relative z-10" />
                <div className="absolute top-1/2 left-0 w-full h-full bg-[#9277FF] rounded-tl-[20px] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* ACTIONS */}
            <div className="flex flex-row lg:flex-col items-center gap-6 lg:gap-8 h-full lg:h-auto lg:w-full">

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="text-[#7E88C3] hover:text-[#DFE3FA] transition-colors p-2"
                >
                    {theme === 'light' ? <HiMoon className="text-[20px]" /> : <HiSun className="text-[20px]" />}
                </button>

                {/* Divider */}
                <div className="w-[1px] h-full lg:w-full lg:h-[1px] bg-[#494E6E]" />

                {/* Avatar */}
                <div className="relative w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-primary transition-colors cursor-pointer">
                    <img src={avatar} alt="User" className="w-full h-full object-cover" />
                </div>

            </div>
        </aside>
    );
}
