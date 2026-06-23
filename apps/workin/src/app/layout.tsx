import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WorkIn | MYMS Operations",
  description: "Private MYMS operations dashboard for Martin and Mateo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
