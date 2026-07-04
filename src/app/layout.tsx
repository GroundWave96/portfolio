import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Background } from "@/components/Background";
import { ScrollToTop } from "@/components/ScrollToTop";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gabriel Pimentel | Portfólio",
  description: "Desenvolvedor de Software e UI/UX",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased scroll-smooth`}>
      <body className="font-sans bg-zinc-950 text-zinc-50 antialiased selection:bg-zinc-700 selection:text-white">
        <LanguageProvider>
          <Background />
          <ScrollToTop /> 
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}