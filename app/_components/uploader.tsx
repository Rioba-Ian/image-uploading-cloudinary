"use client";

import { useUploadFile } from "@/hooks/use-upload-file";
import FileUploader from "@/components/file-uploader";
import UploadedFilesCard from "./uploaded-files";

export function BasicUploaderDemo() {
 const { uploadFile, uploadedFiles, isUploading } = useUploadFile();

 console.log(uploadedFiles);

 return (
  <div className="space-y-6">
   <FileUploader
    maxFiles={1} // Set maxFiles to 1 since your API allows uploading one file at a time
    maxSize={4 * 1024 * 1024}
    onUpload={async (files) => files.forEach(uploadFile)} // Call uploadFile for each file
    disabled={isUploading}
   />
   <UploadedFilesCard uploadedFiles={uploadedFiles} />
  </div>
 );
}
