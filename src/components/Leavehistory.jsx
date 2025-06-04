import { useEffect, useState } from "react";
import { Edit2, Trash2, X } from "lucide-react";

export default function LeaveHistory() {
  const [leaves, setLeaves] = useState([]);
  const [editingLeave, setEditingLeave] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("leaveHistory")) || [];
    setLeaves(saved.reverse());
  }, []);

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this leave?")) {
      const updated = [...leaves];
      updated.splice(index, 1);
      setLeaves(updated);
      localStorage.setItem("leaveHistory", JSON.stringify(updated.reverse()));
    }
  };

  const handleEdit = (leave, index) => {
    setEditingLeave({ ...leave, index });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updated = [...leaves];
    updated[editingLeave.index] = editingLeave;
    setLeaves(updated);
    localStorage.setItem("leaveHistory", JSON.stringify(updated.reverse()));
    setEditingLeave(null);
  };

  return (
    <div className="max-w-full px-4 mx-auto mt-6 p-4 bg-white rounded-xl shadow-md overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">Leave History</h2>
      {leaves.length === 0 ? (
        <p className="text-center text-gray-500">No leave history found.</p>
      ) : (
        <table className="min-w-full border-collapse rounded-lg overflow-hidden text-sm md:text-base">
          <thead>
            <tr className="text-white bg-gradient-to-b from-[#1E3A8A] to-[#4891e4]">
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">From</th>
              <th className="p-3 text-left">To</th>
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave, index) => (
              <tr key={index} className="bg-gray-50 even:bg-white border-b">
                <td className="p-3">{leave.leaveType}</td>
                <td className="p-3">{leave.startDate}</td>
                <td className="p-3">{leave.endDate}</td>
                <td className="p-3">{leave.reason}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(leave, index)}
                    className="text-yellow-500 hover:text-yellow-600"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Slide-in Edit Modal */}
      {editingLeave && (
  <div className="fixed inset-0 z-50 flex justify-end">
    {/* Overlay */}
    <div
      className="absolute inset-0 backdrop-blur-sm bg-black/30"
      onClick={() => setEditingLeave(null)}
    />

    {/* Side Panel */}
    <div className="relative w-full sm:w-[90%] md:w-96 bg-white shadow-lg h-full overflow-y-auto transition-all animate-slide-in-right">
      <div className="flex justify-between items-center p-4 border-b border-gray-300">
        <h3 className="text-lg font-semibold text-blue-800">Edit Leave</h3>
        <button
          onClick={() => setEditingLeave(null)}
          className="text-gray-700 hover:text-gray-900"
        >
          <X className="w-6 h-6 text-red-600 hover:text-red-700" />
        </button>
      </div>

      <form onSubmit={handleEditSubmit} className="p-4 flex flex-col gap-4">
        <label className="text-sm text-gray-900 flex flex-col">
          Leave Type
          <input
            type="text"
            value={editingLeave.leaveType}
            onChange={(e) =>
              setEditingLeave({ ...editingLeave, leaveType: e.target.value })
            }
            className="mt-1 p-2 border border-gray-300 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-95"
            required
          />
        </label>

        <label className="text-sm text-gray-900 flex flex-col">
          Start Date
          <input
            type="date"
            value={editingLeave.startDate}
            onChange={(e) =>
              setEditingLeave({ ...editingLeave, startDate: e.target.value })
            }
            className="mt-1 p-2 border border-gray-300 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-95"
            required
          />
        </label>

        <label className="text-sm text-gray-900 flex flex-col">
          End Date
          <input
            type="date"
            value={editingLeave.endDate}
            onChange={(e) =>
              setEditingLeave({ ...editingLeave, endDate: e.target.value })
            }
            className="mt-1 p-2 border border-gray-300 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-95"
            required
          />
        </label>

        <label className="text-sm text-gray-900 flex flex-col">
          Reason
          <textarea
            rows={3}
            value={editingLeave.reason}
            onChange={(e) =>
              setEditingLeave({ ...editingLeave, reason: e.target.value })
            }
            className="mt-1 p-2 border border-gray-300 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-95"
            required
          />
        </label>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={() => setEditingLeave(null)}
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
  </div>
)}

    </div>
  );
}
