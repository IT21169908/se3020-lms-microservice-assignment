import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import NavBar from "@/app/components/navbar/NavBar";
import {NextAuthProvider} from "@/app/providers/NextAuthProvider";
import {NextInitProvider} from "@/app/providers/NextInitProvider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Easy Learny",
  description: "Easy learn everything",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  return (
      <html lang="en">
        <body className={inter.className}>
        <NextInitProvider>
            <NextAuthProvider>
              <NavBar/>
              <main className="flex min-h-screen flex-col items-center justify-between p-24">
                {children}
              </main>
            </NextAuthProvider>
        </NextInitProvider>
        </body>
      </html>
  );
}
