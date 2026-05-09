"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoPersonOutline } from "react-icons/io5";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [toast, setToast] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      localStorage.removeItem("guest");
    }
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const handleLogin = async () => {
    console.log("Main Login attempt with:", email);
    if (!email || !password) {
      showToast("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      // Fetch users from API instead of using static import
      const res = await fetch("/api/users");
      const users = await res.json();

      const user = users.find(
        (u: any) => u.email === email && u.password === password
      );

      console.log("User found:", user);

      if (!user) {
        showToast("Invalid credentials");
        setLoading(false);
        return;
      }

      // Save user
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.removeItem("guest");

      console.log("Redirecting to:", user.role === "admin" ? "/admin" : "/dashboard");

      // 🔀 ROLE BASED REDIRECT
      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      showToast("Connection error. Try again.");
    } finally {
      setLoading(false);
    }
  };

const handleGuest = () => {
  localStorage.setItem("guest", "true");
  localStorage.removeItem("user");
  router.push("/operator");
};

  return (
    <div className="login-bg">
      <div className="bg-layer" />
      <div className="d-flex align-items-center justify-content-center vh-100 px-3">

        {/* Toast */}
        {toast && <div className="toast-msg">{toast}</div>}

        <div className="glass-card p-4 w-100" style={{ maxWidth: "380px" }}>

          {/* Title */}
          <div className="text-center mb-4">
            <div className="mb-2">
              <IoPersonOutline size={40} color="#fff" />
            </div>
            <h2 className="fw-bold text-white">Recharge App</h2>
            <p className="small text-light opacity-75">
              Welcome back 👋
            </p>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label text-light">Email</label>
            <input
              type="email"
              className="form-control glass-input rounded-3"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="form-label text-light">Password</label>
            <input
              type="password"
              className="form-control glass-input rounded-3"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="btn glass-btn w-100 rounded-3 mt-3"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Divider */}
          <div className="text-center my-3 text-light opacity-75">
            — or —
          </div>

          {/* Guest Button */}
          <button
            onClick={handleGuest}
            className="btn glass-btn w-100 rounded-3"
          >
            Continue as Guest
          </button>

          {/* Footer */}
          <div className="text-center mt-4">
            <small className="text-light opacity-75">
              Don’t have an account?{" "}
              <span
                onClick={() => router.push("/signup")}
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                Sign up
              </span>
            </small>
          </div>

        </div>

      </div>

      {/* STYLES */}
      <style jsx>{`
        .login-bg {
          min-height: 100vh;
          background: url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop')
            center/cover no-repeat;
          filter: brightness(1);
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

        .toast-msg {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.8);
          padding: 10px 20px;
          border-radius: 10px;
          color: white;
        }
      `}</style>
    </div>
  );
}