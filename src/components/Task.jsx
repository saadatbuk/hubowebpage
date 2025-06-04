import React, { useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";

const PRIORITIES = ["Low", "Medium", "High"];
const USERS = ["Saadat Ali", "Fatima", "Zara", "Ahmed"];

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [form, setForm] = useState({
    title: "",
    summary: "",
    startDate: "",
    endDate: "",
    priority: PRIORITIES[0],
    assignedTo: USERS[0]
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function openAddModal() {
    setEditingTask(null);
    setForm({
      title: "",
      summary: "",
      startDate: "",
      endDate: "",
      priority: PRIORITIES[0],
      assignedTo: USERS[0]
    });
    setModalOpen(true);
  }

  function openEditModal(task) {
    setEditingTask(task);
    setForm({ ...task });
    setModalOpen(true);
  }

  function handleSave() {
    if (!form.title || !form.startDate || !form.endDate) {
      alert("Please fill in all required fields!");
      return;
    }
    if (editingTask) {
      setTasks((t) =>
        t.map((task) =>
          task.id === editingTask.id ? { ...form, id: editingTask.id } : task
        )
      );
      alert("Task updated!");
    } else {
      setTasks((t) => [...t, { ...form, id: Date.now() }]);
      alert("Task added!");
    }
    setModalOpen(false);
  }

  function handleDelete(task) {
    if (window.confirm(`Are you sure you want to delete '${task.title}'?`)) {
      setTasks((t) => t.filter((tsk) => tsk.id !== task.id));
      alert("Task deleted!");
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
            Task Management
          </h2>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white px-3 py-2 rounded shadow text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            Add Task
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white">
              <tr className="border-b border-blue-300">
                {[
                  "Title",
                  "Summary",
                  "Start Date",
                  "End Date",
                  "Priority",
                  "Assigned To",
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
              {tasks.length === 0 ? (
                <tr className="text-center">
                  <td colSpan={7} className="py-6 text-gray-500">
                    No tasks found.
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr
                    key={task.id}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <td className="px-4 py-2">{task.title}</td>
                    <td className="px-4 py-2 line-clamp-2 max-w-xs">
                      {task.summary}
                    </td>
                    <td className="px-4 py-2">{task.startDate}</td>
                    <td className="px-4 py-2">{task.endDate}</td>
                    <td className="px-4 py-2">{task.priority}</td>
                    <td className="px-4 py-2">{task.assignedTo}</td>
                    <td className="px-4 py-2 flex gap-3">
                      <button
                        onClick={() => openEditModal(task)}
                        className="text-yellow-600 hover:text-yellow-800"
                        aria-label="Edit task"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(task)}
                        className="text-red-600 hover:text-red-800"
                        aria-label="Delete task"
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
              {editingTask ? "Edit Task" : "Add Task"}
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
            {/* Title */}
            <label className="flex flex-col text-gray-900 text-sm">
              Title <span className="text-red-500">*</span>
              <input
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                required
                className="mt-1 p-2 rounded border border-gray-300 bg-white transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-95"
              />
            </label>

            {/* Summary as textarea */}
            <label className="flex flex-col text-gray-900 text-sm">
              Summary
              <textarea
                name="summary"
                rows={4}
                value={form.summary}
                onChange={handleChange}
                className="mt-1 p-2 rounded border border-gray-300 bg-white resize-none transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-95"
                placeholder="Enter detailed Summary..."
              />
            </label>

            {/* Start Date */}
            <label className="flex flex-col text-gray-900 text-sm">
              Start Date <span className="text-red-500">*</span>
              <input
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
                required
                className="mt-1 p-2 rounded border border-gray-300 bg-white transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-95"
              />
            </label>

            {/* End Date */}
            <label className="flex flex-col text-gray-900 text-sm">
              End Date <span className="text-red-500">*</span>
              <input
                name="endDate"
                type="date"
                value={form.endDate}
                onChange={handleChange}
                required
                className="mt-1 p-2 rounded border border-gray-300 bg-white transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-95"
              />
            </label>

            {/* Priority */}
            <label className="flex flex-col text-gray-900 text-sm">
              Priority
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="mt-1 p-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>

            {/* Assigned To */}
            <label className="flex flex-col text-gray-900 text-sm">
              Assigned To
              <input
                name="assignedTo"
                type="text"
                value={form.assignedTo}
                onChange={handleChange}
                className="mt-1 p-2 rounded border border-gray-300 bg-white transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-95"
              />
            </label>

            {/* Buttons */}
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
