import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Courses - Ignite Lab",
  description: "Built during Ignite Lab course",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
