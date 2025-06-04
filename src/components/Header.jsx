import { Bell, UserCircle,  } from "lucide-react";
// import { useState, useEffect } from "react";

export default function Header({ activeComponent }) {
  return (
    <header
      className={`w-full h-16 shadow flex items-center justify-between px-4 md:px-6 transition-colors duration-300
      bg-white text-black dark:bg-black dark:text-white`}
    >
      <div className="text-base md:text-lg font-semibold cursor-pointer hover:text-blue-600 dark:hover:text-blue-400">
        {activeComponent}
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <span className="hidden sm:block font-medium cursor-pointer hover:text-blue-600 dark:hover:text-blue-400">
          Welcome To Akhter Abbas
        </span>

        <Bell className="w-5 h-5 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400" />
        <UserCircle className="w-6 h-6 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400" />
      </div>
    </header>
  );
}

