// app/api/safe/route.js
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import aj from "@/lib/arcjet";

export async function GET(req) {
  const { userId } = await auth();

  // Protect with Arcjet
  const decision = await aj.protect(req, { 
    userId: userId || "anonymous",
    requested: 1
  });

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
    
    if (decision.reason.isBot()) {
      return NextResponse.json(
        { error: "Bot detected" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  // Your API logic here
  return NextResponse.json({ 
    success: true,
    message: "Safe endpoint is working!",
    userId: userId || "anonymous"
  });
}

export async function POST(req) {
  const { userId } = await auth();

  // Protect with Arcjet
  const decision = await aj.protect(req, { 
    userId: userId || "anonymous",
    requested: 1
  });

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
    
    if (decision.reason.isBot()) {
      return NextResponse.json(
        { error: "Bot detected" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  // Your API logic here
  return NextResponse.json({ success: true });
}