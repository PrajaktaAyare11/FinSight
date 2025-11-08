"use client";
import { useState } from "react";
import { useTheme } from "next-themes";

export default function CopilotChat({ userId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { role: "user", text: input }]);
    setLoading(true);

    const res = await fetch("/api/copilot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input, userId }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: data.answer },
    ]);

    setInput("");
    setLoading(false);
  };

  return (
    <div
      className={`fixed bottom-4 right-4 w-80 flex flex-col rounded-2xl border backdrop-blur-md shadow-xl transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-900/80 border-gray-700 text-gray-100"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="p-3 font-semibold border-b border-gray-300 dark:border-gray-700">
        💡 AI Copilot
      </div>

      {/* Chat window */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm max-h-96">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded-xl ${
              m.role === "user"
                ? theme === "dark"
                  ? "bg-gray-800 text-right text-gray-100"
                  : "bg-gray-100 text-right text-gray-900"
                : theme === "dark"
                ? "bg-gray-700 text-left text-gray-200"
                : "bg-gray-50 text-left text-gray-800"
            }`}
          >
            {m.text}
          </div>
        ))}
        {loading && <div className="text-gray-500 italic">Thinking...</div>}
      </div>

      {/* Input */}
      <div className="p-2 border-t border-gray-300 dark:border-gray-700 flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 bg-transparent border rounded-lg px-2 py-1 text-sm outline-none placeholder-gray-400 dark:placeholder-gray-500 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500"
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-3 py-1 rounded-lg font-medium transition-colors duration-200
          bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900 hover:opacity-90"
        >
          Send
        </button>
      </div>
    </div>
  );
}
