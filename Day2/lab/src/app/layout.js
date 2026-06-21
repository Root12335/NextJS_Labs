"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  useEffect(() => {
    if (typeof window !== undefined) {
      require("bootstrap/dist/js/bootstrap.min.js")
    }
  }, []);
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
