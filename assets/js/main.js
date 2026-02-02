/* ==========================
   CONFIGURACIÓN (EDITA AQUÍ)
   ========================== */

// WhatsApp en formato internacional SIN +, SIN espacios.
// Ejemplo Colombia: 573001234567
const WHATSAPP_NUMBER = "573102892568";

// Correo corporativo (solo para mostrar en la web)
const COMPANY_EMAIL = "director@umbrellainmobiliaria.com";

// Si quieres enviar el formulario por EmailJS (opcional), completa estos datos:
const EMAILJS_ENABLED = false;
const EMAILJS_PUBLIC_KEY = "_LprMTcZwZZondV0m";
const EMAILJS_SERVICE_ID = "service_uhg81za";
const EMAILJS_TEMPLATE_ID = "template_2i7mtnl";

/* ==========================
   UTILIDADES
   ========================== */
const $ = (sel, el = document) => el.querySelector(sel);

function escapeForWhatsApp(text) {
  // encodeURIComponent es suficiente para el mensaje
  return encodeURIComponent(text);
}

function buildWhatsAppMessage(payload) {
  const lines = [
    "Hola, quiero una propuesta para mi copropiedad.",
    "",
    `Nombre: ${payload.name || "-"}`,
    `Teléfono: ${payload.phone || "-"}`,
    `Correo: ${payload.email || "-"}`,
    `Servicio: ${payload.service || "-"}`,
    "",
    `Mensaje: ${payload.message || "-"}`,
  ];
  return lines.join("\n");
}

function openWhatsApp(payload) {
  const msg = buildWhatsAppMessage(payload);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${escapeForWhatsApp(msg)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/* ==========================
   MENÚ RESPONSIVE
   ========================== */
const navToggle = $("#navToggle");
const navMenu = $("#navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Cerrar al hacer click en un link
  navMenu.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.classList && target.classList.contains("nav__link")) {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Cerrar al hacer click fuera
  document.addEventListener("click", (e) => {
    if (!navMenu.classList.contains("is-open")) return;
    const inside = navMenu.contains(e.target) || navToggle.contains(e.target);
    if (!inside) {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ==========================
   DATOS EN UI
   ========================== */
const yearEl = $("#year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const whatsappDisplay = $("#whatsappDisplay");
if (whatsappDisplay) {
  // Mostrar con +
  whatsappDisplay.textContent = `+${WHATSAPP_NUMBER}`;
}

const emailDisplay = $("#emailDisplay");
if (emailDisplay) emailDisplay.textContent = COMPANY_EMAIL;

/* ==========================
   FORMULARIO
   ========================== */
const form = $("#contactForm");
const submitBtn = $("#submitBtn");
const formHint = $("#formHint");

function setLoading(isLoading) {
  if (!submitBtn) return;
  submitBtn.disabled = isLoading;
  submitBtn.textContent = isLoading ? "Enviando..." : "Enviar solicitud";
}

function getFormPayload(formEl) {
  const fd = new FormData(formEl);
  return {
    name: (fd.get("name") || "").toString().trim(),
    phone: (fd.get("phone") || "").toString().trim(),
    email: (fd.get("email") || "").toString().trim(),
    service: (fd.get("service") || "").toString().trim(),
    message: (fd.get("message") || "").toString().trim(),
  };
}

async function sendWithEmailJS(payload) {
  // Carga EmailJS desde CDN si está habilitado
  // (No lo cargamos si no se usa)
  if (!window.emailjs) {
    await new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  // Inicializar
  window.emailjs.init(EMAILJS_PUBLIC_KEY);

  // Enviar
  return window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name: payload.name,
    from_email: payload.email,
    phone: payload.phone,
    service: payload.service,
    message: payload.message,
  });
}

if (form) {
  if (formHint) {
    formHint.textContent = EMAILJS_ENABLED
      ? "El formulario se enviará por correo (EmailJS)."
      : "Al enviar, abriremos WhatsApp con tu mensaje (o se enviará por correo si activas EmailJS).";
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = getFormPayload(form);

    // Validación mínima
    if (!payload.name || !payload.email || !payload.message) {
      alert("Por favor completa nombre, correo y mensaje.");
      return;
    }

    try {
      setLoading(true);

      if (EMAILJS_ENABLED) {
        await sendWithEmailJS(payload);
        alert("¡Listo! Tu solicitud fue enviada por correo.");
        form.reset();
      } else {
        openWhatsApp(payload);
        form.reset();
      }
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al enviar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  });
}
