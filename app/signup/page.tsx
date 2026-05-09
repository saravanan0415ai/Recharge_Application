"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoPersonAddOutline } from "react-icons/io5";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Signup successful 🎉");
    router.push("/");
  };

  return (
    <div className="signup-bg">
      <div className="bg-layer" />
      
      <div className="d-flex align-items-center justify-content-center vh-100 px-3">
        <div className="glass-card p-4 w-100" style={{ maxWidth: "380px" }}>
          
          <div className="text-center mb-4">
            <div className="mb-2">
              <IoPersonAddOutline size={40} color="#fff" />
            </div>
            <h2 className="fw-bold text-white">Create Account</h2>
            <p className="small text-light opacity-75">
              Join us today 🚀
            </p>
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Email Address</label>
            <input
              type="email"
              className="form-control glass-input rounded-3"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Password</label>
            <input
              type="password"
              className="form-control glass-input rounded-3"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Confirm Password</label>
            <input
              type="password"
              className="form-control glass-input rounded-3"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button onClick={handleSignup} className="btn glass-btn w-100 rounded-3 mt-3">
            Sign Up
          </button>

          <div className="text-center mt-4">
            <small className="text-light opacity-75">
              Already have an account?{" "}
              <span
                onClick={() => router.push("/")}
                style={{ cursor: "pointer", textDecoration: "underline", color: "#3b82f6" }}
              >
                Login
              </span>
            </small>
          </div>
        </div>
      </div>

      <style jsx>{`
        .signup-bg {
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

        .glass-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .glass-input {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: #fff;
        }

        .glass-input::placeholder {
          color: #cbd5e1;
        }

        .glass-input:focus {
          outline: none;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
          background: rgba(255, 255, 255, 0.25);
        }

        .glass-btn {
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          color: white;
          border: none;
          font-weight: 600;
          transition: 0.3s;
        }

        .glass-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  );
}