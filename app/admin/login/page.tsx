"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import data from "../../data/data.json";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

const handleLogin = () => {
  if (!email || !password) {
    showToast("Please fill all fields");
    return;
  }

  const user = data.users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    showToast("Invalid credentials");
    return;
  }

  // Save user
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.removeItem("guest");

  // 🔀 ROLE BASED REDIRECT
  if (user.role === "admin") {
    router.push("/admin");
  } else {
    router.push("/dashboard");
  }
};

  const handleGuest = () => {
  localStorage.setItem("guest", "true");
  localStorage.removeItem("user");
  router.push("/operator");
};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Login</h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>

        <button onClick={handleGuest} style={styles.button}>
          Continue as Guest
        </button>

        <p onClick={() => router.push("/signup")} style={styles.link}>
          Go to Signup
        </p>
      </div>
    </div>
  );
}

const styles: any = {
  container: { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" },
  card: { padding: 20, background: "#111", color: "#fff", borderRadius: 10 },
  input: { display: "block", margin: "10px 0", padding: 10, width: 250 },
  button: { marginTop: 10, padding: 10, width: "100%" },
  link: { marginTop: 10, color: "cyan", cursor: "pointer" }
};