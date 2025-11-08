"use client";
import { useUser } from "@clerk/nextjs";
import CopilotChat from "./CopilotChat";

export default function CopilotChatWrapper() {
  const { user } = useUser();

  if (!user) return null; // no bubble if not logged in

  return <CopilotChat userId={user.id} />;
}
