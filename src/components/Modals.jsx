import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export function StoryModal({ member, onClose }) {
  return (
    <AnimatePresence>
      {member && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[32px] max-w-lg w-full overflow-hidden shadow-2xl"
          >
            <div className="relative h-60 bg-[#f6c8df]">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-top"
              />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition"
                aria-label="Cerrar historia"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-7 space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-[#faf5ff] text-[#8504cf] text-xs font-bold">
                {member.role} • {member.curlType}
              </span>
              <h3 className="text-3xl font-bold text-[#474747]">{member.name}</h3>
              <p className="text-[#79716b] leading-relaxed text-base">"{member.story}"</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function AdvisorModal({ isOpen, onClose, onRecommend }) {
  const [curlPattern, setCurlPattern] = useState("Rizos (3A - 3C)");
  const [goal, setGoal] = useState("Definición sin frizz");

  const patterns = ["Ondas (2A - 2C)", "Rizos (3A - 3C)", "Afro (4A - 4C)"];
  const goals = ["Definición sin frizz", "Hidratación profunda", "Brillo y suavidad", "Cuidado nocturno"];

  const getRecommendation = () => {
    if (goal === "Cuidado nocturno") return "Accesorios";
    if (goal === "Brillo y suavidad") return "Óleos";
    return "Cremas y Tratamientos";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[32px] max-w-lg w-full p-7 shadow-2xl relative"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-purple-50 text-[#8504cf] flex items-center justify-center hover:bg-purple-100 transition"
              aria-label="Cerrar asesoría"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#f6c8df]/50 text-[#8504cf] text-xs font-bold mb-3">
              Asesoría Always Curly
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-[#474747] mb-2">
              Encuentra tu rutina ideal
            </h3>
            <p className="text-sm text-[#79716b] mb-6">
              Cuéntanos cómo es tu melena y te mostramos los productos Keishop perfectos para ti.
            </p>

            <div className="space-y-5">
              <div>
                <p className="text-sm font-bold text-[#474747] mb-2">1. ¿Cuál es tu patrón de rizo?</p>
                <div className="flex flex-wrap gap-2">
                  {patterns.map((p) => (
                    <button
                      key={p}
                      onClick={() => setCurlPattern(p)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition border ${
                        curlPattern === p
                          ? "bg-[#8504cf] text-white border-[#8504cf]"
                          : "bg-white text-[#474747] border-purple-200 hover:border-[#8504cf]"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-[#474747] mb-2">2. ¿Qué necesitas hoy?</p>
                <div className="flex flex-wrap gap-2">
                  {goals.map((g) => (
                    <button
                      key={g}
                      onClick={() => setGoal(g)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition border ${
                        goal === g
                          ? "bg-[#f6c8df] text-[#8504cf] border-[#8504cf]"
                          : "bg-white text-[#474747] border-purple-200 hover:border-[#8504cf]"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#faf5ff] border border-purple-100 text-sm text-[#474747]">
                <p className="font-bold text-[#8504cf] mb-1">Sugerencia para {curlPattern}:</p>
                <p>
                  Para lograr <strong>{goal.toLowerCase()}</strong>, te recomendamos explorar nuestra
                  línea de <strong>{getRecommendation()}</strong>.
                </p>
              </div>

              <button
                onClick={() => {
                  onRecommend(getRecommendation());
                  onClose();
                }}
                className="w-full py-3.5 rounded-full bg-[#8504cf] hover:bg-[#6a02a8] text-white font-bold shadow-lg shadow-purple-500/25 transition"
              >
                Ver productos recomendados
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
