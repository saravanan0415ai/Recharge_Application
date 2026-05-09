"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

export default function History() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/history");
        const data = await res.json();
        setHistory(data);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="history-wrapper">
      <div className="bg-layer" />

      <header className="nav">
        <button onClick={() => router.back()} className="nav-btn">
          <IoArrowBack />
        </button>
        <h2 className="title">Admin History</h2>
        <div style={{ width: 40 }} />
      </header>

      <main className="container">
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
            <p>Loading History...</p>
          </div>
        ) : (
          <div className="history-list">
            {history.length === 0 ? (
              <p className="no-data">No history records found.</p>
            ) : (
              history.map((h, i) => (
                <div key={h.id || i} className="history-card">
                  <div className="history-main">
                    <span className="mobile">{h.mobile}</span>
                    <span className="price">₹{h.price}</span>
                  </div>
                  <div className="history-details">
                    <span>{h.data} • {h.validity}</span>
                    <span className="date">{h.date}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      <style jsx>{`
        .history-wrapper {
          min-height: 100vh;
          color: #fff;
          font-family: "Inter", sans-serif;
        }

        .bg-layer {
          position: fixed;
          inset: 0;
          background: url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop")
            center/cover no-repeat;
          filter: brightness(0.2);
          z-index: -1;
        }

        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .nav-btn {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .title {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0;
        }

        .container {
          max-width: 600px;
          margin: auto;
          padding: 2rem 1.5rem;
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .history-card {
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 16px;
          backdrop-filter: blur(5px);
          transition: transform 0.2s, background 0.2s;
        }

        .history-card:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .history-main {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .mobile {
          font-size: 1.1rem;
          font-weight: 600;
          color: #818cf8;
        }

        .price {
          font-size: 1.2rem;
          font-weight: 700;
          color: #fff;
        }

        .history-details {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: #cbd5e1;
        }

        .date {
          color: #94a3b8;
        }

        .no-data {
          text-align: center;
          color: #94a3b8;
          margin-top: 40px;
        }

        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 60px;
          gap: 15px;
        }

        .loader {
          width: 40px;
          height: 40px;
          border: 3px solid #334155;
          border-top: 3px solid #6366f1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}