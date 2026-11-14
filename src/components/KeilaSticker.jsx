import { motion } from "framer-motion";

const KEILA_ANIMATIONS = {
  hero: {
    origin: "bottom center",
    useInView: false,
    entrance: {
      initial: { opacity: 0, x: 120, scale: 0.8 },
      animate: { opacity: 1, x: 0, scale: 1 },
      transition: {
        type: "spring",
        stiffness: 180,
        damping: 10,
        opacity: { duration: 0.4 },
      },
    },
    loop: {
      animate: {
        y: [0, -28, 0, -22, 0],
        rotate: [-6, 6, -6],
        scaleY: [1, 1.04, 0.97, 1],
      },
      transition: {
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
  stock: {
    origin: "bottom center",
    useInView: true,
    entrance: {
      initial: { opacity: 0, x: -28, scale: 0.97 },
      whileInView: { opacity: 1, x: 0, scale: 1 },
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    loop: {
      animate: {
        y: [0, -7, 0],
        rotate: [-0.8, 0.8, -0.8],
      },
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
  salon: {
    origin: "bottom center",
    useInView: true,
    entrance: {
      initial: { opacity: 0, y: 28, scale: 0.97 },
      whileInView: { opacity: 1, y: 0, scale: 1 },
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    loop: {
      animate: {
        y: [0, -8, 0],
        rotate: [0, 0.7, -0.7, 0],
        scale: [1, 1.015, 1],
      },
      transition: {
        duration: 5.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
  faq: {
    origin: "bottom center",
    useInView: true,
    entrance: {
      initial: { opacity: 0, y: 20, scale: 0.96 },
      whileInView: { opacity: 1, y: 0, scale: 1 },
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    loop: {
      animate: {
        y: [0, -6, 0],
        rotate: [-1.2, 1.2, -1.2],
        scale: [1, 1.012, 1],
      },
      transition: {
        duration: 5.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
};

/**
 * Ilustración animada de Keila con movimiento suave:
 * capas separadas para que entrada, bucle continuo y hover coexistan sin interrumpirse.
 */
export default function KeilaSticker({
  variant,
  src,
  alt,
  isVideo = false,
  className = "",
  wrapperClassName = "",
}) {
  const config = KEILA_ANIMATIONS[variant];

  const entranceProps = config.useInView
    ? {
        initial: config.entrance.initial,
        whileInView: config.entrance.whileInView,
        viewport: { once: true, amount: 0.2 },
        transition: config.entrance.transition,
      }
    : {
        initial: config.entrance.initial,
        animate: config.entrance.animate,
        transition: config.entrance.transition,
      };

  const sharedMotionProps = {
    style: {
      transformOrigin: config.origin,
      filter: "drop-shadow(0 12px 18px rgba(0, 0, 0, 0.16))",
    },
    whileHover: {
      scale: 1.035,
      y: -5,
      filter: "drop-shadow(0 16px 26px rgba(133, 4, 207, 0.35))",
    },
    transition: { type: "spring", stiffness: 240, damping: 22 },
    className: `w-full h-auto object-contain cursor-pointer select-none will-change-transform ${className}`,
  };

  return (
    <motion.div {...entranceProps} className={`w-full ${wrapperClassName}`}>
      {isVideo ? (
        <motion.video
          src={src}
          aria-label={alt}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          {...sharedMotionProps}
        />
      ) : (
        <motion.div
          animate={config.loop.animate}
          transition={config.loop.transition}
          style={{ transformOrigin: config.origin }}
          className="w-full will-change-transform"
        >
          <motion.img
            src={src}
            alt={alt}
            loading={config.useInView ? "lazy" : "eager"}
            decoding="async"
            {...sharedMotionProps}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
