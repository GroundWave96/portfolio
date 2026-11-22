import { HomePage } from "@/views/HomePage";
import { homeMetadata } from "@/lib/metadata";
import { isLang } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return isLang(lang) ? homeMetadata(lang) : {};
}

export default function Page() {
  return <HomePage />;
}
