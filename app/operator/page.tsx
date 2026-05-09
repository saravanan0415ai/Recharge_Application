"use client";

import { useRouter } from "next/navigation";
import { IoArrowBack, IoLogOutOutline } from "react-icons/io5";
import Image from "next/image";

import jio from "@/app/assets/jio.png";
import airtel from "@/app/assets/airtel.png";
import vi from "@/app/assets/vi.png";
import bsnl from "@/app/assets/bsnl.png";

export default function Operator() {
  const router = useRouter();

  const operators = [
    { id: "jio", img: jio },
    { id: "airtel", img: airtel },
    { id: "vi", img: vi },
    { id: "bsnl", img: bsnl },
  ];

  const handleSelect = (id: string) => {
    localStorage.setItem("operator", id);
    router.push("/plans");
  };

  return (
    <div className="wrapper">
      {/* Background Image */}
      <div className="bg-layer" />

      <header className="nav">
        <button onClick={() => router.back()} className="nav-btn">
          <IoArrowBack />
        </button>

        <h2 className="title">Select Operator</h2>

        <button onClick={() => router.push("/")} className="nav-btn">
          <IoLogOutOutline />
        </button>
      </header>

      <main className="container">
        <p className="subtitle">
          Choose your network provider to continue
        </p>

        <div className="grid">
          {operators.map((op) => (
            <button
              key={op.id}
              className="card"
              onClick={() => handleSelect(op.id)}
            >
              <div className="logo-box">
                <Image
                  src={op.img}
                  alt={op.id}
                  width={70}
                  height={70}
                />
              </div>
            </button>
          ))}
        </div>
      </main>

      <style jsx>{`
        .wrapper {
          min-height: 100vh;
          position: relative;
          color: #fff;
          font-family: "Inter", sans-serif;
        }

        /* 🖼️ Background */
        .bg-layer {
          position: fixed;
          inset: 0;
          background: url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop")
            center/cover no-repeat;
          filter: brightness(0.2);
          z-index: -2;
        }

        /* 🔝 Navbar */
        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
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

        /* 📦 Main */
        .container {
          max-width: 500px;
          margin: auto;
          padding: 2rem 1.5rem;
          text-align: center;
        }

        .subtitle {
          color: #cbd5f5;
          margin-bottom: 2rem;
          font-size: 0.95rem;
        }

        /* 🧱 Grid */
        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        /* 🧊 Card */
        .card {
          border-radius: 18px;
          padding: 25px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          justify-content: center;
          align-items: center;
          transition: border 0.2s ease, background 0.2s ease;
        }

        .card:hover {
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.06);
        }

        .logo-box {
          background: #fff;
          border-radius: 14px;
          padding: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* 📱 Mobile */
        @media (max-width: 480px) {
          .grid {
            gap: 14px;
          }

          .card {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}