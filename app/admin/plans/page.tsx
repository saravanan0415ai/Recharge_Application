"use client";
import { useState, useEffect } from "react";

export default function Plans() {
  const [plans, setPlans] = useState<any[]>([]);
  const [form, setForm] = useState({ price: "", data: "", validity: "" });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("plans") || "[]");
    setPlans(stored);
  }, []);

  const savePlans = (data: any[]) => {
    localStorage.setItem("plans", JSON.stringify(data));
    setPlans(data);
  };

  const addPlan = () => {
    const newPlan = { ...form, id: Date.now() };
    savePlans([...plans, newPlan]);
    setForm({ price: "", data: "", validity: "" });
  };

  const deletePlan = (id: number) => {
    savePlans(plans.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h2>Plans</h2>

      <input
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <input
        placeholder="Data"
        value={form.data}
        onChange={(e) => setForm({ ...form, data: e.target.value })}
      />
      <input
        placeholder="Validity"
        value={form.validity}
        onChange={(e) => setForm({ ...form, validity: e.target.value })}
      />

      <button onClick={addPlan}>Add Plan</button>

      <ul>
        {plans.map((p) => (
          <li key={p.id}>
            ₹{p.price} - {p.data} - {p.validity}
            <button onClick={() => deletePlan(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}