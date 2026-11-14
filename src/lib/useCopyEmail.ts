"use client";

import { useCallback } from "react";
import { profile } from "@/data/profile";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useToast } from "@/components/providers/ToastProvider";

/** Copies the e-mail and confirms with a toast (works on touch, where there is no hover tooltip). */
export function useCopyEmail() {
  const { t } = useLanguage();
  const toast = useToast();

  return useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast(t.actions.email_copied);
    } catch {
      toast(`${t.actions.copy_failed} ${profile.email}`);
    }
  }, [t, toast]);
}
