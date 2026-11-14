import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpDown,
  Heart,
  Plus,
  Search,
  Truck,
  X,
} from "lucide-react";
import { AsteriskDoodle, BurstDoodle, SpiralDoodle } from "./Doodles";
import { ALL_PRODUCTS, PRODUCT_SECTIONS } from "../data/keishopData";

export default function ProductsPage({
  initialSection = "all",
  onAddToCart,
  onBackHome,
  onOpenAdvisor,
}) {
  const [selectedSection, setSelectedSection] = useState(initialSection);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [favorites, setFavorites] = useState([]);

  // Sync when parent passes a new initialSection (e.g. from Navbar dropdown)
  const activeTab = selectedSection;

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let list = ALL_PRODUCTS.filter((p) => {
      const matchesSection =
        activeTab === "all" ||
        p.sectionId === activeTab ||
        p.section.toLowerCase() === activeTab.toLowerCase();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.section.toLowerCase().includes(q);
      return matchesSection && matchesQuery;
    });

    if (sortBy === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name, "es"));
    }
    return list;
  }, [activeTab, searchQuery, sortBy]);

  const sectionsToRender = useMemo(() => {
    if (activeTab === "all") return PRODUCT_SECTIONS;
    return PRODUCT_SECTIONS.filter(
      (s) => s.id === activeTab || s.title.toLowerCase() === activeTab.toLowerCase()
    );
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-white text-[#474747]">
      {/* ==================== HERO DE CATÁLOGO KEISHOP ==================== */}
      <section className="relative bg-[#8504cf] text-white pt-5 pb-10 md:pt-8 md:pb-16 px-4 md:px-14 overflow-hidden">
        {/* Bokeh Circles matching Main Page Hero */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-85"
        >
          <span className="absolute -left-10 -top-10 w-[180px] aspect-square rounded-full bg-[#bd4cff]" />
          <span className="hidden md:block absolute left-[22%] top-[12%] w-6 aspect-square rounded-full bg-[#bd4cff]" />
          <span className="hidden md:block absolute left-[46%] top-[18%] w-12 aspect-square rounded-full bg-[#bd4cff]" />
          <span className="hidden lg:block absolute right-[18%] top-[10%] w-24 aspect-square rounded-full bg-[#bd4cff]" />
          <span className="hidden lg:block absolute -right-12 bottom-[-20px] w-[200px] aspect-square rounded-full bg-[#bd4cff]" />
          <span className="hidden md:block absolute left-[12%] bottom-[14%] w-16 aspect-square rounded-full bg-[#bd4cff]" />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto space-y-5 md:space-y-8">
          {/* Top Bar: Back to Home + Delivery Badge */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-4">
            <button
              onClick={onBackHome}
              className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/15 hover:bg-white/25 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al inicio</span>
            </button>

            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#f6f6f6] text-[#8504cf] px-3 py-1.5 sm:px-4 sm:py-2 rounded-[14px] text-[11px] sm:text-sm font-bold shadow-sm">
              <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="sm:hidden">Envíos hoy antes de 12:00 p. m.</span>
              <span className="hidden sm:inline">
                Envíos a toda Colombia • Pedidos antes de las 12:00 p. m. llegan hoy
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 pt-1 sm:pt-2">
            <div className="relative inline-block">
              <BurstDoodle
                color="#FDDF59"
                className="w-9 h-9 absolute -top-6 -left-8 -rotate-12 hidden sm:block"
              />
              <SpiralDoodle
                color="#FAA1CE"
                className="w-10 h-10 absolute -top-5 -right-10 rotate-12 hidden sm:block"
              />
              <span className="inline-flex items-center px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/15 text-[#fddf59] text-[11px] sm:text-sm font-bold tracking-wide uppercase">
                Catálogo Oficial Keishop Always Curly
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-[60px] font-bold leading-[1.08] md:leading-[1.05] tracking-tight">
              Productos para una melena{" "}
              <span className="text-[#faa1ce]">always</span>{" "}
              <span className="text-[#fddf59]">curly</span>
            </h1>

            <p className="text-sm sm:text-lg text-white/90 max-w-2xl mx-auto font-medium leading-relaxed">
              Explora nuestras tres secciones de cuidado capilar: Cremas y Tratamientos,
              Accesorios y Óleos seleccionados con amor para cada tipo de rizo.
            </p>
          </div>

          {/* Search & Sort Controls */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3 pt-1 sm:pt-2">
            <div className="md:col-span-8 flex items-center bg-white rounded-full p-1.5 pl-4 sm:pl-5 shadow-lg">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#8504cf] shrink-0 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar producto (Full HD, Skala, Cepillo, Hidroleo...)"
                className="flex-1 bg-transparent outline-none text-xs sm:text-sm md:text-base text-[#474747] placeholder:text-[#79716b] py-1"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:bg-purple-50 text-[#8504cf] flex items-center justify-center transition mr-1"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="md:col-span-4 flex items-center bg-white rounded-full px-4 py-2 sm:py-2.5 shadow-lg text-[#474747]">
              <ArrowUpDown className="w-4 h-4 text-[#8504cf] shrink-0 mr-2" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-transparent outline-none text-xs sm:text-sm font-bold text-[#474747] cursor-pointer"
                aria-label="Ordenar productos"
              >
                <option value="default">Orden de catálogo</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="name-asc">Nombre: A - Z</option>
              </select>
            </div>
          </div>

          {/* Section Filter Pills (Horizontal Swipe on Mobile, Centered Wrap on Desktop) */}
          <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap items-center justify-start sm:justify-center gap-2 sm:gap-3 pt-1 sm:pt-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { id: "all", label: "Todas las secciones (34)" },
              { id: "cremas", label: "1. Cremas y Tratamientos (17)" },
              { id: "accesorios", label: "2. Accesorios (12)" },
              { id: "oleos", label: "3. Óleos (5)" },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedSection(tab.id)}
                  className={`shrink-0 px-4 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-base font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-[#fddf59] text-[#4b0078] shadow-xl sm:scale-105"
                      : "bg-white/15 text-white hover:bg-white/25"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== 3 SECCIONES DE PRODUCTOS ==================== */}
      <div className="relative py-8 md:py-16 pb-28 lg:pb-16 px-3.5 sm:px-6 md:px-14 space-y-10 md:space-y-24 max-w-[1344px] mx-auto">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#faf5ff] rounded-[32px] border border-purple-100 max-w-xl mx-auto p-8 space-y-4">
            <p className="text-2xl font-bold text-[#474747]">
              No encontramos productos para "{searchQuery}"
            </p>
            <p className="text-sm text-[#79716b]">
              Intenta con otro término o explora las 3 secciones completas de Keishop.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedSection("all");
              }}
              className="px-7 py-3 rounded-full bg-[#8504cf] text-white font-bold text-sm hover:bg-[#6a02a8] transition"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          sectionsToRender.map((sec, secIdx) => {
            const sectionItems = filteredProducts.filter((p) => p.sectionId === sec.id);
            if (sectionItems.length === 0) return null;

            const isPinkSection = sec.id === "accesorios";
            const isOilsSection = sec.id === "oleos";

            return (
              <section
                key={sec.id}
                id={`seccion-${sec.id}`}
                className={`relative rounded-[26px] sm:rounded-[36px] p-4 sm:p-10 md:p-12 overflow-hidden ${
                  isPinkSection
                    ? "bg-[#faa1ce]/25 border-2 border-[#faa1ce]/50"
                    : isOilsSection
                    ? "bg-[#faf5ff] border-2 border-[#e9d5ff]"
                    : "bg-white border-2 border-[#f3e8ff] shadow-sm"
                }`}
              >
                {/* Decorative Doodles on Section Header */}
                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-6 pb-5 mb-5 md:pb-8 md:mb-8 border-b-2 border-[#8504cf]/15">
                  <div className="space-y-2 sm:space-y-3 relative">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#8504cf] text-white text-[10px] sm:text-xs font-extrabold uppercase tracking-wider shadow-sm">
                      <span>{sec.badge}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <h2 className="text-2xl sm:text-4xl md:text-[46px] font-bold text-[#474747] leading-tight md:leading-none">
                        {sec.title}
                      </h2>
                      <span
                        className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-2xl text-xs sm:text-sm font-extrabold ${
                          secIdx === 0
                            ? "bg-[#faa1ce] text-white"
                            : secIdx === 1
                            ? "bg-[#1ec9a0] text-white"
                            : "bg-[#fddf59] text-[#4b0078]"
                        }`}
                      >
                        {sectionItems.length}{" "}
                        {sectionItems.length === 1 ? "producto" : "productos"}
                      </span>
                      <BurstDoodle
                        color="#8504CF"
                        className="w-8 h-8 rotate-45 hidden sm:block"
                      />
                    </div>

                    <p className="text-[#79716b] font-semibold text-xs sm:text-base max-w-2xl">
                      {sec.subtitle}
                    </p>
                  </div>

                  <div className="hidden md:flex items-center gap-3 self-start md:self-auto">
                    <SpiralDoodle
                      color="#FDDF59"
                      className="w-10 h-10 hidden lg:block"
                    />
                    <AsteriskDoodle
                      color="#1EC9A0"
                      className="w-7 h-7 hidden lg:block"
                    />
                  </div>
                </div>

                {/* 2-Column Mobile / 4-Column Desktop Product Grid */}
                <div className="relative z-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                  {sectionItems.map((product) => {
                    const isFav = favorites.includes(product.id);
                    return (
                      <motion.article
                        key={product.id}
                        layout
                        whileHover={{ y: -6 }}
                        className="bg-white rounded-[20px] sm:rounded-[26px] p-3 sm:p-5 border border-[#e9d5ff] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div>
                          {/* Product Image Container (padding: 8px, no white background, mix-blend-multiply) */}
                          <div className="relative bg-gradient-to-b from-[#faf5ff] to-[#ffe7f8]/60 rounded-xl sm:rounded-2xl h-[155px] sm:h-[270px] flex items-center justify-center p-1.5 sm:p-2 mb-2.5 sm:mb-4 overflow-hidden">
                            <span className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/95 text-[#8504cf] text-[9px] sm:text-[11px] font-extrabold shadow-sm">
                              {product.badge}
                            </span>

                            {/* Favorite Heart Button matching Figma top-right button */}
                            <button
                              onClick={() => toggleFavorite(product.id)}
                              aria-label={`Marcar ${product.name} como favorito`}
                              className={`absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-sm transition ${
                                isFav
                                  ? "bg-[#f13076] text-white"
                                  : "bg-white text-[#474747] hover:bg-[#ffe7f8] hover:text-[#8504cf]"
                              }`}
                            >
                              <Heart
                                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFav ? "fill-current" : ""}`}
                              />
                            </button>

                            <img
                              src={product.image}
                              alt={product.name}
                              loading="lazy"
                              decoding="async"
                              style={{ mixBlendMode: "multiply" }}
                              className="h-[125px] sm:h-[220px] w-auto object-contain mix-blend-multiply scale-115 sm:scale-125 transition-transform duration-500 group-hover:scale-[1.32] select-none"
                            />
                          </div>

                          {/* Product Info */}
                          <p className="text-[9px] sm:text-[11px] font-extrabold uppercase tracking-wide text-[#8504cf] truncate">
                            {product.category}
                          </p>
                          <h3 className="text-xs sm:text-lg font-bold text-[#222222] leading-snug mt-0.5 sm:mt-1 min-h-[32px] sm:min-h-[44px] line-clamp-2">
                            {product.name}
                          </h3>
                          <p className="hidden sm:line-clamp-2 text-xs text-[#79716b] mt-1.5 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        {/* Price & Add to Cart */}
                        <div className="pt-2.5 mt-2.5 sm:pt-4 sm:mt-4 border-t border-purple-50 space-y-2 sm:space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm sm:text-lg font-extrabold text-[#474747] leading-tight">
                              {product.priceRange}
                            </span>
                          </div>

                          <button
                            onClick={() => onAddToCart(product)}
                            className="w-full py-2 sm:py-2.5 px-2.5 sm:px-4 rounded-full bg-[#8504cf] active:scale-95 hover:bg-[#6a02a8] text-white text-[11px] sm:text-sm font-bold transition flex items-center justify-center gap-1 sm:gap-1.5 shadow-md shadow-purple-500/15"
                          >
                            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                            <span className="sm:hidden">Agregar</span>
                            <span className="hidden sm:inline">Agregar a mi bolsita</span>
                          </button>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              </section>
            );
          })
        )}

        {/* Bottom CTA Banner for Personalized Routine */}
        <section className="relative bg-[#8504cf] text-white rounded-[36px] p-8 md:p-12 overflow-hidden shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center text-[#fddf59] font-bold text-sm">
                <span>¿No sabes cuál elegir para tu tipo de rizo?</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                Te ayudamos a armar tu rutina <span className="text-[#faa1ce]">Always Curly</span>
              </h3>
              <p className="text-white/85 text-sm sm:text-base max-w-xl">
                Descubre qué cremas, accesorios y óleos van mejor con tus ondas, rizos o afro.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={onOpenAdvisor}
                className="px-7 py-4 rounded-full bg-[#fddf59] hover:bg-white text-[#4b0078] font-bold text-sm sm:text-base transition shadow-lg"
              >
                Recibir asesoría gratis
              </button>
              <button
                onClick={onBackHome}
                className="px-6 py-4 rounded-full border-2 border-white/40 hover:border-white text-white font-bold text-sm sm:text-base transition"
              >
                Volver al inicio
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
