import { Header } from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-[200vh] pt-32 px-4 flex flex-col items-center">
        <h1 className="text-3xl font-light text-zinc-300 tracking-tight mb-8">
          Portfólio em construção...
        </h1>
        <p className="max-w-2xl text-center text-zinc-500">
          Role a página para baixo para testar o efeito de vidro (Glassmorphism) no Header passando por cima deste texto.
        </p>
      </main>
    </>
  );
}