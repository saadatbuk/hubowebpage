import {
  LayoutDashboard,
  Book,
  CalendarCheck,
  User,
  Briefcase,
  Users,
  Layers2,
  ClipboardCheck,
  Building,
  Menu,
  LogIn,
  LogOut,
  ArrowRightToLine,
  ArrowLeftToLine,
  ChevronDown,
  ChevronUp,
  X // ⬅️ Add this
} from "lucide-react";
import "../../src/App.css"; // Make sure CSS file is imported

import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Sidebar({
  collapsed,
  toggleSidebar,
  active,
  setActive
}) {
  const [attendanceHovered, setAttendanceHovered] = useState(false);
  const [leaveHovered, setLeaveHovered] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-white dark:bg-gray-800 shadow-lg h-screen transition-all duration-500 ease-in-out flex flex-col`}
    >
      {/* Logo section stays white */}
      <div className="h-16 flex items-center justify-between px-4 shadow-md dark:shadow-gray-800 bg-white dark:bg-gray-800">
        {!collapsed && (
          <img
            src="/src/assets/image/huboweb.png"
            alt="Huboweb"
            className="h-10 w-auto"
          />
        )}
        <button
          onClick={toggleSidebar}
          className="ml-auto p-2 rounded-md transition-colors duration-300 text-gray-600 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-700 hover:text-blue-600"
        >
          {collapsed ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Gradient background nav section */}
      <div className="flex-1 bg-gradient-to-b from-[#1E3A8A] to-[#abd2ff] p-2 overflow-y-auto">
        <nav className="flex flex-col gap-1">
          {/* Dashboard */}
          {/* Dashboard */}
          <SidebarLink
            to="/dashboard"
            icon={LayoutDashboard}
            label="Dashboard"
            active={active}
            setActive={setActive}
            collapsed={collapsed}
          />

          {/* Handbook */}
          <SidebarLink
            to="/handbook"
            icon={Book}
            label="Handbook"
            active={active}
            setActive={setActive}
            collapsed={collapsed}
          />

          {/* Attendance Dropdown */}
          <div
            onMouseEnter={() => setAttendanceHovered(true)}
            onMouseLeave={() => setAttendanceHovered(false)}
            className="relative"
          >
            <div
              className={`${
                active === "Attendance"
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900"
                  : "hover:bg-blue-100 hover:text-black text-white dark:text-gray-300"
              } flex items-center justify-between gap-3 w-full p-3 rounded-lg transition cursor-pointer`}
            >
              <div className="flex items-center gap-3">
                <CalendarCheck className="w-5 h-5" />
                {!collapsed && <span>Attendance</span>}
              </div>
              {!collapsed &&
                (attendanceHovered ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                ))}
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                attendanceHovered && !collapsed
                  ? "max-h-40 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="ml-4 mt-1 flex flex-col rounded-md">
                <NavLink
                  to="/checkin"
                  onClick={() => setActive("Check In")}
                  className="px-2 py-2 hover:bg-blue-200 rounded-lg hover:text-black text-white dark:text-gray-300 text-sm flex items-center gap-2 transition"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Check In</span>
                </NavLink>
                <NavLink
                  to="/checkout"
                  onClick={() => setActive("Check Out")}
                  className="px-2 py-2 hover:bg-blue-200 rounded-lg hover:text-black text-white dark:text-gray-300 text-sm flex items-center gap-2 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Check Out</span>
                </NavLink>
              </div>
            </div>
          </div>

          {/* Other Navigation Links */}
          <SidebarLink
            to="/user"
            icon={User}
            label="User"
            active={active}
            setActive={setActive}
            collapsed={collapsed}
          />
          <SidebarLink
            to="/role"
            icon={Briefcase}
            label="Role"
            active={active}
            setActive={setActive}
            collapsed={collapsed}
          />
          <SidebarLink
            to="/employee"
            icon={Users}
            label="Employee"
            active={active}
            setActive={setActive}
            collapsed={collapsed}
          />
          {/* Leave Dropdown (same hover logic as Attendance) */}
          <div
            onMouseEnter={() => setLeaveHovered(true)}
            onMouseLeave={() => setLeaveHovered(false)}
            className="relative"
          >
            <div
              className={`${
                active === "Attendance"
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900"
                  : "hover:bg-blue-100 hover:text-black text-white dark:text-gray-300"
              } flex items-center justify-between gap-3 w-full p-3 rounded-lg transition cursor-pointer`}
            >
              <div className="flex items-center gap-3">
                <ClipboardCheck className="w-5 h-5" />
                {!collapsed && <span>Leave</span>}
              </div>
              {!collapsed &&
                (leaveHovered ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                ))}
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                leaveHovered && !collapsed
                  ? "max-h-40 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="ml-4 mt-1 flex flex-col rounded-md">
                <NavLink
                  to="/apply-leave"
                  onClick={() => setActive("Apply Leave")}
                  className="px-2 py-2 hover:bg-blue-200 rounded-lg hover:text-black text-white dark:text-gray-300 text-sm flex items-center gap-2 transition"
                >
                  <ArrowRightToLine className="w-4 h-4" />
                  <span>Apply Leave</span>
                </NavLink>
                <NavLink
                  to="/leave-history"
                  onClick={() => setActive("Leave History")}
                  className="px-2 py-2 hover:bg-blue-200 rounded-lg hover:text-black text-white dark:text-gray-300 text-sm flex items-center gap-2 transition"
                >
                  <ArrowLeftToLine className="w-4 h-4" />
                  <span>Leave History</span>
                </NavLink>
              </div>
            </div>
          </div>

          <SidebarLink
            to="/task"
            icon={ClipboardCheck}
            label="Task"
            active={active}
            setActive={setActive}
            collapsed={collapsed}
          />

          <SidebarLink
            to="/client"
            icon={Building}
            label="Client"
            active={active}
            setActive={setActive}
            collapsed={collapsed}
          />
          <SidebarLink
            to="/projects"
            icon={Layers2}
            label="Projects"
            active={active}
            setActive={setActive}
            collapsed={collapsed}
          />
        </nav>
      </div>
    </aside>
  );
}

function SidebarLink({ to, icon: Icon, label, active, setActive, collapsed }) {
  return (
    <NavLink
      to={to}
      onClick={() => setActive(label)}
      className={({ isActive }) =>
        `${
          isActive || active === label
            ? "bg-blue-100 text-blue-600 dark:bg-blue-900"
            : "hover:bg-blue-100 hover:text-black text-white dark:text-gray-300"
        } flex items-center gap-3 w-full p-3 rounded-lg transition`
      }
    >
      <Icon className="w-5 h-5" />
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
}
