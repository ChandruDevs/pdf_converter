import React from "react";

const FileUpload = () => {
  const uploadFile = async () => {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
      alert("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("pdfFile", file);
    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("show");
      } else {
        alert("Error uploading file");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <input type="file" id="fileInput" />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
};

export default FileUpload;
