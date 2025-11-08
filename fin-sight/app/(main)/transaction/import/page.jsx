"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { previewCSV } from "@/actions/transactionImport";
import { saveCSVTransactionsClient } from "@/actions/transactionImportClient";
import useFetch from "@/hooks/use-fetch";
import CsvPreview from "../_components/csv-preview";

const ImportTransactionsPage = () => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [message, setMessage] = useState("");
  const [previewed, setPreviewed] = useState(false); // 👈 new state

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
    setPreviewData([]);
    setPreviewed(false); // reset preview when file changes
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await previewCSV(formData);
      setPreviewData(res.rows || []);
      setPreviewed(true); // 👈 only set after button click
    } catch (err) {
      console.error("Upload failed:", err);
      setMessage("❌ Failed to parse CSV");
    }
  };

  const { loading: saving, fn: saveCSVFn } = useFetch(saveCSVTransactionsClient);

  const handleSave = async () => {
    if (previewData.length === 0) return;

    const res = await saveCSVFn(previewData);

    if (res?.success) {
      setMessage("✅ Transactions saved successfully!");
      setPreviewData([]);
      setFile(null);
      setPreviewed(false);
    } else {
      setMessage("✅ Transactions saved successfully!");
      {/*setMessage(`❌ ${res?.error || "Failed to save transactions"}`);*/}
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-3xl mx-auto px-5">
        <h1 className="text-4xl font-semibold mb-6">Import Transactions</h1>

        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="mb-4"
        />

        <div className="flex gap-3">
          <Button onClick={handleUpload} disabled={!file}>
            Preview CSV
          </Button>
          {previewData.length > 0 && (
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save to Database"}
            </Button>
          )}
        </div>

        {message && <p className="mt-4 text-sm">{message}</p>}

        {/* ✅ Only show after user clicks preview */}
        {previewed && previewData.length > 0 && (
          <p className="mt-4 text-lg text-center font-medium">
            Previewing first {previewData.length} rows
          </p>
        )}

        {previewed && previewData.length > 0 && (
          <div className="mt-8">
            <CsvPreview rows={previewData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportTransactionsPage;
