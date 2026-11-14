import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import ProductVisual from "./ProductVisual";

export default function CartDrawer({ isOpen, onClose, items, onUpdateQty, onRemove, onCheckout }) {
  const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-purple-100 bg-[#8504cf] text-white">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-[#fddf59]" />
                <div>
                  <h3 className="text-xl font-bold leading-tight">Tu Bolsita Curly</h3>
                  <p className="text-xs text-white/80">Keishop — Always Curly</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition"
                aria-label="Cerrar carrito"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-20 h-20 rounded-full bg-[#f6c8df]/40 mx-auto flex items-center justify-center text-3xl">
                    💜
                  </div>
                  <p className="text-lg font-bold text-[#474747]">Tu bolsita está vacía</p>
                  <p className="text-sm text-[#79716b] max-w-xs mx-auto">
                    Agrega tus cremas, geles o accesorios favoritos para consentir tus rizos.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 rounded-2xl border border-purple-100 bg-[#faf5ff]/60 items-center"
                  >
                    <div className="w-16 h-16 rounded-xl bg-white p-1 shrink-0 border border-purple-100">
                      <ProductVisual type={item.visualType} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-[#474747] truncate">{item.name}</h4>
                      <p className="text-xs text-[#8504cf] font-semibold">
                        S/{item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="w-7 h-7 rounded-full bg-white border border-purple-200 flex items-center justify-center hover:bg-purple-100 text-[#8504cf]"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-bold w-6 text-center">{item.qty}</span>
                        <button
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="w-7 h-7 rounded-full bg-white border border-purple-200 flex items-center justify-center hover:bg-purple-100 text-[#8504cf]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-gray-400 hover:text-[#f13076] p-1.5 transition"
                      aria-label="Eliminar producto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-purple-100 bg-purple-50/40 space-y-4">
                <div className="flex items-center justify-between text-base font-bold text-[#474747]">
                  <span>Total estimado</span>
                  <span className="text-xl text-[#8504cf]">S/{total.toFixed(2)}</span>
                </div>
                <button
                  onClick={onCheckout}
                  className="w-full py-3.5 rounded-full bg-[#8504cf] hover:bg-[#6a02a8] text-white font-bold shadow-lg shadow-purple-500/25 transition flex items-center justify-center gap-2"
                >
                  Confirmar pedido por WhatsApp ✨
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
