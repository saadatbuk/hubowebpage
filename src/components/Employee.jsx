import React, { useState } from "react";
import { Plus, X, Edit2, Trash2 } from "lucide-react";

export default function Employee() {
  const [employees, setEmployees] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    position: "",
    department: "",
    salary: "",
  });

  const openAddModal = () => {
    setEditingEmployee(null);
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      position: "",
      department: "",
      salary: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (employee) => {
    setEditingEmployee(employee);
    setFormData(employee);
    setModalOpen(true);
  };

  const handleSave = () => {
    const { firstName, lastName, email } = formData;

    if (!firstName || !lastName || !email) {
      alert("First Name, Last Name, and Email are required.");
      return;
    }

    if (editingEmployee) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === editingEmployee.id ? { ...formData, id: emp.id } : emp))
      );
      alert("Employee updated!");
    } else {
      setEmployees((prev) => [...prev, { ...formData, id: Date.now() }]);
      alert("Employee added!");
    }

    setModalOpen(false);
  };

  const handleDelete = (emp) => {
    if (window.confirm(`Delete employee "${emp.firstName} ${emp.lastName}"?`)) {
      setEmployees((prev) => prev.filter((e) => e.id !== emp.id));
      alert("Employee deleted!");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="relative p-4 max-w-full overflow-x-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-[var(--contrast-color)] text-xl sm:text-2xl font-semibold">Employee Management</h2>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white px-3 py-2 rounded shadow text-sm sm:text-base"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          Add Employee
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full text-sm sm:text-base">
          <thead className="bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white">
            <tr className="border-b border-blue-300">
              <th className="text-left px-4 py-2">First Name</th>
              <th className="text-left px-4 py-2">Middle Name</th>
              <th className="text-left px-4 py-2">Last Name</th>
              <th className="text-left px-4 py-2">Email</th>
              <th className="text-left px-4 py-2">Position</th>
              <th className="text-left px-4 py-2">Department</th>
              <th className="text-left px-4 py-2">Salary</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {employees.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6">
                  No employees found.
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{emp.firstName}</td>
                  <td className="px-4 py-2">{emp.middleName}</td>
                  <td className="px-4 py-2">{emp.lastName}</td>
                  <td className="px-4 py-2">{emp.email}</td>
                  <td className="px-4 py-2">{emp.position}</td>
                  <td className="px-4 py-2">{emp.department}</td>
                  <td className="px-4 py-2">{emp.salary}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button onClick={() => openEditModal(emp)} className="text-yellow-600 hover:text-yellow-800">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(emp)} className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal (Right side, no overlay) */}
      {modalOpen && (
        <div
          className="fixed top-17 right-0 bottom-0 z-50 w-full sm:w-[90%] md:w-[500px] bg-white shadow-lg overflow-y-auto transition-transform
            transform translate-x-0"
          style={{ animation: "slideInFromRight 0.3s forwards" }}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-300">
            <h3 className="text-lg font-semibold text-blue-800">
              {editingEmployee ? "Edit Employee" : "Add Employee"}
            </h3>
            <button onClick={() => setModalOpen(false)} className="text-gray-700 hover:text-gray-900">
              <X className="w-6 h-6 text-red-600 hover:text-red-700" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="p-4 flex flex-col gap-4"
          >
            {[
              { label: "First Name", name: "firstName" },
              { label: "Middle Name", name: "middleName" },
              { label: "Last Name", name: "lastName" },
              { label: "Email", name: "email", type: "email" },
              { label: "Position", name: "position" },
              { label: "Department", name: "department" },
              { label: "Salary", name: "salary", type: "number" },
            ].map((field) => (
              <label key={field.name} className="flex flex-col text-sm text-gray-900">
                {field.label}
                <input
                  name={field.name}
                  type={field.type || "text"}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="mt-1 p-2 rounded border border-gray-300 transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-97"
                />
              </label>
            ))}

            <div className="flex justify-end gap-3 mt-4">
              <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white rounded">
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Slide from Right Animation */}
      <style>
        {`
          @keyframes slideInFromRight {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(0);
            }
          }
        `}
      </style>
    </div>
  );
}
