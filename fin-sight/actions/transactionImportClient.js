export const saveCSVTransactionsClient = async (rows) => {
  const res = await fetch("/api/saveCsv", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ rows }),
  });

  if (!res.ok) {
    return { success: false, error: `Request failed: ${res.status}` };
  }

  return res.json();
};
