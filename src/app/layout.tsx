import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AICompanionDock } from "@/components/ui/liquid-glass";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "EchoEarth | The Temporal Mirror",
  description: "A personalized climate lifestyle studio. See your carbon shadow and explore alternate futures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        suppressHydrationWarning
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        {/* Global AI Companion Dock */}
        <AICompanionDock />
      </body>
    </html>
  );
}
