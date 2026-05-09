"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack, IoLogOutOutline, IoFlash, IoCalendar, IoWifi } from "react-icons/io5";

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
    { id: 4, price: 299, data: "2GB/day", validity: "28 Days", speed: "5G", isPopular: true, tag: "BEST VALUE" },
    { id: 5, price: 399, data: "2.5GB/day", validity: "28 Days", speed: "5G" },
    { id: 6, price: 479, data: "3GB/day", validity: "28 Days", speed: "5G" },
  ];

  const handlePayment = async () => {
    setStep("payment");

    const mobile = localStorage.getItem("mobile") || "Unknown";
    const rechargeData = {
      mobile,
      price: selectedPlan?.price,
      data: selectedPlan?.data,
      validity: selectedPlan?.validity,
      date: new Date().toLocaleDateString(),
    };

    try {
      await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rechargeData),
      });
    } catch (error) {
      console.error("Failed to save history:", error);
    }

    setTimeout(() => setStep("success"), 2000);
  };

  return (
    <div className="wrapper">
      {/* Background */}
      <div className="bg-layer" />

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
            <p className="subtitle">Choose a plan that fits your needs</p>

            <div className="plan-list">
              {plans.map((p) => (
                <div
                  key={p.id}
                  className={`plan-card ${p.isPopular ? "featured" : ""}`}
                  onClick={() => {
                    setSelectedPlan(p);
                    setStep("confirm");
                  }}
                >
                  {p.tag && <div className="tag-badge">{p.tag}</div>}
                  
                  <div className="plan-header">
                    <div className="price-info">
                      <span className="currency">₹</span>
                      <span className="amount">{p.price}</span>
                    </div>
                    <div className="plan-speed">
                      <IoWifi /> {p.speed}
                    </div>
                  </div>

                  <div className="plan-body">
                    <div className="detail">
                      <IoFlash className="icon" />
                      <span>{p.data} Data</span>
                    </div>
                    <div className="detail">
                      <IoCalendar className="icon" />
                      <span>{p.validity} Validity</span>
                    </div>
                  </div>

                  <div className="plan-footer">
                    <button className="select-btn">Select Plan</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {step === "confirm" && selectedPlan && (
          <div className="confirm-card">
            <h2>Confirm Recharge</h2>
            <div className="confirm-details">
               <div className="conf-item">
                  <span>Plan Amount</span>
                  <strong>₹{selectedPlan.price}</strong>
               </div>
               <div className="conf-item">
                  <span>Data Benefit</span>
                  <strong>{selectedPlan.data}</strong>
               </div>
               <div className="conf-item">
                  <span>Validity</span>
                  <strong>{selectedPlan.validity}</strong>
               </div>
            </div>

            <button className="pay-btn" onClick={handlePayment}>
              Proceed to Pay ₹{selectedPlan.price}
            </button>

            <button className="back-link" onClick={() => setStep("plans")}>
              Change Plan
            </button>
          </div>
        )}

        {step === "payment" && (
          <div className="loader-box">
            <div className="spinner"></div>
            <p>Processing Payment...</p>
          </div>
        )}

        {step === "success" && (
          <div className="success-box">
             <div className="success-icon">✓</div>
            <h2>Recharge Successful</h2>
            <p>Your plan will be activated shortly</p>

            <button className="done-btn" onClick={() => router.push("/dashboard")}>
              Go to Dashboard
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
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: 0.2s;
        }

        .nav-btn:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .title {
          font-size: 1.2rem;
          font-weight: 700;
          margin: 0;
          letter-spacing: 0.5px;
        }

        .container {
          max-width: 600px;
          margin: auto;
          padding: 2rem 1.2rem;
          text-align: center;
        }

        .subtitle {
          color: #94a3b8;
          margin-bottom: 2.5rem;
          font-size: 1rem;
        }

        /* PLAN LIST */
        .plan-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .plan-card {
          position: relative;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: left;
          overflow: hidden;
        }

        .plan-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(99, 102, 241, 0.5);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }

        .featured {
          border-color: rgba(99, 102, 241, 0.4);
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(255, 255, 255, 0.05));
        }

        .tag-badge {
          position: absolute;
          top: 0;
          right: 0;
          background: #6366f1;
          color: white;
          font-size: 10px;
          font-weight: 800;
          padding: 6px 15px;
          border-bottom-left-radius: 15px;
          letter-spacing: 1px;
        }

        .plan-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
        }

        .price-info {
          display: flex;
          align-items: baseline;
        }

        .currency {
          font-size: 1.2rem;
          font-weight: 600;
          color: #6366f1;
          margin-right: 2px;
        }

        .amount {
          font-size: 2.2rem;
          font-weight: 800;
        }

        .plan-speed {
          background: rgba(99, 102, 241, 0.2);
          color: #818cf8;
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .plan-body {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }

        .detail {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #cbd5e1;
          font-size: 0.95rem;
        }

        .icon {
          color: #6366f1;
          font-size: 1.1rem;
        }

        .select-btn {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: none;
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          font-weight: 600;
          transition: 0.2s;
        }

        .plan-card:hover .select-btn {
          background: #6366f1;
        }

        /* CONFIRM BOX */
        .confirm-card {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 30px;
          backdrop-filter: blur(20px);
        }

        .confirm-details {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 16px;
          padding: 20px;
          margin: 24px 0;
          text-align: left;
        }

        .conf-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .conf-item:last-child {
          border-bottom: none;
        }

        .conf-item span {
          color: #94a3b8;
        }

        .pay-btn {
          width: 100%;
          padding: 16px;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: white;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
        }

        .back-link {
          background: none;
          border: none;
          color: #94a3b8;
          margin-top: 15px;
          cursor: pointer;
          text-decoration: underline;
        }

        /* SUCCESS & LOADER */
        .loader-box {
          margin-top: 50px;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-top: 4px solid #6366f1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        .success-box {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 40px 20px;
        }

        .success-icon {
          width: 70px;
          height: 70px;
          background: #10b981;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin: 0 auto 24px;
        }

        .done-btn {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: none;
          background: #6366f1;
          color: white;
          font-weight: 700;
          margin-top: 30px;
        }

        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}