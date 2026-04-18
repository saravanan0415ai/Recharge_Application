"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [mobile, setMobile] = useState<string>("");
  const router = useRouter();

  const handleProceed = () => {
    if (mobile.length === 10 && !isNaN(Number(mobile))) {
      localStorage.setItem("mobile", mobile);
      router.push("/operator");
    } else {
      alert("Enter valid 10-digit mobile number");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div className="dashboard-bg vh-100 d-flex flex-column">

      {/* Navbar */}
      <div className="premium-navbar d-flex align-items-center justify-content-between px-3 py-2">

        <button className="icon-btn" onClick={() => router.back()}>
          ←
        </button>

        <h6 className="m-0 text-white fw-bold text-center">
          Recharge
        </h6>

        <button className="icon-btn" onClick={handleLogout}>
          ⎋
        </button>

      </div>

      {/* Content */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center px-3">
        
        <div className="glass-card p-4 w-100" style={{ maxWidth: "380px" }}>
          
          <div className="text-center mb-4">
            <h4 className="fw-bold text-white">Enter Mobile</h4>
            <p className="small text-light opacity-75">
              Recharge your number 📱
            </p>
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Mobile Number</label>
            <input
              type="tel"
              maxLength={10}
              className="form-control glass-input rounded-3"
              placeholder="Enter 10-digit number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <small className="text-light opacity-75">Recent</small>
            <div className="d-flex gap-2 mt-2 flex-wrap">
              {["9876543210", "9123456780"].map((num) => (
                <span
                  key={num}
                  className="badge recent-badge"
                  onClick={() => setMobile(num)}
                >
                  {num}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={handleProceed}
            className="btn glass-btn w-100 rounded-3 mt-2"
          >
            Proceed
          </button>

        </div>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .dashboard-bg {
          min-height: 100vh;
          background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
                      url('/mobile-research.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .premium-navbar {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255,255,255,0.2);
        }

        .icon-btn {
          background: rgba(255,255,255,0.15);
          border: none;
          color: #fff;
          padding: 8px 12px;
          border-radius: 10px;
          transition: 0.2s;
        }

        .icon-btn:hover {
          transform: scale(1.1);
        }

        .glass-card {
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(15px);
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.2);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .glass-input {
          background: rgba(255,255,255,0.2);
          border: none;
          color: #fff;
        }

        .glass-input::placeholder {
          color: #ddd;
        }

        .glass-input:focus {
          outline: none;
          box-shadow: 0 0 10px rgba(59,130,246,0.6);
        }

        .recent-badge {
          background: rgba(255,255,255,0.2);
          color: #fff;
          padding: 6px 10px;
          border-radius: 12px;
          cursor: pointer;
        }

        .recent-badge:hover {
          background: #3b82f6;
        }

        .glass-btn {
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          color: white;
          border: none;
          transition: 0.3s;
        }

        .glass-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 25px rgba(59,130,246,0.5);
        }
      `}</style>
    </div>
  );
}