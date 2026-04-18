"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack, IoLogOutOutline } from "react-icons/io5";

type Plan = {
  id: number;
  price: number;
  data: string;
  validity: string;
  speed: string;
  tag?: string;
  isPopular?: boolean;
};

export default function Home() {
  const router = useRouter();

  const [step, setStep] = useState<"plans" | "confirm" | "payment" | "success">("plans");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const plans: Plan[] = [
    { id: 1, price: 149, data: "1GB/day", validity: "20 Days", speed: "4G" },
    { id: 2, price: 199, data: "1.5GB/day", validity: "28 Days", speed: "4G" },
    { id: 3, price: 239, data: "2GB/day", validity: "24 Days", speed: "4G" },
    { id: 4, price: 299, data: "2GB/day", validity: "28 Days", speed: "5G", isPopular: true, tag: "Best" },
    { id: 5, price: 399, data: "2.5GB/day", validity: "28 Days", speed: "5G" },
    { id: 6, price: 479, data: "3GB/day", validity: "28 Days", speed: "5G" },
  ];

  const handlePayment = () => {
    setStep("payment");
    setTimeout(() => setStep("success"), 2000);
  };

  return (
    <div className="wrapper">
      {/* Background */}
      <div className="bg-layer" />

      {/* 🔝 SAME NAVBAR */}
      <header className="nav">
        <button onClick={() => router.back()} className="nav-btn">
          <IoArrowBack />
        </button>

        <h2 className="title">Select Plan</h2>

        <button onClick={() => router.push("/")} className="nav-btn">
          <IoLogOutOutline />
        </button>
      </header>

      <main className="container">
        {step === "plans" && (
          <>
            <p className="subtitle">Choose your recharge plan</p>

            <div className="grid">
              {plans.map((p) => (
                <div
                  key={p.id}
                  className={`card ${p.isPopular ? "highlight" : ""}`}
                  onClick={() => {
                    setSelectedPlan(p);
                    setStep("confirm");
                  }}
                >
                  {p.tag && <div className="tag">{p.tag}</div>}

                  {/* 💰 PRICE (FIXED VISIBILITY) */}
                  <div className="price">₹{p.price}</div>

                  <div className="info">
                    <span>{p.data}</span>
                    <span>{p.validity}</span>
                  </div>

                  <div className="speed">{p.speed}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {step === "confirm" && selectedPlan && (
          <div className="card center">
            <h2>Confirm Plan</h2>
            <p>{selectedPlan.data}</p>
            <p>{selectedPlan.validity}</p>
            <h3 className="price big">₹{selectedPlan.price}</h3>

            <button className="btn primary" onClick={handlePayment}>
              Pay Now
            </button>

            <button className="btn secondary" onClick={() => setStep("plans")}>
              Back
            </button>
          </div>
        )}

        {step === "payment" && (
          <div className="center">
            <div className="loader"></div>
            <p>Processing...</p>
          </div>
        )}

        {step === "success" && (
          <div className="card center">
            <h2>Success</h2>
            <p>Recharge Completed</p>

            <button className="btn primary" onClick={() => setStep("plans")}>
              Done
            </button>
          </div>
        )}
      </main>

      <style jsx>{`
        .wrapper {
          min-height: 100vh;
          position: relative;
          color: #fff;
          font-family: "Inter", sans-serif;
        }

        /* SAME BACKGROUND */
        .bg-layer {
          position: fixed;
          inset: 0;
          background: url("https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop")
            center/cover no-repeat;
          filter: brightness(0.35);
          z-index: -2;
        }

        .bg-layer::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
        }

        /* NAVBAR */
        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem 1.5rem;
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
          font-size: 1.1rem;
          font-weight: 600;
        }

        .container {
          max-width: 500px;
          margin: auto;
          padding: 2rem 1.5rem;
          text-align: center;
        }

        .subtitle {
          color: #cbd5f5;
          margin-bottom: 2rem;
        }

        /* GRID */
        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        /* CARD */
        .card {
          position: relative;
          padding: 20px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transition: border 0.2s;
        }

        .card:hover {
          border-color: rgba(255, 255, 255, 0.25);
        }

        .highlight {
          border-color: #6366f1;
        }

        .tag {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #6366f1;
          font-size: 10px;
          padding: 3px 8px;
          border-radius: 8px;
        }

        /* 💰 PRICE FIX */
        .price {
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 6px;
        }

        .price.big {
          font-size: 28px;
        }

        .info {
          font-size: 12px;
          color: #e2e8f0;
          display: flex;
          flex-direction: column;
        }

        .speed {
          margin-top: 8px;
          font-size: 11px;
          color: #818cf8;
        }

        .center {
          margin-top: 40px;
        }

        .btn {
          width: 100%;
          padding: 12px;
          margin-top: 10px;
          border-radius: 10px;
          border: none;
        }

        .primary {
          background: #6366f1;
          color: white;
        }

        .secondary {
          background: transparent;
          color: #aaa;
        }

        .loader {
          width: 40px;
          height: 40px;
          border: 3px solid #444;
          border-top: 3px solid #6366f1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: auto;
        }

        /* 🔥 GLOBAL TEXT VISIBILITY FIX */
h1, h2, h3 {
  color: #ffffff;
  font-weight: 600;
}

p {
  color: #e5e7eb; /* lighter gray (visible) */
}

/* subtitles */
.subtitle {
  color: #cbd5f5;
}

/* confirm + success text */
.center p {
  color: #e2e8f0;
  font-size: 0.95rem;
}

/* strong highlight text */
.highlight-text {
  color: #ffffff;
  font-weight: 600;
}
  
        @keyframes spin {
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}