import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "../components/theme/theme-provider";
import { AuthProvider } from "../contexts/auth-context";
import { MatchmakingProvider } from "../contexts/matchmaking-context";
import { CartProvider } from "../contexts/cart-context";
import "./globals.css";
import "../styles/utilities.css";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aura - Hong Kong's Art Community Platform",
  description: "A platform for Hong Kong artists to gain recognition, fair compensation, and collaboration opportunities.",
  keywords: ["art", "hong kong", "artists", "community", "collaboration", "digital art", "traditional art"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider defaultTheme="system" enableSystem>
          <AuthProvider>
            <CartProvider>
              <MatchmakingProvider>
                {children}
              </MatchmakingProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
