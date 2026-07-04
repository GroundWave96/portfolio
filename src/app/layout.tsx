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
  metadataBase: new URL("https://gabrielpimentel.pages.dev/"),

  title: "Gabriel Pimentel | Desenvolvedor Front-end",
  description: "Engenheiro de formação e desenvolvedor por paixão. Criando experiências digitais fluidas, minimalistas e de alta performance.",

  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },

  openGraph: {
    title: "Gabriel Pimentel | Desenvolvedor Front-end",
    description: "Criando experiências digitais fluidas e de alta performance.",
    url: "https://gabrielpimentel.pages.dev/",
    siteName: "Gabriel Pimentel Portfolio",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Gabriel Pimentel Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Gabriel Pimentel | Desenvolvedor Front-end",
    description: "Engenheiro de formação e desenvolvedor por paixão. Criando experiências digitais fluidas, minimalistas e de alta performance.",
    images: ["/opengraph-image.png"],
  },
  
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased scroll-smooth`}>
      <body className="font-sans bg-zinc-950 text-zinc-50 antialiased selection:bg-zinc-700 selection:text-white">
        <LanguageProvider>
          {/* <Background /> */}
          <ScrollToTop /> 
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}