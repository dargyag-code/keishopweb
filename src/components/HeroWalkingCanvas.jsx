import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Renderiza el video sobre un <canvas> totalmente transparente eliminando
 * únicamente los píxeles blancos puros en tiempo real (requestAnimationFrame)
 * sin afectar los tonos crema de la blusa ni los trazos, y sincroniza el avance
 * horizontal hacia la izquierda con el scroll hasta detenerse antes del texto.
 */
export default function HeroWalkingCanvas({
  src = "/assets/keila-video1.webm",
  alt = "Keila caminando con productos capilares Keishop Always Curly",
  chromaKey = "white",
  sectionRef,
  textBlockRef,
  className = "",
}) {
  const slotRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const boundsRef = useRef({ startX: 120, endX: 0 });
  const initializedRef = useRef(false);

  const rawX = useMotionValue(120);
  const smoothX = useSpring(rawX, {
    stiffness: 150,
    damping: 24,
    mass: 0.6,
  });

  // Procesamiento fotograma a fotograma en tiempo real (lazy + pausado fuera de pantalla + resolución optimizada)
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const slotEl = slotRef.current;
    if (!video || !canvas || !slotEl) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      willReadFrequently: true,
    });
    if (!ctx) return;

    let rafId = null;
    let active = true;
    let isVisible = false;
    let hasActivatedVideo = false;
    let lastDrawTime = 0;

    const processFrame = () => {
      if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
        // Escala máxima a 520px de ancho para reducir 7x-10x el costo de píxeles en móvil/web
        const scale = Math.min(1, 520 / video.videoWidth);
        const targetW = Math.max(1, Math.round(video.videoWidth * scale));
        const targetH = Math.max(1, Math.round(video.videoHeight * scale));

        if (canvas.width !== targetW || canvas.height !== targetH) {
          canvas.width = targetW;
          canvas.height = targetH;
        }

        ctx.clearRect(0, 0, targetW, targetH);
        ctx.drawImage(video, 0, 0, targetW, targetH);

        const frame = ctx.getImageData(0, 0, targetW, targetH);
        const data = frame.data;

        const isPurpleKey = chromaKey === "purple";

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          if (isPurpleKey) {
            // Elimina el fondo morado (#8504CF) conservando espuma lila, burbujas, silla y piel
            if (r >= 100 && r <= 168 && g <= 42 && b >= 170 && b - g >= 145 && r - g >= 85) {
              data[i + 3] = 0;
            }
          } else {
            const brightness = (r + g + b) / 3;
            const rbDiff = Math.abs(r - b);

            // Elimina blanco puro / casi blanco neutro, conservando crema (menor B) y trazos
            if ((r > 246 && g > 246 && b > 246) || (rbDiff < 8 && brightness > 245)) {
              data[i + 3] = 0;
            }
          }
        }

        ctx.putImageData(frame, 0, 0);
      }
    };

    const tick = (now) => {
      if (!active || !isVisible) {
        rafId = null;
        return;
      }
      // Limita el reprocesado de canvas a ~24 fps para evitar sobrecarga de CPU
      if (!video.paused && !video.ended && now - lastDrawTime >= 40) {
        lastDrawTime = now;
        processFrame();
      }
      rafId = window.requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (rafId === null && active && isVisible) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const handleLoadedData = () => {
      processFrame();
      if (isVisible) {
        video.play().catch(() => {});
        startLoop();
      }
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleLoadedData);

    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              const entry = entries[0];
              isVisible = Boolean(entry?.isIntersecting);

              if (isVisible) {
                if (!hasActivatedVideo) {
                  hasActivatedVideo = true;
                  video.preload = "auto";
                  video.src = src;
                  video.load();
                }
                video.play().catch(() => {});
                startLoop();
              } else {
                video.pause();
                if (rafId !== null) {
                  window.cancelAnimationFrame(rafId);
                  rafId = null;
                }
              }
            },
            { rootMargin: "250px 0px" }
          )
        : null;

    if (observer) {
      observer.observe(slotEl);
    } else {
      isVisible = true;
      video.src = src;
      video.play().catch(() => {});
      startLoop();
    }

    return () => {
      active = false;
      observer?.disconnect();
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleLoadedData);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [src, chromaKey]);

  // Calcula límites seguros respecto al bloque de texto y avanza translateX hacia la izquierda con el scroll
  useEffect(() => {
    const computeBounds = () => {
      const sectionEl = sectionRef?.current;
      const textEl = textBlockRef?.current;
      const slotEl = slotRef.current;
      if (!sectionEl || !slotEl) return;

      const sectionRect = sectionEl.getBoundingClientRect();
      const slotRect = slotEl.getBoundingClientRect();

      const startX =
        window.innerWidth >= 1024
          ? Math.max(80, Math.min(200, sectionRect.right - slotRect.right + 48))
          : 56;

      let endX = 0;
      if (textEl && window.innerWidth >= 1024) {
        const textRect = textEl.getBoundingClientRect();
        if (slotRect.top < textRect.bottom - 10) {
          endX = Math.min(0, textRect.right + 18 - slotRect.left);
        }
      }

      boundsRef.current = { startX, endX };
    };

    const updateWalkPosition = () => {
      const sectionEl = sectionRef?.current;
      if (!sectionEl) return;

      const { startX, endX } = boundsRef.current;
      const rect = sectionEl.getBoundingClientRect();
      const vh = window.innerHeight || 800;

      // Avanza mientras la sección entra al área visible y se detiene antes de las letras
      const startTop = vh * 0.85;
      const endTop = vh * 0.22;
      const progress = Math.min(
        Math.max((startTop - rect.top) / Math.max(1, startTop - endTop), 0),
        1
      );
      const nextX = startX + (endX - startX) * progress;

      if (!initializedRef.current) {
        initializedRef.current = true;
        rawX.jump(nextX);
        smoothX.jump(nextX);
      } else {
        rawX.set(nextX);
      }
    };

    const handleResize = () => {
      computeBounds();
      updateWalkPosition();
    };

    computeBounds();
    updateWalkPosition();

    window.addEventListener("scroll", updateWalkPosition, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(handleResize)
        : null;
    if (observer && slotRef.current) observer.observe(slotRef.current);
    if (observer && textBlockRef?.current) observer.observe(textBlockRef.current);

    return () => {
      window.removeEventListener("scroll", updateWalkPosition);
      window.removeEventListener("resize", handleResize);
      observer?.disconnect();
    };
  }, [sectionRef, textBlockRef, rawX, smoothX]);

  return (
    <div
      ref={slotRef}
      style={{
        background: "transparent",
        border: "none",
        boxShadow: "none",
      }}
      className={`relative w-full ${className}`}
    >
      {/* Video fuente oculto con carga diferida hasta acercarse al catálogo */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="none"
        aria-hidden="true"
        style={{
          position: "fixed",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
          visibility: "hidden",
        }}
      />

      <motion.div
        style={{
          x: smoothX,
          background: "transparent",
          border: "none",
          boxShadow: "none",
        }}
        className="w-full will-change-transform"
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={alt}
          style={{
            background: "transparent",
            border: "none",
            boxShadow: "none",
          }}
          className="block w-full h-auto select-none"
        />
      </motion.div>
    </div>
  );
}
