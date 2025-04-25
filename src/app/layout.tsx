import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import Option from "@/components/Option";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Let Us Cook",
  description: "Find your recipe!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}>
        <Navbar/>
        <SearchBar/>
        <Option/>
        {children}
      </body>
    </html>
  );
}
