import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "app", "data", "history.json");

// Helper to read history
const readHistory = () => {
  try {
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content || "[]");
  } catch (error) {
    console.error("Error reading history:", error);
    return [];
  }
};

// GET → Fetch all history
export async function GET() {
  const history = readHistory();
  return NextResponse.json(history);
}

// POST → Add new recharge record
export async function POST(req: Request) {
  try {
    const record = await req.json();
    const history = readHistory();

    const newRecord = {
      id: Date.now(),
      ...record,
      timestamp: new Date().toISOString(),
    };

    history.unshift(newRecord); // Add to the beginning

    fs.writeFileSync(filePath, JSON.stringify(history, null, 2), "utf-8");

    return NextResponse.json({ message: "History saved successfully", record: newRecord });
  } catch (err) {
    console.error("Error saving history:", err);
    return NextResponse.json(
      { message: "Error saving history" },
      { status: 500 }
    );
  }
}
