import { useState } from "react";
import { ChevronDown, Menu, Search, ShoppingBag, User, X } from "lucide-react";

export default function Navbar({ cartCount, onOpenCart, onOpenSearch, onOpenAdvisor, onSelectCategory }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const categories = ["Todos", "Reconstrucción", "Hidratación", "Nutrición", "Accesorios"];

  return (
    <header className="relative z-30 w-full bg-[#8504cf] pt-5 pb-3 px-4 md:px-10">
      <nav className="max-w-[1344px] mx-auto flex items-center justify-between gap-4">
        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white p-2 rounded-xl bg-white/15 hover:bg-white/25 transition"
          aria-label="Abrir menú"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Left links */}
        <div className="hidden lg:flex items-center gap-2">
          <a
            href="#inicio"
            className="bg-white/15 text-white px-4 py-2 rounded-[18px] text-[17px] font-bold hover:bg-white/25 transition"
          >
            Inicio
          </a>

          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <a
              href="#catalogo"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 text-white px-4 py-2 rounded-[18px] text-[17px] font-bold hover:bg-white/15 transition"
            >
              Productos
              <ChevronDown className="w-4 h-4" />
            </a>

            {dropdownOpen && (
              <div className="absolute left-0 top-full pt-2 w-48 z-40">
                <div className="bg-white rounded-2xl shadow-xl border border-purple-100 py-2 overflow-hidden">
                  {categories.map((cat) => (
                    <a
                      key={cat}
                      href="#catalogo"
                      onClick={() => {
                        onSelectCategory(cat);
                        setDropdownOpen(false);
                      }}
                      className="block px-4 py-2 text-sm font-semibold text-[#474747] hover:bg-purple-50 hover:text-[#8504cf] transition"
                    >
                      {cat}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a
            href="#catalogo"
            onClick={() => onSelectCategory("Accesorios")}
            className="text-white px-4 py-2 rounded-[18px] text-[17px] font-bold hover:bg-white/15 transition"
          >
            Accesorios
          </a>
        </div>

        {/* Center Brand Logo */}
        <a
          href="#inicio"
          className="flex items-center justify-center shrink-0 group"
          aria-label="Keishop Always Curly - Ir al inicio"
        >
          <img
            src="/assets/logokeila.webp"
            alt="Keishop Always Curly"
            decoding="async"
            fetchPriority="high"
            className="h-10 md:h-[52px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Right links & icons */}
        <div className="flex items-center gap-1 md:gap-2">
          <div className="hidden lg:flex items-center gap-2 mr-2">
            <button
              onClick={onOpenAdvisor}
              className="text-white px-4 py-2 rounded-[18px] text-[17px] font-bold hover:bg-white/15 transition"
            >
              Asesoría
            </button>
            <a
              href="#faq"
              className="text-white px-4 py-2 rounded-[18px] text-[17px] font-bold hover:bg-white/15 transition"
            >
              Tips Curly
            </a>
          </div>

          <button
            onClick={onOpenSearch}
            className="w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white hover:bg-white/15 transition"
            aria-label="Buscar productos"
          >
            <Search className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={onOpenAdvisor}
            className="hidden sm:flex w-11 h-11 md:w-12 md:h-12 rounded-full items-center justify-center text-white hover:bg-white/15 transition"
            aria-label="Mi rutina curly"
          >
            <User className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={onOpenCart}
            className="relative w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white hover:bg-white/15 transition"
            aria-label="Abrir carrito"
          >
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1 rounded-full bg-[#fddf59] text-[#8504cf] text-xs font-extrabold flex items-center justify-center shadow">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden mt-3 bg-white rounded-3xl p-4 shadow-xl space-y-2 text-[#474747]">
          <a
            href="#inicio"
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-2.5 rounded-2xl font-bold bg-purple-50 text-[#8504cf]"
          >
            Inicio
          </a>
          <a
            href="#stock"
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-2.5 rounded-2xl font-bold hover:bg-purple-50"
          >
            Productos en Stock
          </a>
          <a
            href="#catalogo"
            onClick={() => {
              onSelectCategory("Todos");
              setMobileOpen(false);
            }}
            className="block px-4 py-2.5 rounded-2xl font-bold hover:bg-purple-50"
          >
            Catálogo Curly
          </a>
          <a
            href="#catalogo"
            onClick={() => {
              onSelectCategory("Accesorios");
              setMobileOpen(false);
            }}
            className="block px-4 py-2.5 rounded-2xl font-bold hover:bg-purple-50"
          >
            Accesorios
          </a>
          <button
            onClick={() => {
              setMobileOpen(false);
              onOpenAdvisor();
            }}
            className="w-full text-left px-4 py-2.5 rounded-2xl font-bold hover:bg-purple-50"
          >
            Asesoría Personalizada
          </button>
          <a
            href="#faq"
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-2.5 rounded-2xl font-bold hover:bg-purple-50"
          >
            Preguntas Frecuentes
          </a>
        </div>
      )}
    </header>
  );
}
