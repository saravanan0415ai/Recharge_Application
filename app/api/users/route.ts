import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "app", "data", "users.json");

// Read users safely
const readUsers = () => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
};

// GET → fetch users
export async function GET() {
  return NextResponse.json(readUsers());
}

// POST → add user
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const users = readUsers();

    const exists = users.find((u: any) => u.email === email);
    if (exists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    users.push({ email, password });

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");

    return NextResponse.json({ message: "Signup successful" });
  } catch (err) {
    return NextResponse.json(
      { message: "Error saving user" },
      { status: 500 }
    );
  }
}