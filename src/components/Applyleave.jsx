import { useState } from "react";

export default function Applyleave() {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLeave = {
      leaveType,
      startDate,
      endDate,
      reason,
      appliedAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("leaveHistory")) || [];
    existing.push(newLeave);
    localStorage.setItem("leaveHistory", JSON.stringify(existing));

    // Clear form
    setLeaveType("");
    setStartDate("");
    setEndDate("");
    setReason("");

    alert("Leave Applied!");
  };

  return (
    <div className="max-w-full overflow-x-auto  mt-6 p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-800">Apply Leave</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Leave Type */}
        <select
          className="w-full border border-gray-300 rounded-lg p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 "
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
          required
        >
          <option value="">Select Leave Type</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Annual Leave">Annual Leave</option>
        </select>

        {/* Dates */}
        <input
          type="date"
          className="w-full border border-gray-300 rounded-lg p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-98"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <input
          type="date"
          className="w-full border border-gray-300 rounded-lg p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-98"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        {/* Reason */}
        <textarea
          className="w-full border border-gray-300 rounded-lg p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-98"
          rows="3"
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        ></textarea>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-b from-[#1E3A8A] to-[#3f99ff] text-white py-2 rounded-lg"
        >
          Apply Leave
        </button>
      </form>
    </div>
  );
}
