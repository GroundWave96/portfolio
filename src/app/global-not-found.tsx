import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Logo } from "@/components/Logo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "404 · Gabriel Pimentel",
  description: "Página não encontrada.",
  robots: { index: false },
};

/** Shown for any URL that doesn't exist (the site has two root layouts, so it can't reuse one). */
export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="flex min-h-svh items-center justify-center bg-zinc-950 px-6 font-sans text-zinc-50 antialiased">
        <main className="flex max-w-md flex-col items-center gap-6 text-center">
          <Logo className="h-8 w-auto text-zinc-500" />
          <p className="font-mono text-sm tracking-widest text-zinc-500">404</p>
          <h1 className="text-3xl font-medium tracking-tight">Página não encontrada</h1>
          <p className="text-zinc-400">
            Este endereço não existe ou mudou de lugar.
            <br />
            <span className="text-zinc-500">This page doesn&apos;t exist or has moved.</span>
          </p>
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-full bg-zinc-100 px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-white"
          >
            Ir para o início · Go home
          </Link>
        </main>
      </body>
    </html>
  );
}
