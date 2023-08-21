import "./globals.css";
import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

const plex_sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const plex_mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Catppuccin + Tailwind",
  description: "A showcase of @catppuccin/tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${plex_mono.className} ${plex_sans.className}`}>
        {children}
      </body>
    </html>
  );
}
