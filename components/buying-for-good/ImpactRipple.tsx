export function ImpactRipple() {
  return (
    <div
      className="hero-ripple pointer-events-none absolute left-1/2 top-[57%] z-[1] h-[min(70vw,900px)] w-[min(70vw,900px)] -translate-x-1/2 -translate-y-1/2 opacity-60 sm:top-[58%]"
      aria-hidden="true"
    >
      <svg viewBox="0 0 800 800" className="h-full w-full overflow-visible" fill="none">
        <circle cx="400" cy="400" r="86" stroke="rgba(232,247,239,0.28)" />
        <circle cx="400" cy="400" r="176" stroke="rgba(232,247,239,0.19)" />
        <circle cx="400" cy="400" r="282" stroke="rgba(232,247,239,0.13)" />
        <circle cx="400" cy="400" r="392" stroke="rgba(232,247,239,0.08)" />
        <path d="M400 315V485M315 400H485" stroke="rgba(232,247,239,0.24)" strokeWidth="1" />
        <circle cx="400" cy="400" r="5" fill="rgba(255,229,178,0.9)" />
      </svg>
    </div>
  );
}
