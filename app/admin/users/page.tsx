"use client";

import { useState, useEffect } from "react";
import data from "../../data/data.json";

type User = {
  id: number;
  email: string;
  password: string;
  role: string;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<User>({
    id: 0,
    email: "",
    password: "",
    role: "user",
  });
  const [editing, setEditing] = useState(false);

  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    if (!form.email || !form.password) return;

    if (editing) {
      // In a real app, you'd call a PUT/PATCH API here
      const updated = users.map((u) =>
        u.id === form.id ? form : u
      );
      setUsers(updated);
      setEditing(false);
    } else {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      if (res.ok) fetchUsers();
    }

    setForm({ id: 0, email: "", password: "", role: "user" });
  };

  const handleEdit = (user: User) => {
    setForm(user);
    setEditing(true);
  };

  const handleDelete = async (id: number) => {
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
  };

  return (
    <div className="page-wrapper">
      <div className="bg-layer" />
      
      <div className="page-content">
        <div className="page-header">
          <h2>User Management</h2>
          <p>Create, edit and manage system users</p>
        </div>

        {/* FORM SECTION */}
        <div className="glass-card form-section mb-4">
          <div className="inputs">
            <input
              className="glass-input"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              className="glass-input"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <select
              className="glass-input"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button className="submit-btn" onClick={handleSubmit}>
            {editing ? "Update User Details" : "Add New User"}
          </button>
        </div>

        {/* LIST SECTION */}
        <div className="glass-card table-section">
          <div className="table-header">
            <span>USER INFO</span>
            <span>ROLE</span>
            <span>ACTIONS</span>
          </div>

          <div className="user-list">
            {loading ? (
               <div className="p-5 text-center opacity-50">Loading users...</div>
            ) : users.length === 0 ? (
               <div className="p-5 text-center opacity-50">No users found</div>
            ) : (
              users.map((u, i) => (
                <div key={`${u.id}-${i}`} className="user-row">
                  <div className="user-info">
                    <div className="email">{u.email}</div>
                    <div className="pwd">••••••••</div>
                  </div>
                  <div className="user-role">
                    <span className={`badge ${u.role}`}>{u.role}</span>
                  </div>
                  <div className="user-actions">
                    <button className="edit-btn" onClick={() => handleEdit(u)}>Edit</button>
                    <button className="del-btn" onClick={() => handleDelete(u.id)}>Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          color: #fff;
          font-family: 'Inter', sans-serif;
        }

        .bg-layer {
          position: fixed;
          inset: 0;
          background: url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop")
            center/cover no-repeat;
          filter: brightness(0.2);
          z-index: -1;
        }

        .page-content {
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }

        .page-header {
          margin-bottom: 2rem;
        }

        .page-header h2 {
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0;
        }

        .page-header p {
          color: #94a3b8;
          margin-top: 5px;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 24px;
        }

        .inputs {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }

        .glass-input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 12px 16px;
          color: #fff;
          outline: none;
        }

        .glass-input:focus {
          border-color: #6366f1;
          background: rgba(255, 255, 255, 0.1);
        }

        .submit-btn {
          width: 100%;
          padding: 14px;
          background: #6366f1;
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }

        .submit-btn:hover {
          background: #4f46e5;
          transform: translateY(-2px);
        }

        /* TABLE */
        .table-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          padding: 12px 20px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #64748b;
          margin-bottom: 10px;
        }

        .user-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          padding: 16px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          align-items: center;
          transition: 0.2s;
        }

        .user-row:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        .email {
          font-weight: 600;
          color: #fff;
        }

        .pwd {
          font-size: 0.8rem;
          color: #475569;
          letter-spacing: 2px;
        }

        .badge {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .badge.admin {
          background: rgba(99, 102, 241, 0.2);
          color: #818cf8;
        }

        .badge.user {
          background: rgba(16, 185, 129, 0.2);
          color: #34d399;
        }

        .user-actions {
          display: flex;
          gap: 10px;
        }

        .edit-btn, .del-btn {
          padding: 6px 12px;
          border-radius: 8px;
          border: none;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
        }

        .edit-btn {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .del-btn {
          background: rgba(239, 68, 68, 0.1);
          color: #f87171;
        }

        .del-btn:hover {
          background: rgba(239, 68, 68, 0.2);
        }
      `}</style>
    </div>
  );
}