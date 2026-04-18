"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ color: "#fff" }}>Signup</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleSignup} style={styles.btn}>
          Sign Up
        </button>

        <p style={styles.link} onClick={() => router.push("/")}>
          Already have account? Login
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('5137774.webp')",
    backgroundSize: "cover",
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",
    padding: "30px",
    borderRadius: "12px",
    width: "320px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
    border: "1px solid rgba(255,255,255,0.2)",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    background: "#020617",
    color: "#fff",
    border: "1px solid #475569",
    transition: "0.3s",
  },

  btn: {
    padding: "12px",
    background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },

  link: {
    textAlign: "center" as const,
    color: "#38bdf8",
    cursor: "pointer",
  },
};