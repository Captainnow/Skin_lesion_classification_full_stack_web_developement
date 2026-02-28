// src/components/UploadCard.tsx

import React, { useState, DragEvent, ChangeEvent, useRef } from "react";

interface UploadCardProps {
  onImageSelect: (file: File, preview: string) => void;
  isAnalyzing?: boolean;
}

const UploadCard: React.FC<UploadCardProps> = ({ onImageSelect, isAnalyzing }) => {
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isHandlingRef = useRef(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (isAnalyzing) return; // Ignore if busy
    if (!files || files.length === 0) return;
    if (isHandlingRef.current) return;

    const file = files[0];
    if (!file.type.startsWith("image/")) {
      setError("Only image files are supported.");
      return;
    }

    isHandlingRef.current = true;
    const preview = URL.createObjectURL(file);
    setError(null);
    onImageSelect(file, preview);

    setTimeout(() => {
      isHandlingRef.current = false;
    }, 0);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    if (e.target) e.target.value = "";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAnalyzing && !isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div className={`card p-6 ${isAnalyzing ? "opacity-50 pointer-events-none" : ""}`}>
      <h2 className="text-xl font-semibold mb-4">
        Upload Skin Lesion Image
      </h2>

      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
          } ${isAnalyzing ? "cursor-not-allowed bg-slate-50" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <p className="mb-2">
          {isAnalyzing ? "Analyzing..." : "Drag and drop an image here, or click to browse."}
        </p>
        <p className="text-xs text-gray-500">
          Supported formats: JPG, PNG, HEIC, etc.
        </p>

        <input
          ref={inputRef}
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          disabled={isAnalyzing}
          className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
      </div>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default UploadCard;
