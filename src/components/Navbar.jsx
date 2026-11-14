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
    <header className="sticky top-0 lg:relative z-30 w-full bg-[#8504cf]/95 lg:bg-[#8504cf] backdrop-blur-md lg:backdrop-blur-none pt-3 pb-2.5 md:pt-5 md:pb-3 px-4 md:px-10 shadow-md lg:shadow-none">
      <nav className="max-w-[1344px] mx-auto flex items-center justify-between gap-4">
        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white p-2.5 rounded-2xl bg-white/15 active:scale-95 hover:bg-white/25 transition"
          aria-label="Abrir menú"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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

      {/* Mobile Quick-Navigation Pill Strip (visible only on mobile/tablet < lg) */}
      <div className="flex lg:hidden items-center gap-2 overflow-x-auto no-scrollbar pt-2.5 pb-0.5 -mx-4 px-4">
        {[
          {
            label: "Inicio",
            active: activePage === "inicio",
            onClick: () => {
              onNavigateHome("#inicio");
              setMobileOpen(false);
            },
          },
          {
            label: "Catálogo (34)",
            active: activePage === "productos",
            onClick: () => {
              onOpenProductsPage("all");
              setMobileOpen(false);
            },
          },
          {
            label: "Cremas",
            active: false,
            onClick: () => {
              onOpenProductsPage("cremas");
              setMobileOpen(false);
            },
          },
          {
            label: "Accesorios",
            active: false,
            onClick: () => {
              onOpenProductsPage("accesorios");
              setMobileOpen(false);
            },
          },
          {
            label: "Óleos",
            active: false,
            onClick: () => {
              onOpenProductsPage("oleos");
              setMobileOpen(false);
            },
          },
          {
            label: "Asesoría",
            active: false,
            onClick: () => {
              setMobileOpen(false);
              onOpenAdvisor();
            },
          },
          {
            label: "Preguntas",
            active: false,
            onClick: () => {
              onNavigateHome("#faq");
              setMobileOpen(false);
            },
          },
        ].map((pill) => (
          <button
            key={pill.label}
            onClick={pill.onClick}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
              pill.active
                ? "bg-[#fddf59] text-[#4b0078] shadow-sm"
                : "bg-white/15 text-white active:bg-white/30"
            }`}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Mobile Floating Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute left-4 right-4 top-full mt-2 z-50 bg-white rounded-3xl p-4 shadow-2xl border border-purple-100 space-y-1.5 text-[#474747]">
          <button
            onClick={() => {
              onNavigateHome("#inicio");
              setMobileOpen(false);
            }}
            className="w-full text-left block px-4 py-2.5 rounded-2xl text-sm font-bold bg-purple-50 text-[#8504cf]"
          >
            Inicio
          </button>
          <button
            onClick={() => {
              onOpenProductsPage("all");
              setMobileOpen(false);
            }}
            className="w-full text-left block px-4 py-2.5 rounded-2xl text-sm font-bold hover:bg-purple-50"
          >
            Catálogo Completo (34 Productos)
          </button>
          <button
            onClick={() => {
              onOpenProductsPage("cremas");
              setMobileOpen(false);
            }}
            className="w-full text-left block px-4 py-2.5 rounded-2xl text-sm font-bold hover:bg-purple-50"
          >
            1. Cremas y Tratamientos
          </button>
          <button
            onClick={() => {
              onOpenProductsPage("accesorios");
              setMobileOpen(false);
            }}
            className="w-full text-left block px-4 py-2.5 rounded-2xl text-sm font-bold hover:bg-purple-50"
          >
            2. Accesorios
          </button>
          <button
            onClick={() => {
              onOpenProductsPage("oleos");
              setMobileOpen(false);
            }}
            className="w-full text-left block px-4 py-2.5 rounded-2xl text-sm font-bold hover:bg-purple-50"
          >
            3. Óleos
          </button>
          <button
            onClick={() => {
              setMobileOpen(false);
              onOpenAdvisor();
            }}
            className="w-full text-left px-4 py-2.5 rounded-2xl text-sm font-bold hover:bg-purple-50"
          >
            Asesoría Personalizada
          </button>
          <button
            onClick={() => {
              onNavigateHome("#faq");
              setMobileOpen(false);
            }}
            className="w-full text-left block px-4 py-2.5 rounded-2xl text-sm font-bold hover:bg-purple-50"
          >
            Preguntas Frecuentes
          </button>
        </div>
      )}
    </header>
  );
}
