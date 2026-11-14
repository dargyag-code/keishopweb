export function BurstDoodle({ color = "#FDDF59", className = "w-10 h-10" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M12 22 L4 10" stroke={color} strokeWidth="5" strokeLinecap="round" />
      <path d="M24 18 L24 4" stroke={color} strokeWidth="5" strokeLinecap="round" />
      <path d="M36 22 L44 10" stroke={color} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function SpiralDoodle({ color = "#FDDF59", className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      <path
        d="M32 30 C32 25, 25 25, 25 31 C25 39, 38 40, 40 30 C42 18, 22 14, 16 27 C10 41, 29 52, 46 43"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AsteriskDoodle({ color = "#FDDF59", className = "w-9 h-9" }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path d="M20 4 V36 M4 20 H36 M9 9 L31 31 M31 9 L9 31" stroke={color} strokeWidth="5.5" strokeLinecap="round" />
    </svg>
  );
}

export function HeartDoodle({ color = "#8504CF", className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
      <path
        d="M18 31 C18 31, 4 21.5, 4 12.5 C4 7.8, 7.8 4.5, 12 4.5 C14.9 4.5, 17 6.2, 18 8.2 C19 6.2, 21.1 4.5, 24 4.5 C28.2 4.5, 32 7.8, 32 12.5 C32 21.5, 18 31, 18 31 Z"
        fill={color}
      />
    </svg>
  );
}
