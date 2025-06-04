import React, { useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";

export default function Client() {
  const [clients, setClients] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const [form, setForm] = useState({
    name: "",
    rate: "",
    frequency: "",
    type: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function openAddModal() {
    setEditingClient(null);
    setForm({ name: "", rate: "", frequency: "", type: "" });
    setModalOpen(true);
  }

  function openEditModal(client) {
    setEditingClient(client);
    setForm({ ...client });
    setModalOpen(true);
  }

  function handleSave() {
    if (!form.name || !form.rate || !form.frequency || !form.type) {
      alert("Please fill in all fields!");
      return;
    }

    if (editingClient) {
      setClients((c) =>
        c.map((client) =>
          client.id === editingClient.id
            ? { ...form, id: editingClient.id }
            : client
        )
      );
      alert("Client updated!");
    } else {
      setClients((c) => [...c, { ...form, id: Date.now() }]);
      alert("Client added!");
    }
    setModalOpen(false);
  }

  function handleDelete(client) {
    if (window.confirm(`Are you sure you want to delete '${client.name}'?`)) {
      setClients((c) => c.filter((cl) => cl.id !== client.id));
      alert("Client deleted!");
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
            Client Management
          </h2>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white px-3 py-2 rounded shadow text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            Add Client
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white">
              <tr className="border-b border-blue-300">
                {["Name", "Rate", "Frequency", "Type", "Actions"].map(
                  (header) => (
                    <th
                      key={header}
                      className="text-left px-4 py-2 font-medium"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white text-gray-900">
              {clients.length === 0 ? (
                <tr className="text-center">
                  <td colSpan={5} className="py-6 text-gray-500">
                    No clients found.
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <td className="px-4 py-2">{client.name}</td>
                    <td className="px-4 py-2">{client.rate}</td>
                    <td className="px-4 py-2">{client.frequency}</td>
                    <td className="px-4 py-2">{client.type}</td>
                    <td className="px-4 py-2 flex gap-3">
                      <button
                        onClick={() => openEditModal(client)}
                        className="text-yellow-600 hover:text-yellow-800"
                        aria-label="Edit client"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(client)}
                        className="text-red-600 hover:text-red-800"
                        aria-label="Delete client"
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
              {editingClient ? "Edit Client" : "Add Client"}
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
              Name <span className="text-red-500">*</span>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 p-2 rounded border border-gray-300 bg-white transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-95"
              />
            </label>

            <label className="flex flex-col text-gray-900 text-sm">
              Rate <span className="text-red-500">*</span>
              <input
                name="rate"
                type="text"
                value={form.rate}
                onChange={handleChange}
                required
                className="mt-1 p-2 rounded border border-gray-300 bg-white transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-95"
              />
            </label>

            <label className="flex flex-col text-gray-900 text-sm">
              Frequency <span className="text-red-500">*</span>
              <select
                name="frequency"
                value={form.frequency}
                onChange={handleChange}
                required
                className="mt-1 p-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select frequency
                </option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </label>

            <label className="flex flex-col text-gray-900 text-sm">
              Type <span className="text-red-500">*</span>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
                className="mt-1 p-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select type
                </option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
                <option value="Basic">Basic</option>
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
