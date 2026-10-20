import React from 'react';

interface PipeCleanerArtProps {
  id: string;
  size?: number | string;
  className?: string;
}

export const PipeCleanerArt: React.FC<PipeCleanerArtProps> = ({
  id,
  size = 200,
  className = "",
}) => {
  const width = typeof size === 'number' ? size : '100%';
  const height = typeof size === 'number' ? size : '100%';

  switch (id) {
    case 'bunga-lily':
      return (
        <svg
          viewBox="0 0 200 200"
          width={width}
          height={height}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stem & Leaves */}
          <path d="M100 115 Q102 155 100 195" stroke="#1C9C3E" strokeWidth="8" strokeLinecap="round" />
          <path d="M100 155 Q130 145 135 165 C125 175 105 168 100 162" fill="#1C9C3E" />
          {/* Petals */}
          <path d="M100 105 C85 70 80 40 100 30 C120 40 115 70 100 105" fill="#FFFFFF" stroke="#E5D0F6" strokeWidth="3" />
          <path d="M100 105 C65 85 40 80 45 100 C55 115 80 115 100 105" fill="#FFFFFF" stroke="#E5D0F6" strokeWidth="3" />
          <path d="M100 105 C135 85 160 80 155 100 C145 115 120 115 100 105" fill="#FFFFFF" stroke="#E5D0F6" strokeWidth="3" />
          <path d="M100 105 C75 125 55 145 70 150 C85 150 95 125 100 105" fill="#FAF3FC" stroke="#E5D0F6" strokeWidth="3" />
          <path d="M100 105 C125 125 145 145 130 150 C115 150 105 125 100 105" fill="#FAF3FC" stroke="#E5D0F6" strokeWidth="3" />
          {/* Stamens */}
          <line x1="100" y1="105" x2="88" y2="78" stroke="#F5D118" strokeWidth="3" strokeLinecap="round" />
          <circle cx="88" cy="78" r="4.5" fill="#E65100" />
          <line x1="100" y1="105" x2="100" y2="72" stroke="#F5D118" strokeWidth="3" strokeLinecap="round" />
          <circle cx="100" cy="72" r="4.5" fill="#E65100" />
          <line x1="100" y1="105" x2="112" y2="78" stroke="#F5D118" strokeWidth="3" strokeLinecap="round" />
          <circle cx="112" cy="78" r="4.5" fill="#E65100" />
          <circle cx="100" cy="105" r="8" fill="#F5D118" />
        </svg>
      );

    case 'bunga-sunflower':
      return (
        <svg
          viewBox="0 0 200 200"
          width={width}
          height={height}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M100 110 Q98 150 100 195" stroke="#1C9C3E" strokeWidth="8" strokeLinecap="round" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 100 95)`}>
              <ellipse cx="100" cy="50" rx="11" ry="24" fill="#F5D118" stroke="#E6B800" strokeWidth="2.5" />
            </g>
          ))}
          <circle cx="100" cy="95" r="28" fill="#4E342E" stroke="#3E2723" strokeWidth="2" />
          {[
            [94, 88], [106, 88], [100, 95], [92, 101], [108, 102], [100, 84], [100, 106]
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="2.5" fill="#8D6E63" />
          ))}
        </svg>
      );

    case 'bunga-poppy':
      return (
        <svg
          viewBox="0 0 200 200"
          width={width}
          height={height}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M100 115 Q104 155 100 195" stroke="#1C9C3E" strokeWidth="8" strokeLinecap="round" />
          {[0, 72, 144, 216, 288].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 100 95)`}>
              <ellipse cx="100" cy="62" rx="20" ry="26" fill="#6B1426" stroke="#4A0B18" strokeWidth="2.5" />
            </g>
          ))}
          <circle cx="100" cy="95" r="16" fill="#F5D118" stroke="#E6B800" strokeWidth="2" />
          <circle cx="100" cy="95" r="7" fill="#3B2342" />
        </svg>
      );

    case 'bunga-holow':
      return (
        <svg
          viewBox="0 0 200 200"
          width={width}
          height={height}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M100 115 Q102 155 100 195" stroke="#1C9C3E" strokeWidth="8" strokeLinecap="round" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 100 95)`}>
              <path
                d="M100 95 C88 65 88 45 100 45 C112 45 112 65 100 95"
                fill="none"
                stroke="#F27EB2"
                strokeWidth="10"
                strokeLinecap="round"
              />
            </g>
          ))}
          <circle cx="100" cy="95" r="16" fill="#C2185B" />
          <circle cx="96" cy="92" r="3" fill="#FAD9EC" />
          <circle cx="104" cy="97" r="3" fill="#FAD9EC" />
        </svg>
      );

    case 'bunga-holow-love':
      return (
        <svg
          viewBox="0 0 200 200"
          width={width}
          height={height}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M100 115 Q98 155 100 195" stroke="#1C9C3E" strokeWidth="8" strokeLinecap="round" />
          {[0, 90, 180, 270].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 100 95)`}>
              <path
                d="M100 95 C80 75 75 52 90 48 C98 46 100 56 100 56 C100 56 102 46 110 48 C125 52 120 75 100 95 Z"
                fill="none"
                stroke="#9357C4"
                strokeWidth="9"
                strokeLinejoin="round"
              />
            </g>
          ))}
          <circle cx="100" cy="95" r="14" fill="#F5D118" />
        </svg>
      );

    case 'bunga-tulip':
      return (
        <svg
          viewBox="0 0 200 200"
          width={width}
          height={height}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M100 115 Q102 155 100 195" stroke="#1C9C3E" strokeWidth="8" strokeLinecap="round" />
          <path d="M100 160 C135 155 140 120 125 105 C115 130 105 150 100 160" fill="#1C9C3E" />
          <path d="M100 115 C75 110 60 70 80 45 C95 70 98 100 100 115" fill="#1D4ED8" stroke="#1E56E8" strokeWidth="3" />
          <path d="M100 115 C125 110 140 70 120 45 C105 70 102 100 100 115" fill="#1D4ED8" stroke="#1E56E8" strokeWidth="3" />
          <path d="M85 85 C80 50 100 35 100 35 C100 35 120 50 115 85 C115 115 85 115 85 85 Z" fill="#2563EB" stroke="#1D4ED8" strokeWidth="3" />
        </svg>
      );

    case 'bunga-mini-holow':
      return (
        <svg
          viewBox="0 0 200 200"
          width={width}
          height={height}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M100 120 Q101 160 100 195" stroke="#1C9C3E" strokeWidth="7" strokeLinecap="round" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 100 100)`}>
              <path
                d="M100 100 C92 78 92 62 100 62 C108 62 108 78 100 100"
                fill="none"
                stroke="#B4C6E7"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </g>
          ))}
          <circle cx="100" cy="100" r="12" fill="#F27EB2" />
        </svg>
      );

    case 'bunga-daun':
      return (
        <svg
          viewBox="0 0 200 200"
          width={width}
          height={height}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M100 190 Q95 120 100 30" stroke="#146B2C" strokeWidth="7" strokeLinecap="round" />
          <path d="M100 150 C60 130 50 70 95 50 C95 80 95 120 100 150 Z" fill="#1C9C3E" stroke="#146B2C" strokeWidth="2.5" />
          <path d="M100 120 C140 100 145 50 102 35 C105 60 102 95 100 120 Z" fill="#22C55E" stroke="#1C9C3E" strokeWidth="2.5" />
        </svg>
      );

    case 'bunga-twistlove':
      return (
        <svg
          viewBox="0 0 200 200"
          width={width}
          height={height}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M100 100 Q85 115 100 130 Q115 145 100 160 Q85 175 100 195" stroke="#1C9C3E" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path
            d="M100 100 C70 70 65 35 88 30 C100 28 100 42 100 42 C100 42 100 28 112 30 C135 35 130 70 100 100 Z"
            fill="#FAD9EC"
            stroke="#F27EB2"
            strokeWidth="8"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'bunga-mini-daisy':
      return (
        <svg
          viewBox="0 0 200 200"
          width={width}
          height={height}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M100 120 Q101 160 100 195" stroke="#1C9C3E" strokeWidth="7" strokeLinecap="round" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 100 100)`}>
              <ellipse cx="100" cy="72" rx="7" ry="16" fill="#A7D7C5" stroke="#7FB7A3" strokeWidth="2" />
            </g>
          ))}
          <circle cx="100" cy="100" r="14" fill="#F5D118" />
        </svg>
      );

    // GANTUNGAN / KEYCHAINS
    case 'gantungan-coquette':
      return (
        <svg
          viewBox="0 0 200 200"
          width={width}
          height={height}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M100 20 C100 35 100 50 100 65" stroke="#94A3B8" strokeWidth="4" strokeDasharray="3 4" strokeLinecap="round" />
          <circle cx="100" cy="20" r="5" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.5" />
          <path d="M95 85 C60 50 35 75 55 98 C75 110 95 90 95 85 Z" fill="#FAD9EC" stroke="#F27EB2" strokeWidth="7" strokeLinejoin="round" />
          <path d="M105 85 C140 50 165 75 145 98 C125 110 105 90 105 85 Z" fill="#FAD9EC" stroke="#F27EB2" strokeWidth="7" strokeLinejoin="round" />
          <circle cx="100" cy="88" r="11" fill="#F27EB2" stroke="#E11D48" strokeWidth="2.5" />
          <path d="M92 95 Q75 130 55 160" stroke="#F27EB2" strokeWidth="8" strokeLinecap="round" />
          <path d="M108 95 Q125 130 145 160" stroke="#F27EB2" strokeWidth="8" strokeLinecap="round" />
        </svg>
      );

    case 'gantungan-cerry':
      return (
        <svg
          viewBox="0 0 200 200"
          width={width}
          height={height}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="22" r="10" stroke="#94A3B8" strokeWidth="3" fill="none" />
          <path d="M100 32 Q90 60 70 120" stroke="#16A34A" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M100 32 Q110 60 130 120" stroke="#16A34A" strokeWidth="6" strokeLinecap="round" fill="none" />
          <ellipse cx="85" cy="50" rx="14" ry="7" fill="#86EFAC" stroke="#16A34A" strokeWidth="2.5" transform="rotate(-25 85 50)" />
          <circle cx="68" cy="132" r="28" fill="#E11D48" stroke="#9F1239" strokeWidth="3" />
          <circle cx="132" cy="132" r="28" fill="#E11D48" stroke="#9F1239" strokeWidth="3" />
          <circle cx="58" cy="122" r="6" fill="#FFFFFF" opacity="0.8" />
          <circle cx="122" cy="122" r="6" fill="#FFFFFF" opacity="0.8" />
        </svg>
      );

    case 'gantungan-butterfly':
      return (
        <svg
          viewBox="0 0 200 200"
          width={width}
          height={height}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="20" r="8" stroke="#94A3B8" strokeWidth="2.5" fill="none" />
          <path d="M100 70 Q88 45 78 48" stroke="#3B2342" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="78" cy="48" r="3" fill="#F27EB2" />
          <path d="M100 70 Q112 45 122 48" stroke="#3B2342" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="122" cy="48" r="3" fill="#F27EB2" />
          <ellipse cx="60" cy="80" rx="32" ry="24" fill="#60A5FA" stroke="#1E56E8" strokeWidth="4" transform="rotate(-15 60 80)" />
          <ellipse cx="140" cy="80" rx="32" ry="24" fill="#60A5FA" stroke="#1E56E8" strokeWidth="4" transform="rotate(15 140 80)" />
          <ellipse cx="70" cy="125" rx="22" ry="18" fill="#93C5FD" stroke="#2563EB" strokeWidth="3.5" transform="rotate(20 70 125)" />
          <ellipse cx="130" cy="125" rx="22" ry="18" fill="#93C5FD" stroke="#2563EB" strokeWidth="3.5" transform="rotate(-20 130 125)" />
          <rect x="94" y="65" width="12" height="70" rx="6" fill="#3B2342" />
        </svg>
      );

    case 'gantungan-flower':
      return (
        <svg
          viewBox="0 0 200 200"
          width={width}
          height={height}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M100 15 C100 35 100 50 100 65" stroke="#94A3B8" strokeWidth="4" strokeDasharray="2 4" strokeLinecap="round" />
          <circle cx="100" cy="15" r="5" fill="#CBD5E1" />
          <ellipse cx="132" cy="78" rx="16" ry="9" fill="#A7F3D0" stroke="#059669" strokeWidth="2.5" transform="rotate(25 132 78)" />
          {[0, 72, 144, 216, 288].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 100 115)`}>
              <ellipse cx="100" cy="80" rx="18" ry="24" fill="#9F1239" stroke="#E11D48" strokeWidth="3" />
            </g>
          ))}
          <circle cx="100" cy="115" r="18" fill="#F5D118" stroke="#EAB308" strokeWidth="2.5" />
        </svg>
      );

    case 'gantungan-jellyfish':
      return (
        <svg
          viewBox="0 0 200 200"
          width={width}
          height={height}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="18" r="8" stroke="#94A3B8" strokeWidth="2.5" fill="none" />
          <path
            d="M50 95 C50 50 150 50 150 95 C150 108 50 108 50 95 Z"
            fill="#F472B6"
            stroke="#DB2777"
            strokeWidth="4"
          />
          <path
            d="M50 98 Q62 108 75 98 Q88 108 100 98 Q112 108 125 98 Q138 108 150 98"
            stroke="#BE185D"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse cx="82" cy="78" rx="4" ry="5.5" fill="#3B2342" />
          <circle cx="80.5" cy="76" r="1.8" fill="#FFFFFF" />
          <ellipse cx="118" cy="78" rx="4" ry="5.5" fill="#3B2342" />
          <circle cx="116.5" cy="76" r="1.8" fill="#FFFFFF" />
          <ellipse cx="72" cy="86" rx="5" ry="3" fill="#F43F5E" opacity="0.6" />
          <ellipse cx="128" cy="86" rx="5" ry="3" fill="#F43F5E" opacity="0.6" />
          <path d="M96 82 Q100 87 104 82" stroke="#3B2342" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M68 104 Q60 125 70 145 Q80 165 72 185" stroke="#F472B6" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M88 106 Q98 130 90 155 Q82 175 92 192" stroke="#E879F9" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M112 106 Q102 130 110 155 Q118 175 108 192" stroke="#C084FC" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M132 104 Q140 125 130 145 Q120 165 128 185" stroke="#F472B6" strokeWidth="5" strokeLinecap="round" fill="none" />
        </svg>
      );

    // BUCKET SHOWCASE ARTWORK
    case 'bucket-single':
      return (
        <svg
          viewBox="0 0 240 280"
          width={width}
          height={height}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M120 270 L60 120 L180 120 Z" fill="#F3E8FF" stroke="#D8B4FE" strokeWidth="2" />
          <path d="M50 110 C50 90 90 80 120 110 C150 80 190 90 190 110 L160 150 L80 150 Z" fill="#FAF5FF" stroke="#E9D5FF" strokeWidth="2" />
          <path d="M120 110 L120 180" stroke="#1C9C3E" strokeWidth="7" strokeLinecap="round" />
          <path d="M110 90 C95 65 110 40 120 40 C130 40 145 65 130 90 Z" fill="#2563EB" stroke="#1D4ED8" strokeWidth="3" />
          <path d="M120 270 L80 150 C95 140 145 140 160 150 Z" fill="#FFFFFF" stroke="#E0E7FF" strokeWidth="2" />
          <path d="M120 190 C100 170 80 180 90 195 C100 205 115 195 120 190 Z" fill="#D8B4FE" stroke="#A855F7" strokeWidth="2" />
          <path d="M120 190 C140 170 160 180 150 195 C140 205 125 195 120 190 Z" fill="#D8B4FE" stroke="#A855F7" strokeWidth="2" />
          <circle cx="120" cy="192" r="7" fill="#A855F7" />
          <path d="M116 195 Q105 220 95 240" stroke="#A855F7" strokeWidth="5" strokeLinecap="round" />
          <path d="M124 195 Q135 220 145 240" stroke="#A855F7" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'bucket-flower':
      return (
        <svg
          viewBox="0 0 260 300"
          width={width}
          height={height}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M130 290 L30 110 C80 90 180 90 230 110 Z" fill="#FCE7F3" stroke="#F472B6" strokeWidth="2" />
          <g transform="translate(45, 45) scale(0.45)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
              <ellipse key={d} cx="100" cy="55" rx="12" ry="22" fill="#F5D118" stroke="#E6B800" strokeWidth="3" transform={`rotate(${d} 100 95)`} />
            ))}
            <circle cx="100" cy="95" r="24" fill="#3E2723" />
          </g>
          <g transform="translate(85, 25) scale(0.45)">
            <path d="M85 85 C80 50 100 35 100 35 C100 35 120 50 115 85 C115 115 85 115 85 85 Z" fill="#2563EB" stroke="#1D4ED8" strokeWidth="4" />
          </g>
          <g transform="translate(130, 45) scale(0.45)">
            {[0, 60, 120, 180, 240, 300].map((d) => (
              <path key={d} d="M100 95 C88 65 88 45 100 45 C112 45 112 65 100 95" fill="none" stroke="#F27EB2" strokeWidth="10" transform={`rotate(${d} 100 95)`} />
            ))}
            <circle cx="100" cy="95" r="14" fill="#C2185B" />
          </g>
          <g transform="translate(145, 15)">
            <path d="M20 20 C10 8 0 15 0 25 C0 38 20 50 20 50 C20 50 40 38 40 25 C40 15 30 8 20 20 Z" fill="#F43F5E" />
            <text x="20" y="30" fontSize="7" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">Congrats</text>
          </g>
          <path d="M130 290 L60 140 C100 130 160 130 200 140 Z" fill="#FFFFFF" stroke="#E5D0F6" strokeWidth="2" />
          <circle cx="130" cy="200" r="10" fill="#F27EB2" />
          <path d="M130 200 C95 180 80 195 95 210 Z" fill="#FAD9EC" stroke="#F27EB2" strokeWidth="3" />
          <path d="M130 200 C165 180 180 195 165 210 Z" fill="#FAD9EC" stroke="#F27EB2" strokeWidth="3" />
          <path d="M125 205 Q105 240 90 265" stroke="#F27EB2" strokeWidth="6" strokeLinecap="round" />
          <path d="M135 205 Q155 240 170 265" stroke="#F27EB2" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );

    case 'bucket-idol':
      return (
        <svg
          viewBox="0 0 260 300"
          width={width}
          height={height}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M130 290 L25 100 C70 70 190 70 235 100 Z" fill="#F3E8FF" stroke="#A855F7" strokeWidth="2" />
          <rect x="90" y="30" width="80" height="95" rx="5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
          <rect x="96" y="36" width="68" height="68" rx="3" fill="#E2E8F0" />
          <circle cx="130" cy="62" r="14" fill="#94A3B8" />
          <path d="M110 88 C110 75 150 75 150 88 Z" fill="#94A3B8" />
          <text x="130" y="116" fontSize="8" fill="#7B1FA2" textAnchor="middle" fontWeight="bold">MY BIAS 💜</text>
          <g transform="translate(45, 60) scale(0.38)">
            <path d="M85 85 C80 50 100 35 100 35 C100 35 120 50 115 85 C115 115 85 115 85 85 Z" fill="#B388FF" stroke="#7C3AED" strokeWidth="4" />
          </g>
          <g transform="translate(155, 60) scale(0.38)">
            {[0, 90, 180, 270].map((d) => (
              <path key={d} d="M100 95 C80 75 75 52 90 48 C98 46 100 56 100 56 C100 56 102 46 110 48 C125 52 120 75 100 95 Z" fill="none" stroke="#F27EB2" strokeWidth="9" transform={`rotate(${d} 100 95)`} />
            ))}
            <circle cx="100" cy="95" r="12" fill="#F5D118" />
          </g>
          <path d="M130 290 L60 145 C100 135 160 135 200 145 Z" fill="#FAF5FF" stroke="#E5D0F6" strokeWidth="2" />
          <circle cx="130" cy="205" r="10" fill="#7B1FA2" />
          <path d="M130 205 C95 185 80 200 95 215 Z" fill="#E5D0F6" stroke="#7B1FA2" strokeWidth="3" />
          <path d="M130 205 C165 185 180 200 165 215 Z" fill="#E5D0F6" stroke="#7B1FA2" strokeWidth="3" />
          <path d="M125 210 Q105 245 90 270" stroke="#7B1FA2" strokeWidth="6" strokeLinecap="round" />
          <path d="M135 210 Q155 245 170 270" stroke="#7B1FA2" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );

    default:
      return (
        <div className={`flex items-center justify-center rounded-2xl bg-white p-4 border border-[#E5D0F6] ${className}`}>
          <span className="text-2xl">🌸</span>
        </div>
      );
  }
};
