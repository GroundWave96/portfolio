import { HomePage } from "@/views/HomePage";
import { homeMetadata } from "@/lib/metadata";

export const metadata = homeMetadata("pt");

export default function Page() {
  return <HomePage />;
}
