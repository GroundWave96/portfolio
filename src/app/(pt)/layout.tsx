import type { ReactNode } from "react";
import { RootShell } from "@/components/RootShell";
import { baseMetadata } from "@/lib/metadata";

export const metadata = baseMetadata;
export { viewport } from "@/lib/metadata";

/** Root layout for the Portuguese pages, served without a language prefix. */
export default function PortugueseLayout({ children }: { children: ReactNode }) {
  return <RootShell lang="pt">{children}</RootShell>;
}
