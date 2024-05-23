import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const poppins = Poppins({
 style: "normal",
 weight: ["400", "600", "800"],
 subsets: [],
});

export const metadata: Metadata = {
 title: "Upload Images",
 description: "Upload your images and have them saved to a cloud platform.",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="en">
   <body className={poppins.className}>
    {children}
    <Toaster richColors />
   </body>
  </html>
 );
}
