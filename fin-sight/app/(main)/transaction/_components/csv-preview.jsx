"use client";

export default function CsvPreview({ rows }) {
  if (!rows || rows.length === 0) return null;

  return (
    <table className="table-auto w-full border mt-4">
      <thead>
        <tr>
          {Object.keys(rows[0]).map((col) => (
            <th key={col} className="border px-2 py-1">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {Object.values(row).map((val, j) => (
              <td key={j} className="border px-2 py-1">{val}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
