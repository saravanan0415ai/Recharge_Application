import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "app", "data", "data.json");

// Read users safely
const readUsers = () => {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(content);
    return data.users || [];
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

    const content = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(content);
    const users = data.users || [];

    const exists = users.find((u: any) => u.email === email);
    if (exists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    users.push({
      id: Date.now(),
      email,
      password,
      role: "user"
    });

    data.users = users;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

    return NextResponse.json({ message: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { message: "Error saving user" },
      { status: 500 }
    );
  }
}