"use client";

import { useEffect, useState } from "react";

type Plan = {
  price: number;
};

export default function Success() {
  const [mobile, setMobile] = useState("");
  const [operator, setOperator] = useState("");
  const [plan, setPlan] = useState<Plan | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const m = localStorage.getItem("mobile") || "";
    const o = localStorage.getItem("operator") || "";
    const p = JSON.parse(localStorage.getItem("plan") || "null");

    setMobile(m);
    setOperator(o);
    setPlan(p);

    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="success-bg d-flex align-items-center justify-content-center vh-100 px-3">

      <div className="glass-card p-4 w-100 text-center" style={{ maxWidth: "380px" }}>
        
        {/* Icon */}
        <div className="check-icon mb-3">✅</div>

        <h4 className="text-white fw-bold">Recharge Successful</h4>
        <p className="text-light opacity-75">Your recharge is completed 🎉</p>

        <div className="details mt-4 text-start">
          <p><strong>📱 Mobile:</strong> {mobile}</p>
          <p><strong>📡 Operator:</strong> {operator}</p>
          <p><strong>💰 Plan:</strong> ₹{plan?.price}</p>
        </div>

        <button
          className="btn glass-btn w-100 mt-4"
          onClick={() => (window.location.href = "/dashboard")}
        >
          Go to Dashboard
        </button>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .success-bg {
          min-height: 100vh;
          background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
                      url('/mobile-research.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .glass-card {
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(15px);
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.2);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          color: #fff;
        }

        .check-icon {
          font-size: 50px;
          animation: pop 0.5s ease;
        }

        @keyframes pop {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .details p {
          margin-bottom: 8px;
          color: #f1f5f9;
        }

        .glass-btn {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          border: none;
          transition: 0.3s;
        }

        .glass-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 25px rgba(34,197,94,0.5);
        }
      `}</style>
    </div>
  );
}