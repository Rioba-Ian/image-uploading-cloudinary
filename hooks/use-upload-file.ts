import * as React from "react";
import { UploadedFile } from "@/types";
import { toast } from "sonner";

interface UseUploadFileProps {
 defaultUploadedFiles?: UploadedFile[];
}

export function useUploadFile({
 defaultUploadedFiles = [],
}: UseUploadFileProps = {}) {
 const [uploadedFiles, setUploadedFiles] =
  React.useState<UploadedFile[]>(defaultUploadedFiles);
 const [isUploading, setIsUploading] = React.useState(false);

 async function uploadFile(file: File) {
  setIsUploading(true);

  try {
   const formData = new FormData();
   formData.append("file", file);

   const response = await fetch(
    "https://living-merrie-rioba-ian-a8872d45.koyeb.app/file",
    {
     method: "POST",
     body: formData,
    }
   );

   if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
   }

   const data = await response.json();
   const uploadedFile: UploadedFile = {
    name: file.name,
    type: file.type,
    size: file.size,
    url: data.data.data,
   };

   setUploadedFiles((prev) => [...prev, uploadedFile]);
  } catch (err) {
   if (err instanceof Error) toast.error(err.message);
  } finally {
   setIsUploading(false);
  }
 }

 return { uploadedFiles, uploadFile, isUploading };
}
