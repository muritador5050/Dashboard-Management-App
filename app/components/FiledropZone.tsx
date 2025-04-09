'use client';
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';

type FileDropzoneProps = {
  onFilesChange: (files: File[]) => void;
};

export default function FileDropzone({ onFilesChange }: FileDropzoneProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    const updatedFiles = [...files, ...acceptedFiles];
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/pdf': ['.pdf'],
    },
    multiple: true,
  });

  return (
    <div className='p-6 border-2 border-dashed border-blue-700 rounded-lg text-center'>
      <div
        {...getRootProps()}
        className={`p-10 h-48 flex justify-center items-center  bg-blue-500 opacity-25  border-2 border-dashed rounded-lg cursor-pointer transition ${
          isDragActive ? 'border-blue-500 bg-gray-100' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <p className='text-white'>
          {isDragActive
            ? 'Drop the files here...'
            : 'Drop files here to upload'}
        </p>
      </div>

      {/* File Preview */}
      {files.length > 0 && (
        <div className='mt-4'>
          <h3 className='text-lg font-semibold'>Uploaded Files</h3>
          <ul className='mt-2 list-disc list-inside'>
            {files.map((file, index) => (
              <li key={index} className='text-gray-700'>
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
