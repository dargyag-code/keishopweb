import { useState } from "react";
import { ChevronDown, Menu, Search, ShoppingBag, User, X } from "lucide-react";

export default function Navbar({
  cartCount,
  activePage = "inicio",
  onNavigateHome,
  onOpenProductsPage,
  onOpenCart,
  onOpenSearch,
  onOpenAdvisor,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const productSections = [
    { id: "all", label: "Ver Todo el Catálogo (34)" },
    { id: "cremas", label: "1. Cremas y Tratamientos" },
    { id: "accesorios", label: "2. Accesorios" },
    { id: "oleos", label: "3. Óleos" },
  ];

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
          <button
            onClick={() => onNavigateHome("#inicio")}
            className={`px-4 py-2 rounded-[18px] text-[17px] font-bold transition ${
              activePage === "inicio"
                ? "bg-white/20 text-white"
                : "text-white hover:bg-white/15"
            }`}
          >
            Inicio
          </button>

          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              onClick={() => {
                onOpenProductsPage("all");
                setDropdownOpen(false);
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-[18px] text-[17px] font-bold transition ${
                activePage === "productos"
                  ? "bg-white/20 text-white"
                  : "text-white hover:bg-white/15"
              }`}
            >
              Productos
              <ChevronDown className="w-4 h-4" />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full pt-2 w-60 z-40">
                <div className="bg-white rounded-2xl shadow-xl border border-purple-100 py-2 overflow-hidden">
                  {productSections.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => {
                        onOpenProductsPage(sec.id);
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left block px-4 py-2.5 text-sm font-bold text-[#474747] hover:bg-purple-50 hover:text-[#8504cf] transition"
                    >
                      {sec.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => onOpenProductsPage("accesorios")}
            className="text-white px-4 py-2 rounded-[18px] text-[17px] font-bold hover:bg-white/15 transition"
          >
            Accesorios
          </button>

          <button
            onClick={() => onOpenProductsPage("oleos")}
            className="text-white px-4 py-2 rounded-[18px] text-[17px] font-bold hover:bg-white/15 transition"
          >
            Óleos
          </button>
        </div>

        {/* Center Brand Logo */}
        <button
          onClick={() => onNavigateHome("#inicio")}
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
        </button>

        {/* Right links & icons */}
        <div className="flex items-center gap-1 md:gap-2">
          <div className="hidden lg:flex items-center gap-2 mr-2">
            <button
              onClick={onOpenAdvisor}
              className="text-white px-4 py-2 rounded-[18px] text-[17px] font-bold hover:bg-white/15 transition"
            >
              Asesoría
            </button>
            <button
              onClick={() => onNavigateHome("#faq")}
              className="text-white px-4 py-2 rounded-[18px] text-[17px] font-bold hover:bg-white/15 transition"
            >
              Tips Curly
            </button>
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
          <button
            onClick={() => {
              onNavigateHome("#inicio");
              setMobileOpen(false);
            }}
            className="w-full text-left block px-4 py-2.5 rounded-2xl font-bold bg-purple-50 text-[#8504cf]"
          >
            Inicio
          </button>
          <button
            onClick={() => {
              onOpenProductsPage("all");
              setMobileOpen(false);
            }}
            className="w-full text-left block px-4 py-2.5 rounded-2xl font-bold hover:bg-purple-50"
          >
            Catálogo Completo (34 Productos)
          </button>
          <button
            onClick={() => {
              onOpenProductsPage("cremas");
              setMobileOpen(false);
            }}
            className="w-full text-left block px-4 py-2.5 rounded-2xl font-bold hover:bg-purple-50"
          >
            1. Cremas y Tratamientos
          </button>
          <button
            onClick={() => {
              onOpenProductsPage("accesorios");
              setMobileOpen(false);
            }}
            className="w-full text-left block px-4 py-2.5 rounded-2xl font-bold hover:bg-purple-50"
          >
            2. Accesorios
          </button>
          <button
            onClick={() => {
              onOpenProductsPage("oleos");
              setMobileOpen(false);
            }}
            className="w-full text-left block px-4 py-2.5 rounded-2xl font-bold hover:bg-purple-50"
          >
            3. Óleos
          </button>
          <button
            onClick={() => {
              setMobileOpen(false);
              onOpenAdvisor();
            }}
            className="w-full text-left px-4 py-2.5 rounded-2xl font-bold hover:bg-purple-50"
          >
            Asesoría Personalizada
          </button>
          <button
            onClick={() => {
              onNavigateHome("#faq");
              setMobileOpen(false);
            }}
            className="w-full text-left block px-4 py-2.5 rounded-2xl font-bold hover:bg-purple-50"
          >
            Preguntas Frecuentes
          </button>
        </div>
      )}
    </header>
  );
}
