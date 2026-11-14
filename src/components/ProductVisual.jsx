export default function ProductVisual({ type }) {
  switch (type) {
    case "cream":
      return (
        <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-md" fill="none">
          <circle cx="120" cy="126" r="92" fill="#F9EEFF" />
          {/* Sparkles */}
          <path d="M46 66 L50 56 L54 66 L64 70 L54 74 L50 84 L46 74 L36 70 Z" fill="#FDDF59" />
          <circle cx="192" cy="72" r="7" fill="#F6C8DF" />
          <circle cx="182" cy="176" r="5" fill="#1EC9A0" />
          {/* Jar body */}
          <rect x="64" y="88" width="112" height="92" rx="22" fill="#8504CF" />
          <rect x="64" y="88" width="112" height="92" rx="22" stroke="#4B0078" strokeWidth="4" />
          {/* Lid */}
          <rect x="58" y="64" width="124" height="28" rx="12" fill="#F6C8DF" stroke="#4B0078" strokeWidth="4" />
          <rect x="74" y="70" width="38" height="6" rx="3" fill="#FFFFFF" opacity="0.6" />
          {/* Label */}
          <rect x="76" y="106" width="88" height="58" rx="14" fill="#FFFFFF" />
          <path
            d="M95 124 C102 115, 114 115, 120 124 C126 133, 138 133, 145 124"
            stroke="#8504CF"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <text
            x="120"
            y="148"
            textAnchor="middle"
            fill="#8504CF"
            fontSize="12"
            fontWeight="700"
            fontFamily="Mali, sans-serif"
          >
            ALWAYS CURLY
          </text>
        </svg>
      );

    case "gel":
      return (
        <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-md" fill="none">
          <circle cx="120" cy="126" r="92" fill="#FFF0F7" />
          <path d="M182 54 L185 46 L188 54 L196 57 L188 60 L185 68 L182 60 L174 57 Z" fill="#8504CF" />
          <circle cx="58" cy="158" r="7" fill="#FDDF59" />
          {/* Pump */}
          <path d="M106 46 H144 L148 54 H114 V68 H106 V46 Z" fill="#4B0078" />
          <rect x="102" y="66" width="36" height="14" rx="5" fill="#1EC9A0" stroke="#4B0078" strokeWidth="3.5" />
          {/* Bottle */}
          <rect x="80" y="80" width="80" height="114" rx="22" fill="#B589D6" stroke="#4B0078" strokeWidth="4" />
          <rect x="89" y="96" width="10" height="72" rx="5" fill="#FFFFFF" opacity="0.35" />
          {/* Label */}
          <rect x="90" y="108" width="60" height="62" rx="12" fill="#FFFFFF" />
          <path d="M120 120 C110 132, 110 144, 120 144 C130 144, 130 132, 120 120 Z" fill="#1EC9A0" />
          <text
            x="120"
            y="160"
            textAnchor="middle"
            fill="#8504CF"
            fontSize="10"
            fontWeight="700"
            fontFamily="Mali, sans-serif"
          >
            GEL LINO
          </text>
        </svg>
      );

    case "brush":
      return (
        <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-md" fill="none">
          <circle cx="120" cy="126" r="92" fill="#F0FDFA" />
          <circle cx="62" cy="70" r="8" fill="#F6C8DF" />
          <path d="M180 160 L184 150 L188 160 L198 164 L188 168 L184 178 L180 168 L170 164 Z" fill="#FDDF59" />
          <g transform="rotate(-28 120 125)">
            {/* Handle */}
            <rect x="111" y="128" width="18" height="72" rx="9" fill="#8504CF" stroke="#4B0078" strokeWidth="4" />
            {/* Brush head */}
            <rect x="90" y="54" width="60" height="82" rx="24" fill="#B589D6" stroke="#4B0078" strokeWidth="4" />
            {/* Flexi rows */}
            {[68, 80, 92, 104, 116].map((y) => (
              <line key={y} x1="98" y1={y} x2="142" y2={y} stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
            ))}
          </g>
        </svg>
      );

    case "spray":
      return (
        <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-md" fill="none">
          <circle cx="120" cy="126" r="92" fill="#F9EEFF" />
          {/* Mist drops */}
          <circle cx="66" cy="68" r="5" fill="#2DD4BF" />
          <circle cx="52" cy="80" r="4" fill="#8504CF" />
          <circle cx="64" cy="90" r="3.5" fill="#F13076" />
          {/* Spray nozzle */}
          <path d="M84 60 H136 L142 74 H104 L94 84 L84 74 V60 Z" fill="#F6C8DF" stroke="#4B0078" strokeWidth="4" />
          {/* Bottle */}
          <rect x="88" y="82" width="66" height="114" rx="22" fill="#2DD4BF" stroke="#4B0078" strokeWidth="4" />
          <rect x="97" y="108" width="48" height="60" rx="12" fill="#FFFFFF" />
          <text
            x="121"
            y="142"
            textAnchor="middle"
            fill="#8504CF"
            fontSize="10.5"
            fontWeight="700"
            fontFamily="Mali, sans-serif"
          >
            REFRESH
          </text>
        </svg>
      );

    case "bonnet":
      return (
        <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-md" fill="none">
          <circle cx="120" cy="126" r="92" fill="#FFF0F7" />
          <path d="M180 62 L184 52 L188 62 L198 66 L188 70 L184 80 L180 70 L170 66 Z" fill="#FDDF59" />
          {/* Bonnet puff */}
          <path
            d="M60 130 C52 80, 92 54, 128 58 C168 62, 192 94, 180 132 C175 148, 164 156, 152 158 H88 C74 158, 63 146, 60 130 Z"
            fill="#8504CF"
            stroke="#4B0078"
            strokeWidth="4"
          />
          {/* Elastic satin band */}
          <rect x="74" y="148" width="92" height="22" rx="11" fill="#F6C8DF" stroke="#4B0078" strokeWidth="4" />
          {/* Cute bow */}
          <circle cx="120" cy="159" r="7" fill="#FDDF59" stroke="#4B0078" strokeWidth="3" />
        </svg>
      );

    case "oil":
      return (
        <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-md" fill="none">
          <circle cx="120" cy="126" r="92" fill="#FFFBEB" />
          {/* Dropper */}
          <path d="M110 46 C110 38, 130 38, 130 46 V68 H110 V46 Z" fill="#4B0078" />
          <rect x="102" y="66" width="36" height="14" rx="5" fill="#FDDF59" stroke="#4B0078" strokeWidth="3.5" />
          {/* Glass bottle */}
          <rect x="86" y="82" width="68" height="106" rx="18" fill="#FFD166" stroke="#4B0078" strokeWidth="4" />
          <rect x="96" y="106" width="48" height="58" rx="10" fill="#FFFFFF" />
          <path d="M120 116 C112 128, 112 138, 120 138 C128 138, 128 128, 120 116 Z" fill="#F13076" />
          <text
            x="120"
            y="153"
            textAnchor="middle"
            fill="#4B0078"
            fontSize="10"
            fontWeight="700"
            fontFamily="Mali, sans-serif"
          >
            ELIXIR
          </text>
        </svg>
      );

    default: // kit
      return (
        <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-md" fill="none">
          <circle cx="120" cy="126" r="92" fill="#F9EEFF" />
          <path d="M52 64 L56 54 L60 64 L70 68 L60 72 L56 82 L52 72 L42 68 Z" fill="#FDDF59" />
          {/* Bottle back */}
          <rect x="64" y="68" width="54" height="106" rx="16" fill="#B589D6" stroke="#4B0078" strokeWidth="4" />
          {/* Jar front */}
          <rect x="104" y="106" width="84" height="72" rx="18" fill="#8504CF" stroke="#4B0078" strokeWidth="4" />
          <rect x="98" y="88" width="96" height="22" rx="10" fill="#F6C8DF" stroke="#4B0078" strokeWidth="4" />
          <rect x="116" y="122" width="60" height="38" rx="10" fill="#FFFFFF" />
          <text
            x="146"
            y="145"
            textAnchor="middle"
            fill="#8504CF"
            fontSize="10"
            fontWeight="700"
            fontFamily="Mali, sans-serif"
          >
            KIT CURLY
          </text>
        </svg>
      );
  }
}
