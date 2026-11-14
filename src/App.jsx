import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Facebook,
  Instagram,
  MessageCircle,
  Plus,
  Quote,
  Search,
  Truck,
} from "lucide-react";
import ScrollRibbon from "./components/ScrollRibbon";
import Navbar from "./components/Navbar";
import ProductsPage from "./components/ProductsPage";
import CartDrawer from "./components/CartDrawer";
import KeilaSticker from "./components/KeilaSticker";
import HeroWalkingCanvas from "./components/HeroWalkingCanvas";
import { AdvisorModal } from "./components/Modals";
import { AsteriskDoodle, BurstDoodle, HeartDoodle, SpiralDoodle } from "./components/Doodles";
import {
  ALL_PRODUCTS,
  CATALOG_PRODUCTS,
  FAQS,
  STOCK_PRODUCTS,
  TESTIMONIALS,
  formatCOP,
} from "./data/keishopData";

export default function App() {
  const [activePage, setActivePage] = useState("inicio");
  const [productsInitialSection, setProductsInitialSection] = useState("all");
  const [cart, setCart] = useState([
    { ...STOCK_PRODUCTS[0], qty: 1 },
  ]);
  const [cartOpen, setCartOpen] = useState(false);
  const [advisorOpen, setAdvisorOpen] = useState(false);
  const [toast, setToast] = useState("");

  // Catalog search & filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Destacados");
  const searchInputRef = useRef(null);
  const catalogSectionRef = useRef(null);
  const catalogTextBlockRef = useRef(null);

  // Testimonials carousel index
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // FAQ accordion state (5th item expanded by default, matching Figma)
  const [openFaq, setOpenFaq] = useState(4);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2600);
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`${product.name} agregado a tu bolsita`);
  };

  const updateCartQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    const summary = cart.map((i) => `• ${i.qty}x ${i.name} (${formatCOP(i.price)})`).join("%0A");
    const total = formatCOP(cart.reduce((acc, i) => acc + i.price * i.qty, 0));
    showToast("Preparando tu pedido Always Curly");
    window.open(
      `https://wa.me/573202347818?text=Hola%20Keishop,%20quiero%20confirmar%20mi%20pedido%20Always%20Curly:%0A${summary}%0A%0ATotal:%20${total}`,
      "_blank"
    );
  };

  const handleNavigateHome = (targetSelector = "#inicio") => {
    setActivePage("inicio");
    setTimeout(() => {
      if (targetSelector === "#inicio") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.querySelector(targetSelector);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }, 60);
  };

  const handleOpenProductsPage = (sectionId = "all") => {
    setProductsInitialSection(sectionId);
    setActivePage("productos");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const focusSearch = () => {
    if (activePage === "productos") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById("catalogo");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => searchInputRef.current?.focus(), 450);
  };

  const handleSelectCategory = (category) => {
    const sectionMap = {
      "Cremas y Tratamientos": "cremas",
      Accesorios: "accesorios",
      "Óleos": "oleos",
    };
    if (activePage === "productos") {
      setProductsInitialSection(sectionMap[category] || "all");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setActiveCategory(category);
    const el = document.getElementById("catalogo");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const q = searchQuery.trim().toLowerCase();
  const baseCatalogSource =
    activeCategory === "Destacados" && !q ? CATALOG_PRODUCTS : ALL_PRODUCTS;

  const filteredCatalog = baseCatalogSource.filter((p) => {
    const matchesCat =
      activeCategory === "Destacados" ||
      activeCategory === "Todos" ||
      p.section === activeCategory ||
      p.filterTag === activeCategory ||
      (p.filterCategories && p.filterCategories.includes(activeCategory));
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.section.toLowerCase().includes(q) ||
      p.filterTag.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const visibleFaqs = showAllFaqs ? FAQS : FAQS.slice(0, 5);
  const totalCartItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#474747]">
      {/* Navbar */}
      <Navbar
        cartCount={totalCartItems}
        activePage={activePage}
        onNavigateHome={handleNavigateHome}
        onOpenProductsPage={handleOpenProductsPage}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={focusSearch}
        onOpenAdvisor={() => setAdvisorOpen(true)}
      />

      {activePage === "productos" ? (
        <ProductsPage
          key={productsInitialSection}
          initialSection={productsInitialSection}
          onAddToCart={addToCart}
          onBackHome={() => handleNavigateHome("#inicio")}
          onOpenAdvisor={() => setAdvisorOpen(true)}
        />
      ) : (
      /* Main content wrapped with continuous ScrollRibbon */
      <main className="relative w-full overflow-hidden">
        {/* Listón morado animado sincronizado con el scroll */}
        <ScrollRibbon />

        {/* ==================== 1. HERO SECTION ==================== */}
        <section
          id="inicio"
          className="relative z-[3] bg-[#8504cf] text-white pt-8 pb-8 md:pt-12 md:pb-0 px-6 md:px-14 overflow-x-clip"
        >
          {/* Decorative Bokeh Circles from Figma (#BD4CFF at 85% opacity) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden opacity-85"
          >
            {/* Top-left large circle (Ellipse 23: x=0, y=0, 214px) */}
            <span className="absolute left-0 top-0 w-[120px] md:w-[11.15%] max-w-[214px] aspect-square rounded-full bg-[#bd4cff]" />
            {/* Small circles & accents across Hero (exact Figma 1920x688 proportions) */}
            <span className="hidden md:block absolute left-[23.13%] top-[5.38%] w-[1.04%] min-w-[14px] max-w-[20px] aspect-square rounded-full bg-[#bd4cff]" />
            <span className="hidden md:block absolute left-[42.34%] top-[14.83%] w-[2.6%] min-w-[32px] max-w-[50px] aspect-square rounded-full bg-[#bd4cff]" />
            <span className="hidden lg:block absolute left-[76.77%] top-[6.83%] w-[5.21%] max-w-[100px] aspect-square rounded-full bg-[#bd4cff]" />
            <span className="hidden lg:block absolute left-[92.29%] top-[18.46%] w-[1.04%] min-w-[14px] max-w-[20px] aspect-square rounded-full bg-[#bd4cff]" />
            <span className="hidden md:block absolute left-[3.02%] top-[47.53%] w-[1.04%] min-w-[14px] max-w-[20px] aspect-square rounded-full bg-[#bd4cff]" />
            <span className="hidden md:block absolute left-[9.84%] top-[47.53%] w-[2.6%] min-w-[32px] max-w-[50px] aspect-square rounded-full bg-[#bd4cff]" />
            <span className="hidden md:block absolute left-[3.54%] top-[77.76%] w-[5.21%] min-w-[60px] max-w-[100px] aspect-square rounded-full bg-[#bd4cff]" />
            <span className="hidden md:block absolute left-[25.68%] top-[92.3%] w-[1.04%] min-w-[14px] max-w-[20px] aspect-square rounded-full bg-[#bd4cff]" />
            <span className="hidden md:block absolute left-[42.34%] top-[79.22%] w-[5.21%] min-w-[64px] max-w-[100px] aspect-square rounded-full bg-[#bd4cff]" />
            <span className="hidden md:block absolute left-[39.58%] top-[42.44%] w-[1.04%] min-w-[14px] max-w-[20px] aspect-square rounded-full bg-[#bd4cff]" />
            <span className="hidden lg:block absolute left-[46.35%] top-[54.8%] w-[1.04%] min-w-[14px] max-w-[20px] aspect-square rounded-full bg-[#bd4cff]" />
            <span className="hidden lg:block absolute left-[79.38%] top-[70.49%] w-[2.6%] min-w-[32px] max-w-[50px] aspect-square rounded-full bg-[#bd4cff]" />
            <span className="hidden lg:block absolute left-[94.43%] top-[90.84%] w-[1.04%] min-w-[14px] max-w-[20px] aspect-square rounded-full bg-[#bd4cff]" />
            <span className="hidden lg:block absolute left-[88.85%] top-[43.9%] w-[11.15%] max-w-[214px] aspect-square rounded-full bg-[#bd4cff]" />
            {/* 3 new #BD4CFF large circles framing the product collage (Ellipses 38, 39, 40) */}
            <span className="hidden lg:block absolute left-[53.13%] top-[8.28%] w-[11.15%] max-w-[214px] aspect-square rounded-full bg-[#bd4cff]" />
            <span className="hidden lg:block absolute left-[44.95%] top-[40.7%] w-[11.15%] max-w-[214px] aspect-square rounded-full bg-[#bd4cff]" />
            <span className="hidden lg:block absolute left-[64.27%] top-[40.7%] w-[11.15%] max-w-[214px] aspect-square rounded-full bg-[#bd4cff]" />
          </div>

          <div className="relative z-10 max-w-[1344px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center lg:min-h-[640px]">
            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 py-4 md:py-16 space-y-7"
            >
              <div className="relative inline-block">
                <img
                  src="/assets/hero-burst.svg"
                  alt=""
                  aria-hidden="true"
                  className="w-12 h-12 absolute -top-9 -right-10 md:-right-13 rotate-12 pointer-events-none select-none"
                />
                <h1 className="text-5xl sm:text-6xl md:text-[72px] font-bold leading-[1.0] tracking-tight">
                  <span className="block text-white">Tus rizos</span>
                  <span className="block text-white mt-1">merecen</span>
                  <span className="block mt-1">
                    <span className="text-white">algo </span>
                    <span className="text-[#faa1ce]">único</span>
                  </span>
                </h1>
              </div>

              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-[490px] leading-relaxed font-medium">
                Productos curly cuidadosamente seleccionados, llenos de hidratación y amor para
                convertir cada rutina de tu melena en un momento{" "}
                <span className="text-[#fddf59] font-bold">always curly</span>.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => handleOpenProductsPage("all")}
                  className="bg-[#fafcff] text-[#8504cf] hover:bg-[#fddf59] hover:text-[#4b0078] transition-all duration-300 px-8 py-4 rounded-full font-bold text-base inline-flex items-center justify-center shadow-xl shadow-black/15 hover:scale-105"
                >
                  Ver productos
                </button>
                <button
                  onClick={() => setAdvisorOpen(true)}
                  className="px-7 py-4 rounded-full border-2 border-white/40 hover:border-white text-white font-bold text-base transition hover:bg-white/10"
                >
                  Armar mi rutina
                </button>
              </div>
            </motion.div>

            {/* Hero Product Collage Showcase (exact Figma composition) */}
            <div className="lg:col-span-6 flex justify-center lg:justify-start self-end relative">
              <div className="relative w-full max-w-[560px] lg:max-w-none lg:w-[114%] xl:w-[126%] 2xl:w-[143.3%] 2xl:-ml-[18.6%] aspect-[940/745] lg:translate-y-7 2xl:translate-y-12 select-none">
                {[
                  {
                    src: "/assets/hero-prod-3.webp",
                    alt: "Crema Definidora Full HD Linaza y Gelatina",
                    left: "27.45%",
                    top: "34.50%",
                    width: "49.15%",
                    height: "62.01%",
                    rotate: 0,
                    delay: 0.05,
                  },
                  {
                    src: "/assets/hero-prod-4.webp",
                    alt: "Crema Definidora Full HD Afro Hold Linaza y Oliva",
                    left: "0.06%",
                    top: "35.07%",
                    width: "49.21%",
                    height: "62.09%",
                    rotate: -4,
                    delay: 0.1,
                  },
                  {
                    src: "/assets/hero-prod-5.webp",
                    alt: "Spray Boom Anti Frizz Mi Dulce Pelo",
                    left: "8.72%",
                    top: "14.03%",
                    width: "28.79%",
                    height: "36.32%",
                    rotate: -3.5,
                    delay: 0.15,
                  },
                  {
                    src: "/assets/hero-prod-6.webp",
                    alt: "Tratamiento 3 en 1 Soy Lisa Mi Dulce Pelo",
                    left: "51.49%",
                    top: "38.51%",
                    width: "48.49%",
                    height: "61.18%",
                    rotate: 13.5,
                    delay: 0.2,
                  },
                  {
                    src: "/assets/hero-prod-7.webp",
                    alt: "Tratamiento 3 en 1 Soy Crespa Mi Dulce Pelo",
                    left: "53.61%",
                    top: "7.94%",
                    width: "46.05%",
                    height: "58.11%",
                    rotate: 21,
                    delay: 0.25,
                  },
                  {
                    src: "/assets/hero-prod-8.webp",
                    alt: "Shampoo Chantilly Mi Dulce Pelo",
                    left: "39.41%",
                    top: "3.63%",
                    width: "40.80%",
                    height: "47.02%",
                    rotate: 20,
                    delay: 0.3,
                  },
                  {
                    src: "/assets/hero-prod-9.webp",
                    alt: "Shampoo Seco Minisigüi Mi Dulce Pelo",
                    left: "25.84%",
                    top: "0.01%",
                    width: "45.02%",
                    height: "54.34%",
                    rotate: 0,
                    delay: 0.35,
                  },
                  {
                    src: "/assets/hero-prod-10.webp",
                    alt: "Espuma de Suspiros Mi Dulce Pelo",
                    left: "17.79%",
                    top: "2.62%",
                    width: "39.85%",
                    height: "48.11%",
                    rotate: -10,
                    delay: 0.4,
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={item.src}
                    initial={{ opacity: 0, y: 20, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.65,
                      delay: item.delay,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      left: item.left,
                      top: item.top,
                      width: item.width,
                      height: item.height,
                      zIndex: idx + 1,
                    }}
                    className="absolute"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, y: -6 }}
                      transition={{ type: "spring", stiffness: 280, damping: 20 }}
                      className="w-full h-full"
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="eager"
                        decoding="async"
                        fetchPriority={idx >= 4 ? "high" : "auto"}
                        style={{ transform: `rotate(${item.rotate}deg)` }}
                        className="w-full h-full object-contain pointer-events-none"
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 2. PRODUCTOS EN STOCK ==================== */}
        <section id="stock" className="relative bg-[#faa1ce] pt-20 pb-20 px-6 md:px-14 overflow-hidden">
          {/* Translucent wave pattern from Figma */}
          <img
            src="/assets/wave-faq.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="pointer-events-none select-none opacity-20 absolute top-0 left-0 w-full h-[380px] object-cover object-bottom rotate-180 z-[1]"
          />
          <img
            src="/assets/wave-faq.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="pointer-events-none select-none opacity-20 absolute bottom-0 left-0 w-full h-[380px] object-cover object-top z-[1]"
          />

          <div className="relative z-10 max-w-[1200px] mx-auto space-y-10">
            {/* Header & Doodles */}
            <div className="relative space-y-5">
              <SpiralDoodle
                color="#FDDF59"
                className="hidden md:block w-14 h-14 absolute right-12 -top-4"
              />

              {/* Top Delivery Pill */}
              <div className="relative inline-flex items-center gap-2 bg-[#f6f6f6] text-[#8504cf] px-4 py-2 rounded-[14px] text-sm font-bold shadow-sm">
                <BurstDoodle
                  color="#8504CF"
                  className="w-8 h-8 absolute -left-9 -top-5 -rotate-45"
                />
                <Truck className="w-4 h-4" />
                <span>Envíos a toda Colombia</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <h2 className="text-4xl sm:text-5xl md:text-[62px] font-bold text-white tracking-tight leading-none">
                  Productos en
                </h2>
                <button
                  onClick={() => handleOpenProductsPage("all")}
                  className="bg-[#8504cf] text-white px-6 py-2 rounded-[26px] text-4xl sm:text-5xl md:text-[58px] font-bold tracking-tight shadow-[0_8px_10px_rgba(86,106,78,0.2)] hover:scale-105 transition inline-block"
                >
                  STOCK
                </button>
                <BurstDoodle color="#8504CF" className="w-9 h-9 rotate-90 hidden sm:block" />
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <p className="text-white/95 font-semibold text-base max-w-2xl">
                  Si realizas tu pedido hasta las 12:00 p. m. lo recibes el mismo día; si pagas
                  después del mediodía, lo recibes al día siguiente.
                </p>

                <button
                  onClick={() => handleOpenProductsPage("all")}
                  className="bg-[#8504cf] hover:bg-[#6a02a8] text-white rounded-full pl-6 pr-2 py-2 inline-flex items-center gap-4 shadow-[0_8px_14px_rgba(240,62,131,0.3)] transition self-start md:self-auto shrink-0 font-bold"
                >
                  <span>Ver stock disponible</span>
                  <span className="w-10 h-10 rounded-full bg-white text-[#8504cf] flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5" />
                  </span>
                </button>
              </div>
            </div>

            {/* 2 Featured Stock Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-[920px] mx-auto pt-2">
              {STOCK_PRODUCTS.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-[28px] p-6 shadow-md border border-purple-100 flex flex-col justify-between"
                >
                  <div className="relative bg-[#faf5ff] rounded-2xl p-2 h-72 flex items-center justify-center overflow-hidden mb-5">
                    <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-[#1ec9a0]/15 text-[#0d9488] text-xs font-bold">
                      {item.badge}
                    </span>
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      style={{ mixBlendMode: "multiply" }}
                      className="h-[220px] w-auto object-contain mix-blend-multiply scale-125 transition-transform duration-300 hover:scale-[1.32]"
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#474747]">{item.name}</h3>
                    <p className="text-xs font-bold uppercase tracking-wide text-[#8504cf]">
                      {item.category}
                    </p>
                    <p className="text-xl font-extrabold text-[#474747] pt-1">{item.priceRange}</p>
                    <div className="flex items-center gap-2 text-xs text-[#8504cf] font-semibold pt-1">
                      <Truck className="w-4 h-4 shrink-0" />
                      <span>{item.deliveryNote}</span>
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      className="mt-4 w-full py-3 rounded-full bg-[#8504cf] hover:bg-[#6a02a8] text-white font-bold text-sm transition flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Agregar a mi bolsita
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 3. CATÁLOGO Y BUSCADOR ==================== */}
        <section
          ref={catalogSectionRef}
          id="catalogo"
          className="relative bg-white py-20 px-6 md:px-14 overflow-hidden"
        >
          <div className="relative z-10 max-w-[1200px] mx-auto space-y-10">
            {/* Heading with doodles + Keila caminando con scroll */}
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6">
              <div className="lg:col-span-7 flex justify-center lg:justify-start">
                <div ref={catalogTextBlockRef} className="relative inline-block text-center lg:text-left space-y-2">
                  <BurstDoodle
                    color="#8504CF"
                    className="hidden sm:block w-8 h-8 absolute -left-8 -top-3 -rotate-45"
                  />
                  <SpiralDoodle
                    color="#FDDF59"
                    className="hidden sm:block w-12 h-12 absolute -right-10 -top-2"
                  />
                  <SpiralDoodle
                    color="#8504CF"
                    className="hidden sm:block w-10 h-10 absolute left-6 -bottom-6"
                  />

                  <h2 className="text-3xl sm:text-4xl md:text-[46px] font-bold text-[#474747] leading-tight">
                    Encuentra el producto perfecto para
                    <br />
                    tu rutina <span className="text-[#eea7ca]">always curly</span>
                  </h2>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <HeroWalkingCanvas
                  src="/assets/keila-video1.webm"
                  alt="Keila caminando hacia el título del catálogo Keishop Always Curly"
                  sectionRef={catalogSectionRef}
                  textBlockRef={catalogTextBlockRef}
                  className="max-w-[340px] sm:max-w-[400px] lg:max-w-[480px]"
                />
              </div>
            </div>

            {/* Interactive Search Bar */}
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex items-center bg-white border-2 border-[#8504cf] rounded-full p-1.5 pl-6 shadow-sm focus-within:ring-4 focus-within:ring-purple-200 transition">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar en todos los productos (crema, gel, cepillo, satín...)"
                  className="flex-1 bg-transparent outline-none text-sm md:text-base text-[#474747] placeholder:text-[#79716b]"
                />
                <button
                  onClick={() => searchInputRef.current?.focus()}
                  className="w-11 h-11 rounded-full bg-[#8504cf] hover:bg-[#6a02a8] text-white flex items-center justify-center transition shrink-0"
                  aria-label="Buscar"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>

              {/* Filter Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  "Destacados",
                  "Todos",
                  "Cremas y Tratamientos",
                  "Accesorios",
                  "Óleos",
                ].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-bold transition ${
                      activeCategory === cat
                        ? "bg-[#8504cf] text-white shadow-md"
                        : "bg-[#faf5ff] text-[#8504cf] hover:bg-[#faa1ce]/40"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid with Mint "Más vendidos" Feature Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {activeCategory === "Destacados" && !searchQuery && (
                <div className="bg-[#1ec9a0] rounded-[28px] p-8 flex flex-col items-center justify-between text-center text-white relative overflow-hidden min-h-[440px] shadow-md">
                  <BurstDoodle
                    color="#FDDF59"
                    className="w-10 h-10 absolute top-5 right-6 rotate-12"
                  />
                  <div className="space-y-1 pt-2">
                    <p className="text-3xl md:text-4xl font-extrabold leading-tight">¡Los más</p>
                    <p className="text-4xl md:text-5xl font-extrabold text-[#fddf59] leading-none">
                      vendidos!
                    </p>
                  </div>

                  <div className="my-4 w-48 h-48 rounded-full bg-[#faf5ff]/90 flex items-center justify-center p-2 shadow-inner overflow-hidden">
                    <img
                      src="/assets/products/crema-16.png"
                      alt="Favoritos Keishop"
                      loading="lazy"
                      decoding="async"
                      style={{ mixBlendMode: "multiply" }}
                      className="h-[185px] w-auto object-contain mix-blend-multiply scale-110"
                    />
                  </div>

                  <button
                    onClick={() => handleOpenProductsPage("all")}
                    className="bg-[#8504cf] hover:bg-[#6a02a8] text-white rounded-full pl-6 pr-2 py-2 inline-flex items-center gap-3 font-bold shadow-lg transition hover:scale-105"
                  >
                    <span>Ver Catálogo Completo</span>
                    <span className="w-9 h-9 rounded-full bg-white text-[#8504cf] flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </button>
                </div>
              )}

              {filteredCatalog.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-[28px] p-6 border border-[#e9d5ff] shadow-sm hover:shadow-xl transition flex flex-col justify-between"
                >
                  <div>
                    <div className="bg-[#ffe7f8]/60 rounded-2xl h-64 flex items-center justify-center p-2 mb-5 relative overflow-hidden">
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white text-[#8504cf] text-xs font-bold shadow-sm z-10">
                        {product.filterTag}
                      </span>
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        style={{ mixBlendMode: "multiply" }}
                        className="h-[220px] w-auto object-contain mix-blend-multiply scale-125 transition-transform duration-300 hover:scale-[1.32]"
                      />
                    </div>

                    <h3 className="text-lg font-bold text-[#474747] leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs font-extrabold uppercase tracking-wide text-[#8504cf] mt-1">
                      {product.category}
                    </p>
                    <p className="text-xs text-[#79716b] mt-2 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-purple-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-extrabold text-[#474747]">
                        {product.priceRange}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="px-4 py-2 rounded-full bg-[#8504cf] hover:bg-[#6a02a8] text-white text-xs font-bold transition inline-flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Agregar
                      </button>
                    </div>
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-[#8504cf]">
                      <Truck className="w-3.5 h-3.5 shrink-0" />
                      {product.deliveryNote}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredCatalog.length === 0 && (
              <div className="text-center py-12 bg-[#faf5ff] rounded-3xl">
                <p className="text-lg font-bold text-[#474747]">
                  No encontramos productos con "{searchQuery}"
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("Destacados");
                  }}
                  className="mt-3 px-5 py-2 rounded-full bg-[#8504cf] text-white text-sm font-bold"
                >
                  Ver productos destacados
                </button>
              </div>
            )}

            {/* CTA to Open Full Products Page */}
            <div className="pt-4 flex justify-center">
              <button
                onClick={() => handleOpenProductsPage("all")}
                className="bg-[#8504cf] hover:bg-[#6a02a8] text-white rounded-full pl-8 pr-3 py-3 inline-flex items-center gap-4 font-extrabold text-base md:text-lg shadow-[0_12px_24px_rgba(133,4,207,0.3)] hover:scale-105 transition"
              >
                <span>Ver Página Completa de Productos (34 productos)</span>
                <span className="w-11 h-11 rounded-full bg-[#fddf59] text-[#4b0078] flex items-center justify-center shadow">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* ==================== 4. AMOR PROPIO / CONÓCENOS ==================== */}
        <section
          id="conocenos"
          className="relative bg-[#8504cf] text-white py-24 px-6 md:px-14 overflow-hidden"
        >
          {/* Decorative Bokeh Circles matching Figma */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <span className="absolute -left-8 top-0 w-[180px] h-[180px] rounded-full bg-white/15" />
            <span className="hidden md:block absolute left-[8%] top-[36%] w-20 h-20 rounded-full bg-white/10" />
            <span className="hidden md:block absolute left-[22%] top-[22%] w-5 h-5 rounded-full bg-white/20" />
            <span className="hidden md:block absolute right-[24%] top-[20%] w-[90px] h-[90px] rounded-full bg-white/10" />
            <span className="hidden md:block absolute right-[16%] bottom-[18%] w-12 h-12 rounded-full bg-white/15" />
            <span className="hidden lg:block absolute right-[10%] top-[8%] w-[83px] h-[83px] rounded-full bg-white/10" />
            <span className="hidden lg:block absolute -right-10 top-[35%] w-[208px] h-[208px] rounded-full bg-white/15" />
            <span className="hidden md:block absolute -left-6 bottom-[6%] w-[190px] h-[190px] rounded-full bg-white/15" />
            <span className="hidden md:block absolute left-[16%] bottom-[12%] w-7 h-7 rounded-full bg-white/20" />
          </div>

          <div className="relative z-10 max-w-[820px] mx-auto text-center space-y-8">
            <div className="relative inline-block">
              <BurstDoodle
                color="#FFD166"
                className="hidden sm:block w-10 h-10 absolute -top-7 -left-10 -rotate-12"
              />
              <SpiralDoodle
                color="#FF85B3"
                className="hidden sm:block w-11 h-11 absolute -top-6 -right-12 rotate-12"
              />
              <h2 className="text-4xl sm:text-5xl md:text-[60px] lg:text-[66px] font-bold leading-[1.08] tracking-tight">
                Cuidar tu cabello <span className="text-[#fddf59]">rizado</span>
                <br />
                es una forma de demostrar
                <br />
                amor <span className="text-[#1ec9a0]">propio</span>
              </h2>
            </div>

            <p className="text-lg sm:text-xl md:text-[26px] text-white/95 font-medium leading-[1.6] max-w-[760px] mx-auto">
              Tus rizos cuentan una historia única. Aprender a cuidarlos, entender sus necesidades y
              darles lo que merecen es también una manera de abrazar quién eres.
            </p>

            {/* Clean Typographic Sticker-Style Brand Pills */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
              {[
                {
                  label: "Hidratación Real",
                  bg: "bg-[#FF85B3] text-white border-white/40 -rotate-2",
                },
                {
                  label: "Cero Reglas",
                  bg: "bg-[#FFD166] text-[#4b0078] border-white/50 rotate-1",
                },
                {
                  label: "Definición sin Frizz",
                  bg: "bg-[#2EC4B6] text-white border-white/40 -rotate-1",
                },
                {
                  label: "100% Amor Propio",
                  bg: "bg-white text-[#8504cf] border-[#FFD166] rotate-2",
                },
              ].map((pill) => (
                <motion.span
                  key={pill.label}
                  whileHover={{ y: -4, scale: 1.04, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-extrabold text-sm sm:text-base tracking-wide border-2 shadow-[0_10px_24px_rgba(0,0,0,0.18)] select-none ${pill.bg}`}
                >
                  {pill.label}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 5. TESTIMONIOS ==================== */}
        <section className="relative bg-white py-24 px-6 md:px-14">
          <div className="relative z-10 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Heading + Doodles */}
            <div className="lg:col-span-5 relative space-y-5 text-center lg:text-left">
              <SpiralDoodle
                color="#8504CF"
                className="w-10 h-10 absolute -top-12 left-8 hidden md:block"
              />
              <AsteriskDoodle
                color="#FDDF59"
                className="w-8 h-8 absolute top-6 right-4 hidden md:block"
              />
              <HeartDoodle
                color="#8504CF"
                className="w-7 h-7 absolute -bottom-12 left-16 hidden md:block"
              />

              <div className="space-y-3">
                <h2 className="text-4xl md:text-[44px] font-bold text-[#292524] leading-none">
                  Lo que dicen
                </h2>
                <div className="inline-block bg-[#8504cf] text-white px-7 py-3.5 rounded-[34px] text-2xl sm:text-3xl md:text-[38px] font-bold shadow-lg">
                  nuestras rizadas
                </div>
              </div>

              <p className="text-black font-medium text-base max-w-sm mx-auto lg:mx-0 leading-relaxed">
                Experiencias reales de quienes transformaron su rutina con productos Keishop.
              </p>

              <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() =>
                    setTestimonialIndex(
                      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
                    )
                  }
                  className="w-11 h-11 rounded-full bg-[#faf5ff] text-[#8504cf] hover:bg-[#8504cf] hover:text-white transition flex items-center justify-center"
                  aria-label="Testimonio anterior"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length)}
                  className="w-11 h-11 rounded-full bg-[#8504cf] text-white hover:bg-[#6a02a8] transition flex items-center justify-center"
                  aria-label="Siguiente testimonio"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Cards + Compact Video */}
            <div className="lg:col-span-7 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[0, 1].map((offset) => {
                  const t = TESTIMONIALS[(testimonialIndex + offset) % TESTIMONIALS.length];
                  const isPurple = t.variant === "purple";
                  return (
                    <motion.figure
                      key={`${t.id}-${offset}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`rounded-[28px] p-7 min-h-[380px] flex flex-col justify-between shadow-lg ${
                        isPurple ? "bg-[#8504cf] text-white" : "bg-[#faa1ce] text-white"
                      }`}
                    >
                      <Quote className="w-8 h-8 opacity-85" />
                      <blockquote className="text-lg font-medium leading-relaxed my-6">
                        "{t.quote}"
                      </blockquote>
                      <figcaption className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-white/25 flex items-center justify-center font-bold text-base">
                          {t.initial}
                        </div>
                        <span className="font-bold text-sm">{t.author}</span>
                      </figcaption>
                    </motion.figure>
                  );
                })}
              </div>

              {/* Compact Testimonial Video below the two reviews */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-[460px] mx-auto pt-2"
              >
                <BurstDoodle
                  color="#FDDF59"
                  className="w-8 h-8 absolute -top-4 -left-4 -rotate-12 pointer-events-none z-10"
                />
                <HeartDoodle
                  color="#FAA1CE"
                  className="w-6 h-6 absolute -top-1 -right-3 rotate-12 pointer-events-none z-10"
                />
                <AsteriskDoodle
                  color="#1EC9A0"
                  className="w-5 h-5 absolute -bottom-2.5 -left-2.5 pointer-events-none z-10"
                />
                <SpiralDoodle
                  color="#8504CF"
                  className="w-8 h-8 absolute -bottom-4 -right-4 pointer-events-none z-10"
                />

                <div className="rounded-[26px] overflow-hidden border-[3px] border-[#faa1ce] bg-[#1e1e1e] shadow-[0_14px_30px_rgba(133,4,207,0.16)]">
                  <video
                    src="/assets/video-keishop.mp4"
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full aspect-video object-cover block"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== 6. PREGUNTAS FRECUENTES (FAQ) ==================== */}
        <section
          id="faq"
          className="relative bg-[#faa1ce] pt-20 pb-20 px-6 md:px-14 overflow-hidden"
        >
          {/* Wave Pattern from Figma */}
          <img
            src="/assets/wave-faq.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="pointer-events-none select-none opacity-20 absolute bottom-0 left-0 w-full h-[360px] md:h-[460px] object-cover object-top z-[1]"
          />

          <div className="relative z-10 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column + Keila Thinking Illustration */}
            <div className="lg:col-span-5 flex flex-col items-center text-center space-y-5">
              <div className="space-y-3">
                <h2 className="text-5xl md:text-[62px] font-bold text-white leading-none">
                  Preguntas
                </h2>
                <div className="inline-block bg-[#8504cf] text-white px-7 py-3 rounded-[34px] text-4xl md:text-[54px] font-bold leading-none shadow-lg">
                  Frecuentes
                </div>
              </div>

              <p className="text-white/95 text-base max-w-sm leading-relaxed">
                Encuentra respuestas a las dudas más comunes sobre nuestros productos, método curly
                y envíos.
              </p>

              <button
                onClick={() => handleOpenProductsPage("all")}
                className="bg-[#8504cf] hover:bg-[#6a02a8] text-white rounded-full pl-6 pr-2 py-2 inline-flex items-center gap-3 font-bold shadow-[0_8px_14px_rgba(240,62,131,0.3)] transition"
              >
                <span>Ver Productos</span>
                <span className="w-9 h-9 rounded-full bg-white text-[#8504cf] flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>

              <KeilaSticker
                variant="faq"
                src="/assets/keila-pensando-rosado.webp"
                alt="Chica rizada pensando con dudas sobre el Método Curly"
                wrapperClassName="max-w-[420px] pt-2 lg:-ml-10"
              />
            </div>

            {/* Right Accordion */}
            <div className="lg:col-span-7 space-y-4">
              {visibleFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className="border-b border-white/50 pb-5 pt-2 transition"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full flex items-center justify-between gap-4 text-left text-white font-bold text-xl md:text-2xl hover:text-[#8504cf] transition"
                    >
                      <span>{faq.q}</span>
                      <span className="text-3xl font-semibold shrink-0">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-white/95 text-base md:text-lg pt-3 leading-relaxed"
                      >
                        {faq.a}
                      </motion.p>
                    )}
                  </div>
                );
              })}

              <div className="pt-4">
                <button
                  onClick={() => setShowAllFaqs(!showAllFaqs)}
                  className="bg-white hover:bg-[#fddf59] text-[#8504cf] px-8 py-3 rounded-full font-bold text-sm shadow-md transition"
                >
                  {showAllFaqs ? "Ver menos" : "Ver más"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 7. LLEVAMOS AMOR A CADA MELENA ==================== */}
        <section className="relative bg-white pt-20 pb-20 overflow-hidden">
          {/* Colorful Spiral Decorations from Figma */}
          <div aria-hidden="true" className="pointer-events-none select-none">
            <img
              src="/assets/spiral-pink-lg.svg"
              alt=""
              className="hidden md:block absolute -left-8 top-4 w-[180px] h-[180px]"
            />
            <img
              src="/assets/spiral-pink-sm.svg"
              alt=""
              className="hidden sm:block absolute left-[12%] top-6 w-12 h-12"
            />
            <img
              src="/assets/spiral-yellow-sm.svg"
              alt=""
              className="hidden sm:block absolute left-[19%] top-12 w-12 h-12"
            />
            <img
              src="/assets/spiral-purple-sm.svg"
              alt=""
              className="hidden md:block absolute left-[14%] bottom-4 w-12 h-12"
            />
            <img
              src="/assets/spiral-teal-sm.svg"
              alt=""
              className="hidden md:block absolute left-[47%] bottom-6 w-12 h-12 rotate-180"
            />
            <img
              src="/assets/spiral-yellow-bottom.svg"
              alt=""
              className="hidden md:block absolute right-[15%] bottom-4 w-12 h-12"
            />
            <img
              src="/assets/spiral-teal-lg.svg"
              alt=""
              className="hidden md:block absolute -right-10 bottom-4 w-[180px] h-[180px]"
            />
          </div>

          <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <h2 className="text-4xl md:text-[52px] font-bold text-black leading-tight">
                Llevamos Amor A Cada
              </h2>
              <div className="relative inline-block border-2 border-[#8504cf] px-6 py-2">
                {/* Figma selection corner handles */}
                <span className="w-3.5 h-3.5 rounded-full bg-[#8504cf] absolute -top-2 -left-2" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#8504cf] absolute -top-2 -right-2" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#8504cf] absolute -bottom-2 -left-2" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#8504cf] absolute -bottom-2 -right-2" />
                <span className="text-4xl md:text-[52px] font-bold text-[#8504cf] leading-none">
                  Melena
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <p className="text-black text-base leading-relaxed">
                Cada producto está elegido con criterio, dedicación y mucho cariño. Queremos llenar
                tus días de rizos definidos, confianza y momentos inolvidables.
              </p>
              <button
                onClick={() => handleOpenProductsPage("all")}
                className="bg-[#8504cf] hover:bg-[#6a02a8] text-white rounded-full pl-6 pr-2 py-2 inline-flex items-center gap-3 font-bold shadow-[0_8px_14px_rgba(240,62,131,0.3)] transition"
              >
                <span>Ver Productos</span>
                <span className="w-9 h-9 rounded-full bg-white text-[#8504cf] flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>
      )}

      {/* ==================== 8. FOOTER ==================== */}
      <footer className="relative z-20">
        <div className="bg-[#8505cf] text-white py-8 px-6 md:px-14">
          <div className="max-w-[1210px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <button
              onClick={() => handleNavigateHome("#inicio")}
              className="shrink-0"
            >
              <img
                src="/assets/logokeila.webp"
                alt="Keishop Always Curly"
                loading="lazy"
                decoding="async"
                className="h-10 md:h-11 w-auto object-contain"
              />
            </button>

            <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-9 text-base font-bold">
              <button
                onClick={() => handleNavigateHome("#inicio")}
                className="hover:text-[#fddf59] transition"
              >
                Inicio
              </button>
              <button
                onClick={() => handleOpenProductsPage("all")}
                className="hover:text-[#fddf59] transition"
              >
                Productos
              </button>
              <button
                onClick={() => handleOpenProductsPage("accesorios")}
                className="hover:text-[#fddf59] transition"
              >
                Accesorios
              </button>
              <button onClick={() => setAdvisorOpen(true)} className="hover:text-[#fddf59] transition">
                Asesoría
              </button>
              <button
                onClick={() => handleNavigateHome("#conocenos")}
                className="hover:text-[#fddf59] transition"
              >
                Conócenos
              </button>
              <button
                onClick={() => handleNavigateHome("#faq")}
                className="hover:text-[#fddf59] transition"
              >
                FAQ
              </button>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/k_e_i_s_h_o_p?dlrf=b28zZnFyeXVkaHhu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white hover:text-[#8505cf] flex items-center justify-center transition"
                aria-label="Instagram de Keishop"
                title="Instagram de Keishop"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/share/1E1N62KnPw/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white hover:text-[#8505cf] flex items-center justify-center transition"
                aria-label="Facebook de Keishop"
                title="Facebook de Keishop"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/573202347818"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white hover:text-[#8505cf] flex items-center justify-center transition"
                aria-label="WhatsApp de Keishop (+57 320 234 7818)"
                title="WhatsApp +57 320 234 7818"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-[#1e1e1e] text-white/85 text-xs md:text-sm py-4 px-4 text-center flex flex-wrap items-center justify-center gap-2">
          <span>© 2026 Keishop Always Curly</span>
          <span>|</span>
          <a href="#faq" className="underline decoration-dotted hover:text-white">
            Términos y Condiciones
          </a>
          <span>|</span>
          <a href="#faq" className="underline decoration-dotted hover:text-white">
            Política de Privacidad
          </a>
          <span>|</span>
          <a href="#faq" className="underline decoration-dotted hover:text-white">
            Envíos y Cambios
          </a>
        </div>
      </footer>

      {/* Interactive Drawers & Modals */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={updateCartQty}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      <AdvisorModal
        isOpen={advisorOpen}
        onClose={() => setAdvisorOpen(false)}
        onRecommend={handleSelectCategory}
      />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#252525] text-white px-6 py-3 rounded-full shadow-2xl font-bold text-sm border border-purple-400/40">
          {toast}
        </div>
      )}
    </div>
  );
}
