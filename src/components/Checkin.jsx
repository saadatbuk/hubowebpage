import { useState } from "react";
import { useSidebar } from "../context/Sidebarcontext";
import { Pencil, Trash2, Plus, X } from "lucide-react";

export default function Checkin() {
  const { collapsed } = useSidebar();
  const [checkins, setCheckins] = useState([]);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const openModal = (index = null) => {
    if (index !== null) {
      const checkin = checkins[index];
      setTime(checkin.time);
      setDate(checkin.date);
      setStatus(checkin.status);
      setEditIndex(index);
    } else {
      setTime("");
      setDate("");
      setStatus("Pending");
      setEditIndex(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTime("");
    setDate("");
    setStatus("Pending");
    setEditIndex(null);
  };

  const handleSave = () => {
    if (!time || !date) {
      alert("Please fill all required fields.");
      return;
    }

    const newEntry = { time, date, status };

    if (editIndex !== null) {
      const updated = [...checkins];
      updated[editIndex] = newEntry;
      setCheckins(updated);
      alert("Check-in updated!");
    } else {
      setCheckins([...checkins, newEntry]);
      alert("Check-in added!");
    }

    closeModal();
  };

  const handleDelete = (index) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this check-in?"
    );
    if (!confirm) return;

    setCheckins((prev) => prev.filter((_, i) => i !== index));
    alert("Check-in deleted!");
  };

  return (
    <div
      className={`relative transition-all duration-300 w-full sm:ml-0 md:${
        collapsed ? "ml-20" : "ml-64"
      } p-4 sm:p-6`}
    >
      {/* Background blur when modal is open */}
      <div
        className={isModalOpen ? "blur-sm pointer-events-none select-none" : ""}
      >
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => openModal()}
            className="inline-flex items-center gap-1 bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white px-2 py-2 rounded-md shadow hover:opacity-90"
          >
            <Plus size={18} /> Add Check In
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white">
              <tr className="border-b border-blue-300">
                <th className="text-left px-4 py-3">Time</th>
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-900">
              {checkins.length === 0 ? (
                <tr className="text-center">
                  <td colSpan={4} className="py-6 text-gray-500">
                    No check-ins found.
                  </td>
                </tr>
              ) : (
                checkins.map((entry, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <td className="px-4 py-2">{entry.time}</td>
                    <td className="px-4 py-2">{entry.date}</td>
                    <td className="px-4 py-2">{entry.status}</td>
                    <td className="px-4 py-2 flex gap-3">
                      <button
                        onClick={() => openModal(index)}
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-17 right-0 bottom-0 z-50 w-full max-w-md bg-white dark:bg-gray-800 shadow-lg overflow-y-auto transition-all">
          <div className="flex justify-between items-center p-4 border-b border-gray-300">
            <h3 className="text-lg font-semibold text-blue-800">
              {editIndex !== null ? "Edit Check In" : "Add Check In"}
            </h3>
            <button
              onClick={closeModal}
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
            <label className="flex flex-col text-sm text-gray-900">
              Time <span className="text-red-500">*</span>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="mt-1 p-2 border border-gray-300 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-95"
              />
            </label>

            <label className="flex flex-col text-sm text-gray-900">
              Date <span className="text-red-500">*</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="mt-1 p-2 border border-gray-300 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-95"
              />
            </label>

            <label className="flex flex-col text-sm text-gray-900">
              Status
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-95"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </label>

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white rounded"
              >
                Save Check In
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
