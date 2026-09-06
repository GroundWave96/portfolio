// src/components/Footer.tsx
import { Logo } from "./Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full">
        <div className="flex flex-col items-center justify-center gap-2 border-t border-white/5">
          <Logo className="h-5 w-auto text-zinc-500 opacity-50 mt-2" />
          <span className="text-xs font-medium text-zinc-500 tracking-wide text-center mb-2">
            © {currentYear} Gabriel Pimentel. Todos os direitos reservados.
          </span>
        </div>
    </footer>
  );
}