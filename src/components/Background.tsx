/** Slow-moving colour fields behind the page. Static when reduced motion is on. */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-[#050506]">
      <div className="aurora-a absolute -left-[15%] -top-[20%] h-[70vh] w-[70vw] rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.11),transparent)]" />
      <div className="aurora-b absolute -right-[20%] top-[5%] h-[65vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.08),transparent)]" />
      <div className="aurora-c absolute -bottom-[25%] left-[20%] h-[70vh] w-[70vw] rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.06),transparent)]" />
      {/* Fine grain keeps the gradients from banding. */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
