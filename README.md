# Umbrella Inmobiliaria SAS (Sitio estático)

Este proyecto es una landing page (una sola página) hecha con **HTML, CSS y JavaScript**.

## Estructura
- `index.html`
- `assets/css/styles.css`
- `assets/js/main.js`
- `assets/img/` (logo y favicon)

## WhatsApp
Edita en `assets/js/main.js`:
- `WHATSAPP_NUMBER` (formato: 573001234567)

## Formulario que te envía correo (SIN backend)
Un sitio 100% estático no puede "mandar correos" por sí solo. Necesitas un servicio externo.
En este proyecto ya está listo para **EmailJS**:

1) Crea cuenta en EmailJS  
2) Crea un *Email Service* (Gmail/Outlook/etc.)  
3) Crea un *Email Template* y usa variables: `name`, `phone`, `email`, `service`, `message`  
4) Copia tus IDs en `assets/js/main.js`:
- `EMAILJS_PUBLIC_KEY`
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`

✅ Cuando esté configurado, cada envío del formulario te llega por correo.

### Alternativa (Formspree)
Si prefieres sin JS, puedes usar Formspree:
- Crea cuenta en Formspree
- Te dará un endpoint, algo como: `https://formspree.io/f/xxxxxx`
- Cambias el form para usar `action="TU_ENDPOINT"` y `method="POST"`

## Git (2 computadores)
- PC1: `git init` → commit → push a GitHub
- PC2: `git clone`
- Antes de trabajar: `git pull`
- Después: `git add .` → commit → push

---

Hecho para: Umbrella Inmobiliaria SAS
