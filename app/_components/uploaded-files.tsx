"use client";
import React from "react";
import Image from "next/image";
import type { UploadedFile } from "@/types";

import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { EmptyCard } from "@/components/empty-card";
import { CircleCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface UploadedFilesCardProps {
 uploadedFiles: UploadedFile[];
}

export default function UploadedFilesCard({
 uploadedFiles,
}: UploadedFilesCardProps) {
 const handleCopy = async (value: string) => {
  try {
   await navigator.clipboard.writeText(value);
   toast.success("Text copied to clipboard!");
  } catch (err) {
   console.error("Failed to copy text: ", err);
   toast.error("Failed to copy text to clipboard.");
  }
 };
 return (
  <Card>
   <CardHeader className="">
    <CardTitle className="mx-auto">
     <CircleCheck fill="green" color="#fff" size={48} />
    </CardTitle>
    <CardDescription className="text-center text-xl">
     Uploaded successfully!
    </CardDescription>
   </CardHeader>
   <CardContent>
    {uploadedFiles.length > 0 ? (
     <ScrollArea className="pb-4">
      <div className="flex flex-col w-max space-x-2.5">
       {uploadedFiles.map((file) => (
        <div
         key={file.key}
         className="flex flex-col  relative aspect-video w-96"
        >
         <Image
          src={file.url}
          alt={file.name}
          fill
          sizes="(min-width: 640px) 640px, 100vw"
          loading="lazy"
          className="rounded-md object-cover"
         />
        </div>
       ))}

       {uploadedFiles.map((file) => (
        <div className=" mt-6" key={file.key}>
         <div className="flex w-full max-w-sm items-center space-x-2">
          <Input disabled id="fileurl" value={file.url} />
          <Button
           onClick={() => handleCopy(file.url)}
           className="bg-blue-600 text-white rounded-r-md"
          >
           Copy
          </Button>
         </div>
        </div>
       ))}
      </div>
      <ScrollBar orientation="horizontal" />
     </ScrollArea>
    ) : (
     <EmptyCard
      title="No files uploaded"
      description="Upload some files to see them here"
      className="w-full"
     />
    )}
   </CardContent>
  </Card>
 );
}
