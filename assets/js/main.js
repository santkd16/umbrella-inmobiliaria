// Umbrella Inmobiliaria SAS - JS principal
// 1) CONFIGURA AQUÍ tus datos (WhatsApp y correo)
// WhatsApp en formato internacional sin + ni espacios. Ej: 573001234567
const WHATSAPP_NUMBER = "573102892568"; // <-- CAMBIA ESTO
const COMPANY_EMAIL = "tucorreo@dominio.com"; // <-- CAMBIA ESTO (solo texto informativo)

// 2) EmailJS (para que el formulario te envíe un correo SIN backend)
// Pasos rápidos:
// - Crea cuenta en https://www.emailjs.com/
// - Crea un Email Service (Gmail / Outlook / etc.)
// - Crea un Email Template (con variables: name, phone, email, service, message)
// - Copia tus IDs aquí:
const EMAILJS_PUBLIC_KEY = "REEMPLAZA_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "REEMPLAZA_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "REEMPLAZA_TEMPLATE_ID";

// =============== WhatsApp Helpers ===============
function buildWhatsAppLink(message) {
  const msg = encodeURIComponent(message || "Hola, quiero una asesoría con Umbrella Inmobiliaria SAS.");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

function setWhatsLinks() {
  const defaultMsg = "Hola, quiero una asesoría con Umbrella Inmobiliaria SAS.";
  const wa = buildWhatsAppLink(defaultMsg);

  const btnWhats = document.getElementById("btnWhats");
  const btnWhatsHero = document.getElementById("btnWhatsHero");
  const whatsFloat = document.getElementById("whatsFloat");

  if (btnWhats) btnWhats.href = wa;
  if (btnWhatsHero) btnWhatsHero.href = wa;
  if (whatsFloat) whatsFloat.href = wa;

  const waNumberText = document.getElementById("waNumberText");
  if (waNumberText) {
    // mostrar en formato +57 XXX... si es Colombia (simple)
    const pretty = WHATSAPP_NUMBER.startsWith("57")
      ? `+${WHATSAPP_NUMBER.slice(0,2)} ${WHATSAPP_NUMBER.slice(2,5)} ${WHATSAPP_NUMBER.slice(5,8)} ${WHATSAPP_NUMBER.slice(8)}`
      : `+${WHATSAPP_NUMBER}`;
    waNumberText.textContent = pretty;
  }

  const emailText = document.getElementById("emailText");
  if (emailText) emailText.textContent = COMPANY_EMAIL;
}

function initQuickButtons() {
  document.querySelectorAll(".quick__item").forEach(btn => {
    btn.addEventListener("click", () => {
      const msg = btn.getAttribute("data-msg") || "";
      window.open(buildWhatsAppLink(msg), "_blank", "noopener");
    });
  });
}

// =============== Mobile Menu ===============
function initMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  if (!menuBtn || !nav) return;

  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("isOpen");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  // close on click
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("isOpen");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// =============== Form (EmailJS) ===============
async function loadEmailJS() {
  // Cargamos EmailJS CDN solo cuando se necesita
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("No se pudo cargar EmailJS"));
    document.head.appendChild(s);
  });
}

function initForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const sendBtn = document.getElementById("sendBtn");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (status) status.textContent = "";
    if (sendBtn) sendBtn.disabled = true;

    const data = Object.fromEntries(new FormData(form).entries());

    // Validación extra mínima
    if (!data.name || !data.phone || !data.email || !data.service || !data.message) {
      if (status) status.textContent = "Por favor completa todos los campos.";
      if (sendBtn) sendBtn.disabled = false;
      return;
    }

    try {
      // Si no configuraron EmailJS, damos alternativa rápida por WhatsApp
      const notConfigured = [EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID]
        .some(v => !v || v.startsWith("REEMPLAZA"));

      if (notConfigured) {
        const msg = `Hola, soy ${data.name}. Mi teléfono es ${data.phone}. Mi correo: ${data.email}.\nServicio: ${data.service}.\nMensaje: ${data.message}`;
        window.open(buildWhatsAppLink(msg), "_blank", "noopener");
        if (status) status.textContent = "Abrimos WhatsApp para enviar tu solicitud. (Configura EmailJS para recibir correos automáticos.)";
        form.reset();
        return;
      }

      await loadEmailJS();
      // eslint-disable-next-line no-undef
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

      // eslint-disable-next-line no-undef
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, data);

      if (status) status.textContent = "¡Mensaje enviado! Te contactaremos pronto.";
      form.reset();
    } catch (err) {
      console.error(err);
      if (status) status.textContent = "No se pudo enviar el mensaje. Intenta por WhatsApp.";
    } finally {
      if (sendBtn) sendBtn.disabled = false;
    }
  });
}

// Year
function setYear(){
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
}

// Init
setYear();
setWhatsLinks();
initQuickButtons();
initMenu();
initForm();
