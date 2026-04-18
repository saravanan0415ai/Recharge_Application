"use client";
import { useState, useEffect } from "react";

export default function Coupons() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [code, setCode] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("coupons") || "[]");
    setCoupons(stored);
  }, []);

  const addCoupon = () => {
    const updated = [...coupons, { code }];
    localStorage.setItem("coupons", JSON.stringify(updated));
    setCoupons(updated);
    setCode("");
  };

  return (
    <div>
      <h2>Coupons</h2>

      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Coupon Code"
      />

      <button onClick={addCoupon}>Add</button>

      {coupons.map((c, i) => (
        <div key={i}>{c.code}</div>
      ))}
    </div>
  );
}