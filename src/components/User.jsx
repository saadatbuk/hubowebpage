import React, { useState } from "react";
import { Plus, X, Edit2, Trash2 } from "lucide-react";

const GENDERS = ["Male", "Female", "Other"];
const ROLES = ["User", "Admin"];

export default function User() {
  const [users, setUsers] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    username: "",
    gender: GENDERS[0],
    role: ROLES[0]
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function openAddModal() {
    setEditingUser(null);
    setForm({
      firstname: "",
      middlename: "",
      lastname: "",
      email: "",
      username: "",
      gender: GENDERS[0],
      role: ROLES[0]
    });
    setModalOpen(true);
  }

  function openEditModal(user) {
    setEditingUser(user);
    setForm({ ...user });
    setModalOpen(true);
  }

  function handleSave() {
    if (!form.firstname || !form.lastname || !form.email || !form.username) {
      alert("Please fill in all required fields!");
      return;
    }
    if (editingUser) {
      setUsers((u) =>
        u.map((user) =>
          user.id === editingUser.id ? { ...form, id: editingUser.id } : user
        )
      );
      alert("User updated!");
    } else {
      setUsers((u) => [...u, { ...form, id: Date.now() }]);
      alert("User added!");
    }
    setModalOpen(false);
  }

  function handleDelete(user) {
    if (window.confirm(`Are you sure you want to delete ${user.firstname}?`)) {
      setUsers((u) => u.filter((usr) => usr.id !== user.id));
      alert("User deleted!");
    }
  }

  return (
    <div className="relative">
      <div
        className={`p-4 sm:p-6 max-w-full overflow-x-auto ${
          modalOpen ? "blur-sm" : ""
        }`}
      >
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <h2 className="text-white text-xl sm:text-2xl font-semibold">
            User Management
          </h2>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white px-3 py-2 rounded shadow text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            Add User
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white">
              <tr className="border-b border-blue-300">
                {[
                  "First Name",
                  "Middle Name",
                  "Last Name",
                  "Email",
                  "Username",
                  "Gender",
                  "Role",
                  "Actions"
                ].map((header) => (
                  <th
                    key={header}
                    className="text-left px-4 py-2 sm:py-3 font-medium"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white text-gray-900">
              {users.length === 0 ? (
                <tr className="text-center">
                  <td colSpan={8} className="py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <td className="px-4 py-2">{user.firstname}</td>
                    <td className="px-4 py-2">{user.middlename}</td>
                    <td className="px-4 py-2">{user.lastname}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.username}</td>
                    <td className="px-4 py-2">{user.gender}</td>
                    <td className="px-4 py-2">{user.role}</td>
                    <td className="px-4 py-2 flex gap-3">
                      <button
                        onClick={() => openEditModal(user)}
                        className="text-yellow-600 hover:text-yellow-800"
                        aria-label="Edit user"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(user)}
                        className="text-red-600 hover:text-red-800"
                        aria-label="Delete user"
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
      </div>

      {modalOpen && (
        <div className="fixed top-17 right-0 bottom-0 z-40 sm:w-[90%] md:w-96 bg-white shadow-lg overflow-y-auto transition-all">
          <div className="flex justify-between items-center p-4 border-b border-gray-300">
            <h3 className="text-lg font-semibold text-blue-800">
              {editingUser ? "Edit User" : "Add User"}
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
            {[
              { label: "First Name", name: "firstname", required: true },
              { label: "Middle Name", name: "middlename" },
              { label: "Last Name", name: "lastname", required: true },
              { label: "Email", name: "email", type: "email", required: true },
              { label: "Username", name: "username", required: true }
            ].map(({ label, name, required, type = "text" }) => (
              <label key={name} className="flex flex-col text-gray-900 text-sm">
                {label} {required && <span className="text-red-500">*</span>}
                <input
                  name={name}
                  type={type}
                  value={form[name]}
                  onChange={handleChange}
                  required={required}
                  className="mt-1 p-2 rounded border border-gray-300 bg-white transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-97"
                />
              </label>
            ))}

            <label className="flex flex-col text-gray-900 text-sm">
              Gender
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="mt-1 p-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {GENDERS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col text-gray-900 text-sm">
              Role
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="mt-1 p-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
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
    </div>
  );
}
