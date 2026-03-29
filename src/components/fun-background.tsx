export function FunBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        {/* Squiggles */}
        <path d="M80 120 Q110 80 140 120 Q170 160 200 120" fill="none" stroke="#C96A3A" strokeWidth="6" strokeLinecap="round" opacity="0.06"/>
        <path d="M650 80 Q680 40 710 80 Q740 120 770 80 Q800 40 830 80" fill="none" stroke="#7A9E8A" strokeWidth="5" strokeLinecap="round" opacity="0.07"/>
        <path d="M300 350 Q330 310 360 350 Q390 390 420 350" fill="none" stroke="#C96A3A" strokeWidth="7" strokeLinecap="round" opacity="0.05"/>
        <path d="M900 300 Q930 260 960 300 Q990 340 1020 300 Q1050 260 1080 300" fill="none" stroke="#F5C842" strokeWidth="6" strokeLinecap="round" opacity="0.08"/>
        {/* Spirals */}
        <path d="M500 200 Q520 180 530 200 Q540 220 520 230 Q500 240 490 220 Q480 200 500 190 Q520 170 540 190" fill="none" stroke="#C96A3A" strokeWidth="5" strokeLinecap="round" opacity="0.07"/>
        <path d="M150 500 Q170 480 180 500 Q190 520 170 530 Q150 540 140 520 Q130 500 150 490 Q170 470 190 490" fill="none" stroke="#F2A7B0" strokeWidth="5" strokeLinecap="round" opacity="0.06"/>
        <path d="M750 550 Q770 530 780 550 Q790 570 770 580 Q750 590 740 570 Q730 550 750 540" fill="none" stroke="#7A9E8A" strokeWidth="4" strokeLinecap="round" opacity="0.06"/>
        {/* Dots */}
        <circle cx="120" cy="250" r="5" fill="#F5C842" opacity="0.12"/>
        <circle cx="400" cy="150" r="4" fill="#C96A3A" opacity="0.08"/>
        <circle cx="700" cy="400" r="6" fill="#7A9E8A" opacity="0.08"/>
        <circle cx="250" cy="450" r="3" fill="#F2A7B0" opacity="0.12"/>
        <circle cx="850" cy="180" r="5" fill="#F5C842" opacity="0.1"/>
        <circle cx="550" cy="500" r="4" fill="#C96A3A" opacity="0.09"/>
        <circle cx="950" cy="520" r="3" fill="#F2A7B0" opacity="0.08"/>
        <circle cx="50" cy="380" r="4" fill="#7A9E8A" opacity="0.07"/>
        {/* Waves */}
        <path d="M450 650 Q470 620 490 650 Q510 680 530 650 Q550 620 570 650" fill="none" stroke="#7A9E8A" strokeWidth="6" strokeLinecap="round" opacity="0.06"/>
        <path d="M-20 600 Q100 520 220 600" fill="none" stroke="#7EC8A4" strokeWidth="8" strokeLinecap="round" opacity="0.05"/>
        <path d="M600 50 Q700 -20 800 50" fill="none" stroke="#7EC8A4" strokeWidth="7" strokeLinecap="round" opacity="0.05"/>
        {/* Extra dots */}
        <circle cx="330" cy="80" r="3" fill="#7A9E8A" opacity="0.08"/>
        <circle cx="680" cy="250" r="5" fill="#C96A3A" opacity="0.07"/>
        <circle cx="180" cy="180" r="2.5" fill="#5B8FD4" opacity="0.09"/>
        <circle cx="1000" cy="150" r="4" fill="#F2A7B0" opacity="0.08"/>
        <circle cx="480" cy="420" r="3.5" fill="#F5C842" opacity="0.09"/>
      </svg>
    </div>
  );
}
