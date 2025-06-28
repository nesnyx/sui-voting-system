"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "@mysten/dapp-kit/dist/index.css"
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit"
import { networkConfig } from "@/config/networkConfig";
import { AuthProvider } from "@/contexts/WalletContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const queryClient = new QueryClient()


export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider defaultNetwork="testnet" networks={networkConfig}>
        <WalletProvider autoConnect>
          <AuthProvider>
            <html lang="en">
              <title>Avoting</title>
              <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
              >
                {children}
              </body>
            </html>
          </AuthProvider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
