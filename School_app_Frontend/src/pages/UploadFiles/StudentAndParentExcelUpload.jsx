import React, { useState } from "react";

const StudentAndParentExcelUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const schoolId = import.meta.env.VITE_SchoolId;
      console.log("schoolId", schoolId);
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/upload-bulk-students/${schoolId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      console.log("response", response);

      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to upload file: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred during upload.");
    }
  };

  return (
    <div className="flex flex-col items-center bg-[#283046] p-6 rounded shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-black mb-6">
        Upload Student and Parent Data (Excel File)
      </h2>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="block w-full px-4 py-2 text-lg text-black border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        onClick={handleUpload}
        className="mt-4 px-6 py-2 bg-[#7367F0] text-white font-medium rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      >
        Upload
      </button>
    </div>
  );
};

export default StudentAndParentExcelUpload;
