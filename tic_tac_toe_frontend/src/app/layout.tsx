import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tic Tac Toe — Ocean Professional",
  description:
    "Play a modern, minimalist Tic Tac Toe game in your browser. No servers, just fun.",
  metadataBase:
    typeof window === "undefined" ? new URL("http://localhost:3000") : undefined,
  openGraph: {
    title: "Tic Tac Toe — Ocean Professional",
    description:
      "Play a modern, minimalist Tic Tac Toe game in your browser. No servers, just fun.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tic Tac Toe — Ocean Professional",
    description:
      "Play a modern, minimalist Tic Tac Toe game in your browser. No servers, just fun.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Body includes base gradient background and text color per theme.
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="min-h-screen text-[#111827] bg-[#f9fafb] antialiased selection:bg-blue-200/60 selection:text-[#111827]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
