# Umbrella Inmobiliaria SAS

Landing page one-page para servicios integrales de Propiedades Horizontales en Colombia.

## Estructura

```
index.html
assets/
  css/styles.css
  js/main.js
  img/
    hero-placeholder.svg
    logo-placeholder.svg
    favicon.png
README.md
```

## Configuración rápida

1. Abre `assets/js/main.js` y reemplaza:
   - `WHATSAPP_NUMBER`
   - `COMPANY_EMAIL`
   - `EMAILJS_PUBLIC_KEY`
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`
2. El formulario enviará la solicitud por EmailJS. Si no está configurado, abrirá WhatsApp con el mensaje armado.

## EmailJS

Variables esperadas en la plantilla:
- `name`
- `phone`
- `email`
- `property`
- `city`
- `service`
- `message`

## Personalización

- Imágenes: reemplaza los SVG en `assets/img/` por fotografías reales si lo deseas.
- Colores: cambia `--red` en `assets/css/styles.css` para ajustar el tono corporativo.

## Nota

Esta landing está construida con HTML, CSS y JavaScript puro, sin frameworks.
