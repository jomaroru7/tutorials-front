# WordPress Front

Este proyecto es un frontend React + Vite para consumir una API REST de WordPress en modo headless.

## ¿Qué hace?

La aplicación se conecta con el backend de WordPress para:

- mostrar un listado de posts
- navegar al detalle de cada post mediante su slug
- cargar contenido dinámicamente desde la API de WordPress
- mantener el estado de los posts con Redux Toolkit

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- React Router DOM
- Redux Toolkit
- Tailwind CSS

## Estructura principal

- `src/api` → funciones para consumir la API de WordPress
- `src/components` → componentes reutilizables como tarjetas, layout y detalle de posts
- `src/features` → slices y lógica de estado con Redux
- `src/pages` → vistas principales de la app
- `src/routes` → configuración de rutas

## Configuración

1. Copia el archivo `.env.example` a `.env`
2. Ajusta la variable `VITE_WP_API_BASE_URL` con la URL de tu instalación de WordPress

Ejemplo:

```env
VITE_WP_API_BASE_URL=http://localhost:8000
```

## Scripts disponibles

```bash
npm install
npm run dev
npm run build
```

## Notas

Este proyecto está pensado para funcionar como frontend de un WordPress headless, separando la capa de presentación del CMS.
