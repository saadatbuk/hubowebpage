// src/context/SidebarContext.js
// import { createContext, useContext, useState } from "react";

// const SidebarContext = createContext();

// export const SidebarProvider = ({ children }) => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [activeComponent, setActiveComponent] = useState("Dashboard");

//   return (
//     <SidebarContext.Provider
//       value={{ collapsed, setCollapsed, activeComponent, setActiveComponent }}
//     >
//       {children}
//     </SidebarContext.Provider>
//   );
// };

// export const useSidebar = () => useContext(SidebarContext);


// src/context/SidebarContext.js
import { createContext, useContext, useState, useEffect } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  // Get from localStorage (or default to null)
  const [activeComponent, setActiveComponent] = useState(() => {
    return localStorage.getItem("activeComponent") || null;
  });

  const [collapsed, setCollapsed] = useState(false);

  // Store activeComponent in localStorage on change
  useEffect(() => {
    if (activeComponent) {
      localStorage.setItem("activeComponent", activeComponent);
    }
  }, [activeComponent]);

  return (
    <SidebarContext.Provider
      value={{ collapsed, setCollapsed, activeComponent, setActiveComponent }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);

