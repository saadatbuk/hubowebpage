import React, { useState } from "react";
import { Plus, X, Edit2, Trash2 } from "lucide-react";

export default function Role() {
  const [roles, setRoles] = useState([]); // 🔄 Start with empty array

  const [modalOpen, setModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [roleName, setRoleName] = useState("");

  function openAddModal() {
    setEditingRole(null);
    setRoleName("");
    setModalOpen(true);
  }

  function openEditModal(role) {
    setEditingRole(role);
    setRoleName(role.name);
    setModalOpen(true);
  }

  function handleSave() {
    if (!roleName.trim()) {
      alert("Role name cannot be empty!");
      return;
    }

    if (editingRole) {
      setRoles((r) =>
        r.map((role) => (role.id === editingRole.id ? { ...role, name: roleName } : role))
      );
      alert("Role updated!");
    } else {
      setRoles((r) => [...r, { id: Date.now(), name: roleName }]);
      alert("Role added!");
    }
    setModalOpen(false);
  }

  function handleDelete(role) {
    if (window.confirm(`Are you sure you want to delete role "${role.name}"?`)) {
      setRoles((r) => r.filter((r) => r.id !== role.id));
      alert("Role deleted!");
    }
  }

  return (
    <div className="relative p-4 max-w-full overflow-x-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-white text-xl sm:text-2xl font-semibold">Role Management</h2>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white px-3 py-2 rounded shadow text-sm sm:text-base"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          Add Role
        </button>
      </div>

      {/* Role Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full text-sm sm:text-base">
          <thead className="bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white">
            <tr className="border-b border-blue-300">
              <th className="text-left px-4 py-2 sm:py-3 font-medium">Role Name</th>
              <th className="text-left px-4 py-2 sm:py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {roles.length === 0 ? (
              <tr>
                <td colSpan={2} className="py-8 text-center text-gray-700 text-base">
                  No roles found.
                </td>
              </tr>
            ) : (
              roles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-100 transition-colors">
                  <td className="px-4 py-2">{role.name}</td>
                  <td className="px-4 py-2 flex gap-3">
                    <button
                      onClick={() => openEditModal(role)}
                      className="text-yellow-600 hover:text-yellow-800"
                      aria-label="Edit role"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(role)}
                      className="text-red-600 hover:text-red-800"
                      aria-label="Delete role"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Sidebar from Right (No overlay) */}
      {modalOpen && (
        <div
          className="fixed top-17 right-0 bottom-0 z-50 w-full sm:w-[90%] md:w-96 bg-white shadow-lg overflow-y-auto transition-transform transform translate-x-0"
          style={{ animation: "slideInFromRight 0.3s forwards" }}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-300">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingRole ? "Edit Role" : "Add Role"}
            </h3>
            <button
              onClick={() => setModalOpen(false)}
              className="text-gray-700 hover:text-gray-900"
              aria-label="Close modal"
            >
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
            <label className="flex flex-col text-gray-900 text-sm">
              Role Name <span className="text-red-500">*</span>
              <input
                name="roleName"
                type="text"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                required
                className="mt-1 p-2 rounded border border-gray-300 bg-white transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-95"
                autoFocus
              />
            </label>

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Slide animation */}
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
