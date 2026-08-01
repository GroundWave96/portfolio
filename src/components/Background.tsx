export function Background() {
  return (
    <div
      className="fixed inset-0 -z-50 pointer-events-none bg-black"
      style={{
        backgroundImage: `
          radial-gradient(circle at 15% 20%, rgba(59,130,246,0.08) 0%, transparent 35%),
          radial-gradient(circle at 85% 25%, rgba(99,102,241,0.06) 0%, transparent 30%),
          radial-gradient(circle at 50% 85%, rgba(16,185,129,0.05) 0%, transparent 35%)
        `,
      }}
    />
  );
}