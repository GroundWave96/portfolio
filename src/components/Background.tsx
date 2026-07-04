export function Background() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-zinc-950 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-indigo-900/20 blur-[120px] transform-gpu will-change-transform"></div>
      
      <div className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-slate-800/30 blur-[120px] transform-gpu will-change-transform"></div>
      
      <div className="absolute top-[40%] left-[30%] h-[30%] w-[40%] rounded-full bg-zinc-800/30 blur-[100px] transform-gpu will-change-transform"></div>
    </div>
  );
}