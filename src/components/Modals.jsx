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

const LEGAL_TABS = [
  { id: "privacidad", label: "Política de privacidad" },
  { id: "terminos", label: "Términos del Servicio" },
  { id: "devoluciones", label: "Política de devoluciones y reembolsos" },
];

export function LegalModal({ activeTab, onSelectTab, onClose }) {
  const isOpen = Boolean(activeTab);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/55 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.97 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[32px] max-w-3xl w-full max-h-[88vh] flex flex-col overflow-hidden shadow-2xl border border-purple-100"
          >
            {/* Header & Tabs */}
            <div className="bg-[#8504cf] text-white px-6 sm:px-8 pt-6 pb-4 shrink-0">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#fddf59]">
                    Información Legal Oficial • Keishop
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold leading-tight mt-0.5">
                    {LEGAL_TABS.find((t) => t.id === activeTab)?.label}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition shrink-0"
                  aria-label="Cerrar ventana legal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Interactive Tab Pills */}
              <div className="flex flex-wrap gap-2">
                {LEGAL_TABS.map((tab) => {
                  const isCurrent = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => onSelectTab(tab.id)}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition ${
                        isCurrent
                          ? "bg-[#fddf59] text-[#4b0078] shadow-md"
                          : "bg-white/15 text-white hover:bg-white/25"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Body Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#474747] text-sm sm:text-base leading-relaxed">
              {activeTab === "privacidad" && (
                <div className="space-y-6">
                  <div className="space-y-3 bg-[#faf5ff] p-5 rounded-2xl border border-purple-100">
                    <p>
                      En <strong>Keishop</strong>, nos tomamos muy en serio la seguridad y la
                      confidencialidad de tus datos. En cumplimiento de la Ley 1581 de 2012 y el
                      Decreto 1377 de 2013 de la República de Colombia, te informamos cómo
                      recopilamos, utilizamos y protegemos la información que nos proporcionas al
                      interactuar con nosotros.
                    </p>
                    <p>
                      Al navegar en nuestro sitio web, registrarte o realizar una compra, aceptas
                      las prácticas descritas en esta política.
                    </p>
                  </div>

                  <section className="space-y-2">
                    <h4 className="text-lg font-bold text-[#8504cf]">
                      1. Datos personales que recopilamos
                    </h4>
                    <p>
                      Recopilamos la información estrictamente necesaria para procesar tus pedidos,
                      garantizar la entrega de tus productos capilares y ofrecerte una atención
                      personalizada. Estos datos incluyen:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li>
                        <strong>Datos de contacto:</strong> Nombre completo, cédula de ciudadanía
                        (para facturación y envíos), dirección de facturación, dirección de envío,
                        número de teléfono/WhatsApp y correo electrónico.
                      </li>
                      <li>
                        <strong>Información de pago:</strong> Los pagos se procesan a través de
                        WhatsApp al momento de agregar los productos a tu carrito; automáticamente
                        te redirige a nuestro número de contacto para que hagas tu pago por Nequi,
                        Bre-B, etc.
                      </li>
                    </ul>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-lg font-bold text-[#8504cf]">
                      2. Cómo obtenemos tus datos
                    </h4>
                    <p>Tus datos personales los obtenemos de las siguientes maneras:</p>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li>
                        <strong>Directamente de ti:</strong> Cuando realizas una compra y nos
                        escribes por WhatsApp.
                      </li>
                      <li>
                        <strong>De forma automática:</strong> A través de cookies y tecnologías de
                        navegación esenciales que nos ayudan a recordar los artículos que dejas en
                        el carrito de compras y a mejorar tu experiencia en la página.
                      </li>
                    </ul>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-lg font-bold text-[#8504cf]">3. Uso de la información</h4>
                    <p>
                      Utilizamos tus datos personales únicamente para los siguientes fines
                      autorizados:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li>
                        <strong>Gestión de pedidos:</strong> Validar tus compras, procesar los
                        pagos, preparar tus pedidos y coordinar la entrega con las transportadoras.
                      </li>
                      <li>
                        <strong>Comunicación directa:</strong> Enviarte notificaciones sobre el
                        estado de tu pedido, el número de guía de la transportadora o responder a
                        tus preguntas y reclamaciones.
                      </li>
                      <li>
                        <strong>Novedades y promociones:</strong> Si lo autorizas previamente, te
                        enviaremos ofertas, lanzamientos y descuentos exclusivos por WhatsApp.
                      </li>
                      <li>
                        <strong>Cumplimiento legal:</strong> Atender requerimientos de autoridades
                        competentes como la Superintendencia de Industria y Comercio o aplicar los
                        mecanismos de reversión de pago según la ley colombiana.
                      </li>
                    </ul>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-lg font-bold text-[#8504cf]">
                      4. Con quién compartimos tus datos
                    </h4>
                    <p>
                      Keishop no vende, alquila ni comercializa tus datos personales con terceros.
                      Tus datos solo se comparten con los aliados necesarios para operar el
                      servicio:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li>
                        <strong>Empresas de transporte:</strong> Compartimos tu nombre, dirección y
                        teléfono con Servientrega, Interrapidísimo o Coordinadora para que puedan
                        entregar tu paquete.
                      </li>
                      <li>
                        <strong>Pasarelas de pago:</strong> Los datos de tu transacción se
                        transmiten de forma segura a las plataformas encargadas de autorizar el
                        cobro.
                      </li>
                    </ul>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-lg font-bold text-[#8504cf]">
                      5. Datos de menores de edad
                    </h4>
                    <p>
                      Nuestros productos y servicios están dirigidos a personas mayores de edad. No
                      recopilamos de forma consciente datos de menores. Si un menor de edad registra
                      sus datos sin la autorización de sus padres o tutores, estos podrán solicitar
                      la eliminación inmediata de la información escribiéndonos a nuestro número de
                      contacto.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-lg font-bold text-[#8504cf]">
                      6. Seguridad y retención de datos
                    </h4>
                    <p>
                      Conservaremos tus datos personales únicamente durante el tiempo necesario para
                      cumplir con el procesamiento de tus compras, ofrecerte soporte posventa y
                      cumplir con las obligaciones contables y legales de la República de Colombia.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-lg font-bold text-[#8504cf]">
                      7. Tus derechos como titular de los datos
                    </h4>
                    <p>
                      De acuerdo con la legislación colombiana, como dueño de tus datos personales
                      tienes derecho a:
                    </p>
                    <ol className="list-decimal pl-5 space-y-1.5">
                      <li>
                        Conocer, actualizar y rectificar tus datos en caso de que sean inexactos o
                        estén incompletos.
                      </li>
                      <li>
                        Solicitar prueba de la autorización que nos otorgaste para tratar tus datos.
                      </li>
                      <li>
                        Ser informado sobre el uso que les estamos dando a tus datos personales.
                      </li>
                      <li>
                        Revocar la autorización o solicitar la supresión de tus datos cuando
                        consideres que no se están respetando los principios legales o cuando
                        decidas dar de baja tu cuenta.
                      </li>
                    </ol>
                  </section>

                  <section className="space-y-2 bg-[#faf5ff] p-5 rounded-2xl border border-purple-100">
                    <h4 className="text-lg font-bold text-[#8504cf]">
                      8. Contacto para la protección de datos
                    </h4>
                    <p>
                      Si tienes preguntas, dudas o deseas que eliminemos tus datos de nuestro
                      sistema, comunícate directamente con nuestra línea de atención:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <strong>Responsable del tratamiento:</strong> Keishop
                      </li>
                      <li>
                        <strong>Dirección física:</strong> Cl. 15 #2-27, 854010 Maní CAS, Colombia
                      </li>
                      <li>
                        <strong>Número de contacto:</strong> +57 3202347818
                      </li>
                    </ul>
                  </section>
                </div>
              )}

              {activeTab === "terminos" && (
                <div className="space-y-5">
                  <section className="space-y-1.5">
                    <h4 className="text-lg font-bold text-[#8504cf]">1. Generalidades</h4>
                    <p>
                      Este sitio web es operado por <strong>Keishop</strong>. Al comprar nuestros
                      productos, aceptas los presentes Términos del Servicio. Estos términos aplican
                      a todos los usuarios del sitio.
                    </p>
                  </section>

                  <section className="space-y-1.5">
                    <h4 className="text-lg font-bold text-[#8504cf]">2. Nuestros productos</h4>
                    <p>Keishop comercializa: Productos capilares y accesorios.</p>
                  </section>

                  <section className="space-y-1.5">
                    <h4 className="text-lg font-bold text-[#8504cf]">3. Precios y pagos</h4>
                    <p>
                      Todos los precios están expresados en pesos colombianos (COP). Nos reservamos
                      el derecho de modificar precios en cualquier momento sin previo aviso; los
                      cambios no afectan pedidos ya confirmados. Los pagos se procesan a través de
                      pasarelas de pago seguras. En ningún momento almacenamos datos de tarjetas de
                      crédito o débito.
                    </p>
                  </section>

                  <section className="space-y-1.5">
                    <h4 className="text-lg font-bold text-[#8504cf]">4. Disponibilidad</h4>
                    <p>
                      Los productos dependen de la disponibilidad. Si por error de inventario un
                      producto pagado no está disponible, te lo notificaremos dentro de las 24 - 48
                      horas siguientes y podrás elegir entre un producto sustituto, un saldo a favor
                      o el reembolso total.
                    </p>
                  </section>

                  <section className="space-y-1.5">
                    <h4 className="text-lg font-bold text-[#8504cf]">5. Uso del producto</h4>
                    <p>
                      Nuestros productos son de uso externo y cosmético. Evita el contacto con ojos
                      y mucosas. Suspende su uso en caso de irritación. Mantén los productos fuera
                      del alcance de los niños y protegidos de la luz solar directa y altas
                      temperaturas.
                    </p>
                  </section>

                  <section className="space-y-1.5">
                    <h4 className="text-lg font-bold text-[#8504cf]">6. Reversión de pagos</h4>
                    <p>
                      En cumplimiento del artículo 51 de la Ley 1480 de 2011 y el Decreto 587 de
                      2016, tienes derecho a solicitar la reversión del pago ante tu entidad
                      financiera en los casos de fraude, suplantación, o cuando el producto no sea
                      recibido o no corresponda a lo solicitado, dentro de los 5 días hábiles
                      siguientes.
                    </p>
                  </section>

                  <section className="space-y-1.5">
                    <h4 className="text-lg font-bold text-[#8504cf]">7. Legislación aplicable</h4>
                    <p>
                      Estos términos se rigen por las leyes de la República de Colombia, en
                      particular la Ley 1480 de 2011 (Estatuto del Consumidor). Cualquier
                      controversia será resuelta ante la Superintendencia de Industria y Comercio o
                      la jurisdicción ordinaria colombiana.
                    </p>
                  </section>
                </div>
              )}

              {activeTab === "devoluciones" && (
                <div className="space-y-6">
                  <div className="bg-[#faf5ff] p-5 rounded-2xl border border-purple-100">
                    <p>
                      En <strong>Keishop</strong> queremos que ames lo que recibes. Por la
                      naturaleza de nuestros productos, aplican las siguientes condiciones:
                    </p>
                  </div>

                  <section className="space-y-2">
                    <h4 className="text-lg font-bold text-[#8504cf]">
                      Productos elegibles para devolución
                    </h4>
                    <p>Aceptamos devoluciones únicamente en los siguientes casos:</p>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li>Recibiste un producto diferente al que compraste.</li>
                      <li>
                        El producto llegó con defectos de fábrica o daños causados durante el
                        transporte.
                      </li>
                      <li>El pedido llegó incompleto.</li>
                    </ul>
                    <p className="pt-2">
                      En cualquiera de estos casos, escríbenos dentro de las 24 horas siguientes a
                      la entrega al número en WhatsApp <strong>+57 3202347818</strong>, adjuntando
                      fotos del producto y del empaque. Cubrimos el costo del envío de reposición y
                      te enviamos el producto correcto o realizamos el reembolso completo, según
                      prefieras.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-lg font-bold text-[#8504cf]">Reembolsos</h4>
                    <p>
                      Los reembolsos aprobados se procesan dentro de los 5 días hábiles siguientes
                      por el mismo medio de pago de la compra. Si pagaste por transferencia, te
                      pediremos los datos de tu cuenta bancaria. Los tiempos de acreditación
                      dependen de tu banco o pasarela de pago.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-lg font-bold text-[#8504cf]">Cancelaciones</h4>
                    <p>
                      Puedes cancelar tu pedido sin costo mientras no haya sido despachado. Una vez
                      el pedido está en manos de la transportadora, no es posible cancelarlo, pero
                      puedes rechazar la entrega y una vez el producto retorne a nosotros en
                      perfecto estado, reembolsaremos el valor del producto (el costo del envío no
                      es reembolsable en este caso).
                    </p>
                  </section>
                </div>
              )}
            </div>

            {/* Footer Action */}
            <div className="px-6 sm:px-8 py-4 border-t border-purple-100 bg-purple-50/40 flex justify-end shrink-0">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#8504cf] hover:bg-[#6a02a8] text-white font-bold text-sm transition"
              >
                Entendido
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
