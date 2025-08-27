import React, { useState } from "react";

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("No file selected.");
      return;
    }

    setUploadStatus("Uploading...");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadStatus("✅ File uploaded successfully!");
        setUploadedFileUrl(`http://localhost:4000${data.file.fileUrl}`);
      } else {
        setUploadStatus(`❌ Upload failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("⚠️ Error uploading file. Please check if the server is running.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ marginBottom: "1.5rem", color: "#333" }}>Upload a File</h2>
      
      <div style={{ marginBottom: "1rem" }}>
        <input 
          type="file" 
          onChange={handleFileChange}
          style={{ 
            padding: "0.5rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
            width: "100%"
          }}
        />
      </div>

      {selectedFile && (
        <div style={{ 
          marginBottom: "1rem", 
          padding: "1rem", 
          backgroundColor: "#f5f5f5", 
          borderRadius: "4px",
          fontSize: "0.9rem"
        }}>
          <p><strong>Selected File:</strong> {selectedFile.name}</p>
          <p><strong>Size:</strong> {(selectedFile.size / 1024).toFixed(2)} KB</p>
          <p><strong>Type:</strong> {selectedFile.type || 'Unknown'}</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!selectedFile}
        style={{ 
          padding: "0.75rem 1.5rem",
          backgroundColor: selectedFile ? "#007bff" : "#ccc",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: selectedFile ? "pointer" : "not-allowed",
          fontSize: "1rem"
        }}
      >
        Upload
      </button>

      {uploadStatus && (
        <div style={{ 
          marginTop: "1rem", 
          padding: "0.75rem",
          backgroundColor: uploadStatus.includes("✅") ? "#d4edda" : 
                          uploadStatus.includes("❌") ? "#f8d7da" : "#fff3cd",
          border: `1px solid ${uploadStatus.includes("✅") ? "#c3e6cb" : 
                              uploadStatus.includes("❌") ? "#f5c6cb" : "#ffeaa7"}`,
          borderRadius: "4px",
          color: uploadStatus.includes("✅") ? "#155724" : 
                 uploadStatus.includes("❌") ? "#721c24" : "#856404"
        }}>
          {uploadStatus}
        </div>
      )}

      {uploadedFileUrl && (
        <div style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "#e8f5e8", borderRadius: "4px" }}>
          <h3 style={{ marginBottom: "0.5rem" }}>Upload Successful!</h3>
          <p><strong>File URL:</strong> <a href={uploadedFileUrl} target="_blank" rel="noreferrer">{uploadedFileUrl}</a></p>
          
          {/* If it's an image, show preview */}
          {selectedFile?.type.startsWith("image/") && (
            <div style={{ marginTop: "1rem" }}>
              <p><strong>Preview:</strong></p>
              <img
                src={uploadedFileUrl}
                alt="Uploaded"
                style={{ maxWidth: "100%", maxHeight: "300px", borderRadius: "4px" }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
