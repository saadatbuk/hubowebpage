import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useSidebar } from "./context/Sidebarcontext"; // 👈 use context
import Login from "./components/Login";

export default function App() {
  const { collapsed, setCollapsed, activeComponent, setActiveComponent } = useSidebar();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* <Login/> */}
      <Sidebar
        collapsed={collapsed}
        toggleSidebar={() => setCollapsed((prev) => !prev)}
        active={activeComponent}
        setActive={setActiveComponent}
      />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header
          activeComponent={activeComponent}
          collapsed={collapsed}
          toggleSidebar={() => setCollapsed((prev) => !prev)}
        />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
