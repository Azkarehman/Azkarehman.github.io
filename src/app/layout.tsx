import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Azka Rehman | AI Researcher",
  description:
    "AI Researcher specializing in deep learning, computer vision, and medical imaging. Seoul National University.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
