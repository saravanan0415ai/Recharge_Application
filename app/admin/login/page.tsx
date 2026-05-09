"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoPersonOutline } from "react-icons/io5";
export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const handleLogin = async () => {
    console.log("Login attempt with:", email);
    if (!email || !password) {
      showToast("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
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
    <div className="login-wrapper">
      {/* Background with overlay */}
      <div className="bg-overlay" />
      
      {/* Toast Notification */}
      {toast && <div className="toast-msg">{toast}</div>}

      <div className="glass-card">
        <div className="header">
          <IoPersonOutline size={50} color="#fff" />
          <h2>Admin Login</h2>
          <p>Sign in to manage your application</p>
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="admin@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="glass-input"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="glass-input"
          />
        </div>

        <button onClick={handleLogin} disabled={loading} className="login-btn">
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        <button onClick={handleGuest} className="guest-btn">
          Continue as Guest
        </button>

        <div className="footer">
          <p>
            Don't have an account?{" "}
            <span onClick={() => router.push("/signup")}>Sign up</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        .login-wrapper {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
          background: url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop')
            center/cover no-repeat;
        }

        .bg-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          z-index: 1;
        }

        .glass-card {
          width: 100%;
          max-width: 400px;
          padding: 40px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          position: relative;
          z-index: 2;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .header {
          text-align: center;
          margin-bottom: 32px;
        }

        .header h2 {
          color: #fff;
          font-size: 1.75rem;
          margin: 12px 0 4px;
          font-weight: 700;
        }

        .header p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.85rem;
          margin-bottom: 8px;
          margin-left: 4px;
        }

        .glass-input {
          width: 100%;
          padding: 14px 18px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: #fff;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .glass-input:focus {
          outline: none;
          border-color: rgba(59, 130, 246, 0.5);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }

        .login-btn {
          width: 100%;
          padding: 14px;
          background: #3b82f6;
          border: none;
          border-radius: 12px;
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
        }

        .login-btn:hover {
          background: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -5px rgba(59, 130, 246, 0.4);
        }

        .divider {
          text-align: center;
          margin: 24px 0;
          position: relative;
        }

        .divider::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
        }

        .divider span {
          background: #111;
          padding: 0 12px;
          color: rgba(255, 255, 255, 0.3);
          font-size: 0.75rem;
          position: relative;
          z-index: 1;
        }

        .guest-btn {
          width: 100%;
          padding: 14px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: #fff;
          font-weight: 500;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .guest-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .footer {
          margin-top: 32px;
          text-align: center;
        }

        .footer p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.85rem;
        }

        .footer span {
          color: #3b82f6;
          cursor: pointer;
          font-weight: 500;
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        .toast-msg {
          position: fixed;
          top: 32px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(239, 68, 68, 0.9);
          backdrop-filter: blur(8px);
          padding: 12px 24px;
          border-radius: 12px;
          color: #fff;
          z-index: 100;
          font-weight: 500;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from { transform: translate(-50%, -20px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}