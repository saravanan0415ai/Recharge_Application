"use client";
import { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("history") || "[]");
    setHistory(stored);
  }, []);

  return (
    <div>
      <h2>Recharge History</h2>

      {history.map((h, i) => (
        <div key={i}>
          {h.mobile} - ₹{h.amount} - {h.date}
        </div>
      ))}
    </div>
  );
}