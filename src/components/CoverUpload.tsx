"use client";

import { useState } from "react";

interface Props {
  onUpload: (url: string, publicId: string) => void;
  currentUrl?: string;
}

export default function CoverUpload({ onUpload, currentUrl }: Props) {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const { url, publicId } = await res.json();
    setPreview(url);
    onUpload(url, publicId);
    setUploading(false);
  };

  return (
    <label
      className="flex-1 border border-dashed border-[#2f3133] hover:border-green-400 transition-colors cursor-pointer"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
      }}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      {uploading ? (
        <div className="h-24 flex items-center justify-center">
          <span className="text-[11px] text-green-400 animate-pulse">// uploading...</span>
        </div>
      ) : preview ? (
        <div className="h-24 flex items-center gap-3 px-3">
          <img src={preview} alt="cover preview" className="h-20 w-14 object-cover border border-[#2f3133]" />
          <span className="text-[11px] text-green-400">// uploaded. click to replace</span>
        </div>
      ) : (
        <div className="h-24 flex flex-col items-center justify-center gap-1">
          <span className="text-[#4b5563] text-xs tracking-wide">drop image or click to upload</span>
          <span className="text-[10px] text-[#374151]">// jpg, png, webp</span>
        </div>
      )}
    </label>
  );
}
