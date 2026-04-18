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

  useEffect(() => {
    const stored = localStorage.getItem("users");

    if (stored) {
      setUsers(JSON.parse(stored));
    } else {
      localStorage.setItem("users", JSON.stringify(data.users));
      setUsers(data.users);
    }
  }, []);

  const save = (updated: User[]) => {
    localStorage.setItem("users", JSON.stringify(updated));
    setUsers(updated);
  };

  const handleSubmit = () => {
    if (!form.email || !form.password) return;

    if (editing) {
      const updated = users.map((u) =>
        u.id === form.id ? form : u
      );
      save(updated);
      setEditing(false);
    } else {
      const newUser = { ...form, id: Date.now() };
      save([...users, newUser]);
    }

    setForm({ id: 0, email: "", password: "", role: "user" });
  };

  const handleEdit = (user: User) => {
    setForm(user);
    setEditing(true);
  };

  const handleDelete = (id: number) => {
    const updated = users.filter((u) => u.id !== id);
    save(updated);
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <h2>User Management</h2>
        <p>Manage system users and roles</p>
      </div>

      {/* FORM */}
      <div className="card form-grid">
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={handleSubmit}>
          {editing ? "Update User" : "Add User"}
        </button>
      </div>

      {/* TABLE */}
      <div className="card table">
        <div className="row header">
          <span>Email</span>
          <span>Password</span>
          <span>Role</span>
          <span>Actions</span>
        </div>

        {users.map((u) => (
          <div key={u.id} className="row">
            <span>{u.email}</span>
            <span className="password">••••••••</span>
            <span className={`role ${u.role}`}>{u.role}</span>

            <div className="actions">
              <button onClick={() => handleEdit(u)}>Edit</button>
              <button className="delete" onClick={() => handleDelete(u.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* STYLES */}
      <style jsx>{`
        .page {
          color: white;
        }

        .page-header {
          margin-bottom: 20px;
        }

        .page-header h2 {
          font-size: 1.5rem;
          margin-bottom: 5px;
        }

        .page-header p {
          color: #cbd5f5;
          font-size: 0.9rem;
        }

        /* 💎 Glass Card */
        .card {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 18px;
          margin-bottom: 20px;
        }

        /* 🧾 FORM GRID */
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .form-grid input,
        .form-grid select {
          padding: 10px;
          border-radius: 8px;
          border: none;
          background: #111;
          color: white;
        }

        .form-grid button {
          grid-column: span 2;
          padding: 12px;
          background: linear-gradient(135deg, #6366f1, #06b6d4);
          border: none;
          border-radius: 10px;
          color: white;
          font-weight: 500;
        }

        /* 📊 TABLE */
        .table {
          overflow-x: auto;
        }

        .row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          padding: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          align-items: center;
        }

        .header {
          font-weight: 600;
          color: #aaa;
        }

        .password {
          letter-spacing: 2px;
          color: #888;
        }

        .actions button {
          margin-right: 5px;
          padding: 6px 10px;
          border: none;
          border-radius: 6px;
          background: rgba(255,255,255,0.1);
          color: white;
          cursor: pointer;
        }

        .actions .delete {
          background: #ef4444;
        }

        .role.admin {
          color: #6366f1;
        }

        .role.user {
          color: #22c55e;
        }

        /* 📱 Mobile */
        @media (max-width: 600px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-grid button {
            grid-column: span 1;
          }

          .row {
            grid-template-columns: 1fr;
            gap: 6px;
          }
        }
      `}</style>
    </div>
  );
}