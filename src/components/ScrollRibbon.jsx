import { useEffect, useRef } from "react";

export default function ScrollRibbon() {
  const svgRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    const svg = svgRef.current;
    if (!path || !svg) return;

    const totalLength = path.getTotalLength();
    path.style.strokeDasharray = `${totalLength}`;

    // Muestreamos el recorrido del listón para alinear su coordenada Y con el scroll
    const SAMPLE_COUNT = 600;
    const samples = [];
    for (let i = 0; i <= SAMPLE_COUNT; i++) {
      const len = (i / SAMPLE_COUNT) * totalLength;
      const pt = path.getPointAtLength(len);
      samples.push({ len, y: pt.y });
    }

    const maxSoFar = new Array(samples.length);
    const minFromEnd = new Array(samples.length);

    let currMax = -Infinity;
    for (let i = 0; i < samples.length; i++) {
      currMax = Math.max(currMax, samples[i].y);
      maxSoFar[i] = currMax;
    }

    let currMin = Infinity;
    for (let i = samples.length - 1; i >= 0; i--) {
      currMin = Math.min(currMin, samples[i].y);
      minFromEnd[i] = currMin;
    }

    // Suavizado monótono para que cada bucle se dibuje de forma continua sin retrasarse
    const effectiveY = samples.map((s) => s.y);
    let idx = 0;
    while (idx < samples.length) {
      if (minFromEnd[idx] < maxSoFar[idx] - 0.5) {
        const start = idx;
        while (idx < samples.length && minFromEnd[idx] < maxSoFar[idx] - 0.5) {
          idx++;
        }
        const end = Math.min(idx, samples.length - 1);
        const startY = effectiveY[Math.max(0, start - 1)];
        const endY = effectiveY[end];
        const span = Math.max(1, end - start + 1);
        for (let k = start; k <= end; k++) {
          const t = (k - start + 1) / span;
          effectiveY[k] = startY + (endY - startY) * t;
        }
      } else {
        idx++;
      }
    }

    const findLengthForSvgY = (targetY) => {
      if (targetY <= effectiveY[0]) return 0;
      if (targetY >= effectiveY[effectiveY.length - 1]) return totalLength;

      let low = 0;
      let high = effectiveY.length - 1;
      while (low < high) {
        const mid = (low + high) >> 1;
        if (effectiveY[mid] < targetY) low = mid + 1;
        else high = mid;
      }

      const i1 = Math.max(0, low - 1);
      const i2 = low;
      const y1 = effectiveY[i1];
      const y2 = effectiveY[i2];
      const frac = y2 === y1 ? 0 : (targetY - y1) / (y2 - y1);
      return samples[i1].len + frac * (samples[i2].len - samples[i1].len);
    };

    let rafId = null;

    const updateRibbon = () => {
      rafId = null;
      const rect = svg.getBoundingClientRect();
      const mainHeight = rect.height || document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const vh = window.innerHeight;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);
      const scrollRatio = Math.min(Math.max(scrollTop / maxScroll, 0), 1);

      // Mantiene la punta del listón al ritmo de la lectura del usuario (sin rezago)
      const mainTopInDoc = rect.top + scrollTop;
      const focusDocY = scrollTop + vh * (0.22 + 0.78 * scrollRatio);
      const relativeY = focusDocY - mainTopInDoc;
      const targetSvgY = Math.min(Math.max((relativeY / mainHeight) * 5508.03, 0), 5508.03);

      const currentLen = findLengthForSvgY(targetSvgY);
      path.style.strokeDashoffset = `${totalLength - currentLen}`;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateRibbon);
      }
    };

    updateRibbon();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 2006.01 5508.03"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute inset-0 w-full h-full z-[2] opacity-85"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d="M1931 75.0054C1914.08 248.749 1767.32 427.265 1565.32 575.642C1051.14 953.328 179 1135.72 179 547.005C179 -72.1966 1091.86 116.134 1565.32 575.642C1731.09 736.527 1843 930.655 1843 1135.01C1843 1401.54 1688.15 1668.1 1472.25 1882.87C975.326 2377.18 155 2597.14 155 1911.01C155 1100.94 953.386 1379.08 1472.25 1882.87C1722.01 2125.37 1907 2420.15 1907 2671.01C1907 2947.18 1755.07 3173.43 1538.72 3336.97C1003.78 3741.34 75 3762.38 75 3207.01C75 2645.99 1012.37 2873.37 1538.72 3336.97C1744.17 3517.94 1887 3734.89 1887 3955.01C1887 4234.11 1749.29 4458.28 1561.35 4614.69C1149.16 4957.76 495.367 4974.93 523 4531.01C555.31 4011.94 1260.94 4294.88 1561.35 4614.69C1632.86 4690.82 1681.41 4769.03 1692.45 4839.01C1803.45 5542.31 257 5185 177 5433.01"
        stroke="#8504CF"
        strokeWidth="150"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
