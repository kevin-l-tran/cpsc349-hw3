import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Movie Explorer",
  description: "Find new movies!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
