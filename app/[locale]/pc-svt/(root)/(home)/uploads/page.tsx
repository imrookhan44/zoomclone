'use client';
import React, { useState, useEffect } from 'react';
import { uploadPdfFile } from '@/lib/firebaseUtils';
import { fetchPdfFiles } from '@/lib/firebaseUtils';

const Uploads = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState('');
  const [pdfFiles, setPdfFiles] = useState<{ id: string; file_url: string; file_name: string }[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;

    try {
      setUploadProgress(0);
      const { id, fileUrl } = await uploadPdfFile(file);
      setDownloadURL(fileUrl);
      setPdfFiles([...pdfFiles, { id, file_url: fileUrl, file_name: file.name }]);
    } catch (error) {
      console.error('Upload failed', error);
    }
  };

  useEffect(() => {
    const fetchFiles = async () => {
      const files = await fetchPdfFiles();
      setPdfFiles(files);
    };
    fetchFiles();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Upload PDF File</h1>
      <div className="flex justify-center mb-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="border border-gray-300 p-2 rounded-md"
        />
        <button
          onClick={handleFileUpload}
          className="bg-blue-500 text-white py-2 px-4 rounded ml-2"
        >
          Upload
        </button>
      </div>
      {uploadProgress > 0 && (
        <div className="mt-4 text-center">
          <p>Upload Progress: {Math.round(uploadProgress)}%</p>
        </div>
      )}
      {downloadURL && (
        <div className="mt-4 text-center">
          <p className="font-semibold">Download URL:</p>
          <a
            href={downloadURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {downloadURL}
          </a>
        </div>
      )}
      <h2 className="text-xl font-bold mt-8 mb-4 text-center">Uploaded PDF Files</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pdfFiles.map((file) => (
          <div key={file.id} className="border p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">{file.file_name}</h3>
            <iframe
              src={file.file_url}
              className="w-full h-64 border border-gray-300 rounded-md mt-2"
              title={file.file_name}
            ></iframe>
            <div className="mt-2 text-center">
              <a
                href={file.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View PDF
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Uploads;
