import { useState } from "react";
import { Plus, X, Pencil, Trash2 } from "lucide-react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    name: "",
    client: "",
    description: "",
    attachment: null,
    preview: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [imageModal, setImageModal] = useState({ open: false, src: null });
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);

  const openModal = (index = null) => {
    if (index !== null) {
      const proj = projects[index];
      setForm({
        name: proj.name,
        client: proj.client,
        description: proj.description,
        attachment: proj.attachment || null,
        preview: proj.preview || null,
      });
      setEditIndex(index);
    } else {
      setForm({
        name: "",
        client: "",
        description: "",
        attachment: null,
        preview: null,
      });
      setEditIndex(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setForm({
      name: "",
      client: "",
      description: "",
      attachment: null,
      preview: null,
    });
    setEditIndex(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setForm((f) => ({
        ...f,
        [name]: file,
        preview: URL.createObjectURL(file),
      }));
    } else {
      setForm((f) => ({
        ...f,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    const { name, client, description } = form;
    if (!name || !client || !description) {
      alert("Please fill all required fields.");
      return;
    }

    const entry = {
      name: form.name,
      client: form.client,
      description: form.description,
      attachment: form.attachment,
      preview: form.preview,
    };

    if (editIndex !== null) {
      const updated = [...projects];
      updated[editIndex] = entry;
      setProjects(updated);
      alert("Project updated!");
    } else {
      setProjects([...projects, entry]);
      alert("Project added!");
    }

    closeModal();
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects((p) => p.filter((_, i) => i !== index));
      alert("Project deleted!");
    }
  };

  return (
    <div className="relative">
      {/* Page content */}
      <div className={`p-4 sm:p-6 max-w-full ${isModalOpen ? "blur-sm" : ""}`}>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4">
          <h2 className="text-white text-xl sm:text-2xl font-semibold">
            Project Management
          </h2>
          <button
            onClick={() => openModal()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white px-3 py-2 rounded shadow text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-3 sm:h-5" size={18} /> Add Project
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white">
              <tr>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Client</th>
                <th className="text-left px-4 py-3">Description</th>
                <th className="text-left px-4 py-3">Attachment</th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-900">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No projects found.
                  </td>
                </tr>
              ) : (
                projects.map((proj, i) => (
                  <tr key={i} className="hover:bg-gray-100 transition">
                    <td className="px-4 py-2">{proj.name}</td>
                    <td className="px-4 py-2">{proj.client}</td>
                    <td className="px-4 py-2">{proj.description}</td>
                    <td className="px-4 py-2 relative">
                      {proj.preview ? (
                        <div className="relative w-16 h-16 mx-auto">
                          <img
                            src={proj.preview}
                            alt="Attachment"
                            className="w-full h-full object-cover rounded cursor-pointer"
                            onClick={() =>
                              setImageModal({ open: true, src: proj.preview })
                            }
                          />

                          {/* 3-dot dropdown */}
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDropdownOpenIndex(
                                  dropdownOpenIndex === i ? null : i
                                );
                              }}
                              className="bg-white rounded-full px-2 py-1 text-xl shadow hover:bg-gray-100"
                            >
                              ⋮
                            </button>

                            {dropdownOpenIndex === i && (
                              <div className="absolute bottom-full mb-2 bg-white text-gray-800 rounded shadow p-2 text-sm z-50">
                                <button
                                  className="block w-full text-left hover:text-blue-600"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setImageModal({
                                      open: true,
                                      src: proj.preview,
                                    });
                                    setDropdownOpenIndex(null);
                                  }}
                                >
                                  🔍 
                                </button>
                                <a
                                  href={proj.preview}
                                  download={`project-${i + 1}.jpg`}
                                  className="block w-full text-left hover:text-blue-600"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDropdownOpenIndex(null);
                                  }}
                                >
                                  ⬇ 
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className="px-4 py-2 flex gap-3">
                      <button
                        onClick={() => openModal(i)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(i)}
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

      {/* Sidebar Modal */}
      {isModalOpen && (
        <div className="fixed top-17 right-0 bottom-0 z-40 sm:w-[90%] md:w-96 bg-white shadow-lg overflow-y-auto transition-all">
          <div className="flex justify-between items-center p-4 border-b border-gray-300">
            <h3 className="text-lg font-semibold text-blue-800">
              {editIndex !== null ? "Edit Project" : "Add Project"}
            </h3>
            <button
              onClick={closeModal}
              className="text-gray-700 hover:text-gray-900"
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
              Name <span className="text-red-500">*</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 p-2 rounded border border-gray-300 transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-95"
              />
            </label>

            <label className="flex flex-col text-sm text-gray-900">
              Client <span className="text-red-500">*</span>
              <select
                name="client"
                value={form.client}
                onChange={handleChange}
                required
                className="mt-1 p-2 rounded border border-gray-300 transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-95"
              >
                <option value="">Select Client</option>
                <option value="Client A">Client A</option>
                <option value="Client B">Client B</option>
              </select>
            </label>

            <label className="flex flex-col text-sm text-gray-900">
              Description <span className="text-red-500">*</span>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={3}
                className="mt-1 p-2 rounded border border-gray-300 transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-95"
              />
            </label>

            <label className="flex flex-col text-sm text-gray-900">
              Attachment
              <input
                type="file"
                name="attachment"
                accept="image/*"
                onChange={handleChange}
                className="mt-1"
              />
              {form.preview && (
                <img
                  src={form.preview}
                  alt="Preview"
                  className="mt-2 w-24 h-24 object-cover rounded border"
                />
              )}
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
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Image Preview Modal */}
      {imageModal.open && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
          onClick={() => setImageModal({ open: false, src: null })}
        >
          <img
            src={imageModal.src}
            alt="Preview"
            className="max-w-full max-h-full rounded shadow-lg transition-transform scale-100"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
