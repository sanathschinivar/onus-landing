export default function ChargingSceneFallback({ style }) {
  return (
    <svg
      className="charging-scene-fallback"
      viewBox="0 0 500 540"
      aria-hidden="true"
      focusable="false"
      style={style}
    >
      <g strokeLinejoin="round" strokeLinecap="round">
        <path d="M337 -12c-2 31 1 54 13 77" fill="none" stroke="#1b272c" strokeWidth="13" />
        <path d="M337 -12c-2 31 1 54 13 77" fill="none" stroke="currentColor" strokeWidth="4" opacity=".65" />

        <path d="M347 69c17 29 27 54 18 82" fill="none" stroke="#1b272c" strokeWidth="43" />
        <path d="M347 69c17 29 27 54 18 82" fill="none" stroke="currentColor" strokeWidth="27" />
        <path d="M347 77c13 22 21 41 15 60" fill="none" stroke="#299093" strokeWidth="4" />
        <circle cx="348" cy="67" r="25" fill="#1b272c" stroke="currentColor" strokeWidth="6" />
        <circle cx="348" cy="67" r="13" fill="#26373a" stroke="#ffbd00" strokeWidth="3" />
        <circle cx="348" cy="67" r="4" fill="#58e6c1" />

        <path d="M365 151c-4 28-12 49-21 73" fill="none" stroke="#1b272c" strokeWidth="36" />
        <path d="M365 151c-4 28-12 49-21 73" fill="none" stroke="currentColor" strokeWidth="22" />
        <path d="M363 157c-4 23-10 40-17 57" fill="none" stroke="#299093" strokeWidth="4" />
        <circle cx="344" cy="232" r="20" fill="#1b272c" stroke="currentColor" strokeWidth="5" />
        <circle cx="344" cy="232" r="8" fill="#58e6c1" />

        <rect x="306" y="244" width="76" height="86" rx="23" fill="#1b272c" stroke="currentColor" strokeWidth="6" />
        <rect x="316" y="252" width="56" height="55" rx="16" fill="currentColor" />
        <path d="M324 263h40" stroke="#299093" strokeWidth="4" />
        <path d="M316 315h56v48h-56z" fill="#2a3a3e" stroke="currentColor" strokeWidth="5" />
        <rect x="322" y="357" width="44" height="67" rx="17" fill="currentColor" stroke="#9bb7b3" strokeWidth="4" />
        <path d="M325 419h38" stroke="#ffbd00" strokeWidth="8" />
        <path d="M335 427v9m18-9v9" stroke="#1b272c" strokeWidth="5" />
      </g>
    </svg>
  );
}
