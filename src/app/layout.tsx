import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AICompanionDock } from "@/components/ui/liquid-glass";
import { PendoInitializer } from "@/components/PendoInitializer";

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
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(apiKey){
    (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
    v=['initialize','identify','updateOptions','pageLoad','track','trackAgent'];for(w=0,x=v.length;w<x;++w)(function(m){
    o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
    y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
    z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
})('dc4e3cea-02c7-467e-8135-3fed20be85b3');`
        }} />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <PendoInitializer />
        {children}
        {/* Global AI Companion Dock */}
        <AICompanionDock />
      </body>
    </html>
  );
}
