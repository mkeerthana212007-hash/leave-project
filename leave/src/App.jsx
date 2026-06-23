import React, { useState } from "react";

export default function LeaveManagement() {
  const [employeeId, setEmployeeId] = useState("");
  const [employee, setEmployee] = useState("");
  const [leaveType, setLeaveType] = useState("Casual");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [filter, setFilter] = useState("");
  const [leaves, setLeaves] = useState([]);

  const applyLeave = () => {
    if (!employeeId || !employee || !date || !reason) {
      alert("Please fill all fields");
      return;
    }

    const newLeave = {
      id: Date.now(),
      employeeId,
      employee,
      leaveType,
      date,
      reason,
      status: "Pending",
    };

    setLeaves([...leaves, newLeave]);

    setEmployeeId("");
    setEmployee("");
    setDate("");
    setReason("");
  };

  const updateStatus = (id, status) => {
    setLeaves(
      leaves.map((leave) =>
        leave.id === id ? { ...leave, status } : leave
      )
    );
  };

  const deleteLeave = (id) => {
    setLeaves(leaves.filter((leave) => leave.id !== id));
  };

  const filteredLeaves = leaves.filter((leave) =>
    leave.employee.toLowerCase().includes(filter.toLowerCase())
  );

  const approved = leaves.filter(
    (leave) => leave.status === "Approved"
  ).length;

  const rejected = leaves.filter(
    (leave) => leave.status === "Rejected"
  ).length;

  const pending = leaves.filter(
    (leave) => leave.status === "Pending"
  ).length;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#4f46e5,#7c3aed,#06b6d4,#14b8a6)",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "260px",
          background:
            "linear-gradient(180deg,#111827,#1e293b)",
          color: "white",
          padding: "25px",
          boxShadow: "4px 0 15px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>🏢 HRMS</h2>

        <div style={menuStyle}>📊 Dashboard</div>
        <div style={menuStyle}>📝 Apply Leave</div>
        <div style={menuStyle}>📋 Leave History</div>
        <div style={menuStyle}>🔍 Search Employee</div>
        <div style={menuStyle}>✅ Approved Leaves</div>
        <div style={menuStyle}>⏳ Pending Leaves</div>
        <div style={menuStyle}>❌ Rejected Leaves</div>
        <div style={menuStyle}>📈 Reports</div>
        <div style={menuStyle}>⚙️ Settings</div>
        <div style={menuStyle}>🚪 Logout</div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "25px" }}>
        {/* Header */}
        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(12px)",
            padding: "20px",
            borderRadius: "20px",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h1>🏢HR Leave Management</h1>
          <h3>👤 HR Admin</h3>
        </div>

        {/* Dashboard Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(200px,1fr))",
            gap: "15px",
            marginBottom: "20px",
          }}
        >
          <div style={{ ...cardStyle, background: "#2563eb" }}>
            <h3>Total Requests</h3>
            <h1>{leaves.length}</h1>
          </div>

          <div style={{ ...cardStyle, background: "#10b981" }}>
            <h3>Approved</h3>
            <h1>{approved}</h1>
          </div>

          <div style={{ ...cardStyle, background: "#ef4444" }}>
            <h3>Rejected</h3>
            <h1>{rejected}</h1>
          </div>

          <div style={{ ...cardStyle, background: "#f59e0b" }}>
            <h3>Pending</h3>
            <h1>{pending}</h1>
          </div>
        </div>

        {/* Apply Leave Form */}
        <div style={sectionStyle}>
          <h2>📅 Apply Leave</h2>

          <div style={gridStyle}>
            <input
              placeholder="Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Employee Name"
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
              style={inputStyle}
            />

            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              style={inputStyle}
            >
              <option>Casual</option>
              <option>Sick</option>
              <option>Earned</option>
            </select>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              style={inputStyle}
            />
          </div>

          <button style={applyBtn} onClick={applyLeave}>
            Apply Leave
          </button>
        </div>

        {/* Search */}
        <div style={sectionStyle}>
          <h2>🔍 Search Employee</h2>

          <input
            placeholder="Search Employee"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ ...inputStyle, width: "100%" }}
          />
        </div>

        {/* Leave History */}
        <h2 style={{ color: "white" }}>📋 Leave History</h2>

        {filteredLeaves.map((leave) => (
          <div
            key={leave.id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "15px",
              marginTop: "15px",
              borderLeft: `8px solid ${
                leave.status === "Approved"
                  ? "#10b981"
                  : leave.status === "Rejected"
                  ? "#ef4444"
                  : "#f59e0b"
              }`,
            }}
          >
            <h3>{leave.employee}</h3>

            <p><b>ID:</b> {leave.employeeId}</p>
            <p><b>Type:</b> {leave.leaveType}</p>
            <p><b>Date:</b> {leave.date}</p>
            <p><b>Reason:</b> {leave.reason}</p>

            <p>
              <b>Status:</b>{" "}
              <span
                style={{
                  color:
                    leave.status === "Approved"
                      ? "#10b981"
                      : leave.status === "Rejected"
                      ? "#ef4444"
                      : "#f59e0b",
                  fontWeight: "bold",
                }}
              >
                {leave.status}
              </span>
            </p>

            <button
              style={approveBtn}
              onClick={() =>
                updateStatus(leave.id, "Approved")
              }
            >
              Approve
            </button>

            <button
              style={rejectBtn}
              onClick={() =>
                updateStatus(leave.id, "Rejected")
              }
            >
              Reject
            </button>

            <button
              style={deleteBtn}
              onClick={() => deleteLeave(leave.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const menuStyle = {
  background: "rgba(255,255,255,0.1)",
  padding: "12px",
  borderRadius: "10px",
  marginBottom: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

const cardStyle = {
  color: "white",
  padding: "20px",
  borderRadius: "15px",
  textAlign: "center",
};

const sectionStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "15px",
  marginBottom: "20px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: "15px",
};

const inputStyle = {
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "10px",
};

const applyBtn = {
  marginTop: "15px",
  background: "#4f46e5",
  color: "white",
  border: "none",
  padding: "12px 25px",
  borderRadius: "10px",
  cursor: "pointer",
};

const approveBtn = {
  background: "#10b981",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  marginRight: "10px",
  cursor: "pointer",
};

const rejectBtn = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  marginRight: "10px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#64748b",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  cursor: "pointer",
};