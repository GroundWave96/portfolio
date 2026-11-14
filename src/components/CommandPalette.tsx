"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Copy, CornerDownLeft, FileText, Globe, Hash, Layers, Search } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { projects } from "@/data/projects";
import { profile, whatsappUrl } from "@/data/profile";
import { OPEN_PALETTE_EVENT, OPEN_PROJECT_EVENT, SECTIONS } from "@/lib/sections";
import { useCopyEmail } from "@/lib/useCopyEmail";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "./BrandIcons";

interface Item {
  id: string;
  group: string;
  label: string;
  hint?: string;
  keywords?: string;
  icon: ReactNode;
  run: () => void;
}

/** Lowercase and strip accents so "formacao" finds "Formação". */
const normalize = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const LANG_NAMES = { pt: "Português", en: "English", es: "Español", it: "Italiano" } as const;

export function CommandPalette() {
  const { t, lang, setLang, languages } = useLanguage();
  const copyEmail = useCopyEmail();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const show = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setIndex(0);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    returnFocus.current?.focus?.();
  }, []);

  // Ctrl/Cmd + K anywhere, or "/" when not typing; plus the header button.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && e.target.closest("input, textarea, [contenteditable]");
      if ((e.key.toLowerCase() === "k" && (e.ctrlKey || e.metaKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        if (open) close();
        else show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, show);
    };
  }, [open, show, close]);

  // Lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const items = useMemo<Item[]>(() => {
    const goTo = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    const openUrl = (url: string) => () => window.open(url, "_blank", "noopener,noreferrer");
    return [
      ...SECTIONS.map((s) => ({
        id: `section-${s.id}`,
        group: t.cmdk.sections,
        label: t.nav[s.label],
        keywords: s.id,
        icon: <Hash className="size-4" />,
        run: goTo(s.id),
      })),
      ...projects.map((p) => ({
        id: `project-${p.id}`,
        group: t.cmdk.projects,
        label: t.projects.items[p.id].title,
        hint: p.stack.slice(0, 3).join(" · "),
        keywords: p.stack.join(" "),
        icon: <Layers className="size-4" />,
        run: () => {
          document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" });
          window.dispatchEvent(new CustomEvent(OPEN_PROJECT_EVENT, { detail: p.id }));
        },
      })),
      {
        id: "copy-email",
        group: t.cmdk.actions,
        label: t.actions.copy_email,
        hint: profile.email,
        keywords: "email e-mail mail",
        icon: <Copy className="size-4" />,
        run: copyEmail,
      },
      {
        id: "whatsapp",
        group: t.cmdk.actions,
        label: t.cmdk.open_whatsapp,
        icon: <WhatsappIcon className="size-4" />,
        run: openUrl(whatsappUrl(t.actions.whatsapp_message)),
      },
      {
        id: "linkedin",
        group: t.cmdk.actions,
        label: t.cmdk.open_linkedin,
        icon: <LinkedinIcon className="size-4" />,
        run: openUrl(profile.links.linkedin),
      },
      {
        id: "github",
        group: t.cmdk.actions,
        label: t.cmdk.open_github,
        icon: <GithubIcon className="size-4" />,
        run: openUrl(profile.links.github),
      },
      {
        id: "cv",
        group: t.cmdk.actions,
        label: t.cmdk.open_cv,
        keywords: "cv curriculo resume pdf",
        icon: <FileText className="size-4" />,
        run: openUrl(profile.cv[lang]),
      },
      ...languages.map((l) => ({
        id: `lang-${l}`,
        group: t.cmdk.language,
        label: LANG_NAMES[l],
        hint: l === lang ? "✓" : l.toUpperCase(),
        keywords: `language idioma lingua ${l}`,
        icon: <Globe className="size-4" />,
        run: () => setLang(l),
      })),
    ];
  }, [t, lang, languages, setLang, copyEmail]);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return items;
    return items.filter((i) => normalize(`${i.label} ${i.hint ?? ""} ${i.keywords ?? ""} ${i.group}`).includes(q));
  }, [items, query]);

  const safeIndex = Math.min(index, Math.max(filtered.length - 1, 0));

  const runItem = (item: Item | undefined) => {
    if (!item) return;
    setOpen(false);
    // Let the dialog close before scrolling or opening another dialog.
    window.setTimeout(item.run, 60);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((safeIndex + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((safeIndex - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runItem(filtered[safeIndex]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  // Keep the highlighted row in view.
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${safeIndex}"]`)?.scrollIntoView({ block: "nearest" });
  }, [safeIndex]);

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-80 flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} aria-hidden />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.search}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/90 shadow-2xl backdrop-blur-xl"
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-white/5 px-4">
              <Search className="size-4 shrink-0 text-zinc-500" aria-hidden />
              <input
                ref={inputRef}
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                placeholder={t.cmdk.placeholder}
                aria-label={t.cmdk.placeholder}
                aria-controls="cmdk-list"
                aria-activedescendant={filtered[safeIndex] ? `cmdk-${filtered[safeIndex].id}` : undefined}
                role="combobox"
                aria-expanded="true"
                className="h-13 w-full bg-transparent text-[15px] text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus-visible:outline-none"
              />
              <kbd className="hidden rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 sm:inline">Esc</kbd>
            </div>

            <div ref={listRef} id="cmdk-list" role="listbox" className="max-h-[min(60vh,420px)] overflow-y-auto overscroll-contain p-2">
              {filtered.length === 0 && <p className="px-3 py-8 text-center text-sm text-zinc-500">{t.cmdk.empty}</p>}
              {filtered.map((item, i) => {
                const header = item.group !== lastGroup ? item.group : null;
                lastGroup = item.group;
                const selected = i === safeIndex;
                return (
                  <div key={item.id}>
                    {header && <div className="eyebrow px-3 pt-3 pb-1.5">{header}</div>}
                    <button
                      type="button"
                      id={`cmdk-${item.id}`}
                      role="option"
                      aria-selected={selected}
                      data-index={i}
                      onMouseMove={() => setIndex(i)}
                      onClick={() => runItem(item)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                        selected ? "bg-white/[0.07] text-zinc-50" : "text-zinc-300"
                      }`}
                    >
                      <span className="text-zinc-500">{item.icon}</span>
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.hint && <span className="truncate font-mono text-[11px] text-zinc-500">{item.hint}</span>}
                      {selected && (item.group === t.cmdk.actions ? (
                        <ArrowUpRight className="size-3.5 shrink-0 text-zinc-500" aria-hidden />
                      ) : (
                        <CornerDownLeft className="size-3.5 shrink-0 text-zinc-500" aria-hidden />
                      ))}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="hidden items-center gap-4 border-t border-white/5 px-4 py-2.5 font-mono text-[10.5px] text-zinc-500 sm:flex">
              <span>↑ ↓ {t.cmdk.navigate}</span>
              <span>↵ {t.cmdk.select}</span>
              <span>esc {t.cmdk.close}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
