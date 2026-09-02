import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const anton = Anton({ 
  weight: "400", 
  subsets: ["latin"], 
  variable: "--font-anton" 
});

export const metadata: Metadata = {
  title: "K - F ©",
  description: "Digital Designer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${anton.variable} font-sans antialiased bg-[#E6E5E0]`}>
        {children}
      </body>
    </html>
  );
}