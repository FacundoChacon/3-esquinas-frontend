# Informe de estado — Frontend 3 Esquinas

> Documento de handoff para el equipo de backend.
> Fecha: 2026-09-24 · Repo: `github.com/FacundoChacon/3-esquinas-frontend` · Rama: `master`

## 1. Resumen del proyecto

El frontend de **3 Esquinas** (asociación civil de Maipú, Mendoza) es una aplicación SPA compuesta por:

- **Landing pública** de difusión de la organización (institucional, ODS, noticias/contenido, contacto, colaboración y donación).
- **Panel de administración** para gestionar donaciones, contactos, voluntarios y datos (roles ADMIN/EDITOR).

El frontend está **terminado y funcional** en su alcance actual. Consume la API REST del backend a través de `src/services/*`. **No quedan funcionalidades a medias**; lo pendiente es el deploy (dominio real) y que el backend cumpla el contrato detallado abajo.

## 2. Stack

- React 19 + Vite 8 + React Router 7 (SPA, client-side routing)
- Tailwind CSS v4 (plugin de Vite, sin archivo de config; tokens vía `@theme` en `index.css`)
- Lint: oxlint · Check: `npm run build` (vite) y `npm run lint`

## 3. Estructura clave

```
index.html                    → metas SEO estáticas (canonical, OG, JSON-LD)
public/
  robots.txt                  → bloquea /admin
  sitemap.xml                 → 4 rutas públicas (dominio placeholder)
  images/ videos/
src/
  main.jsx App.jsx            → rutas (BrowserRouter) + providers (Auth, DarkMode)
  config/site.js              → SITE_URL (VITE_SITE_URL o placeholder), SITE_NAME
  services/
    apiClient.js              → fetch con Bearer token, retry 1x en 401, base /api
    authService.js            → /auth/* (login, register, refresh, logout)
    apiService.js             → dashboard, contactos, voluntarios, datos
    donacionService.js        → /donaciones/* (listar, confirmar, fallida, pasarelas)
  context/AuthContext.jsx     → sesión: access en memoria + refresh en sessionStorage
  context/DarkModeContext.jsx → dark mode (clase .dark en <html>)
  components/
    Seo.jsx                   → title/description/canonical/noindex por ruta
    ProtectedRoute.jsx        → guard de rutas privadas por rol
    AdminLayout.jsx           → layout del panel
    landing/*                 → secciones de la landing (Hero, About, Ods, Contenido, Contact, Colaborar, Donate, Navbar, Footer)
  pages/*                     → Landing, Conocenos, Donate, Colaborar, Login, Register + 5 admin
  styles/*.css                → estilos modulares por sección
```

## 4. Rutas de la aplicación

| Ruta | Acceso | Página | Notas |
|---|---|---|---|
| `/` | Público | Landing | hero, institucional, ODS, Contenido, contacto, colaborar, donar |
| `/conocenos` | Público | Conocenos | historia + equipo (placeholders "Próximamente") |
| `/donar` | Público | Donate | formulario de donación (3 pasarelas) |
| `/colaborar` | Público | Colaborar | formulario de voluntariado |
| `/login` `/register` | Público | Auth | `noindex` |
| `/admin` | ADMIN | Dashboard | KPIs + ingresos + donaciones compactas |
| `/admin/donaciones` | ADMIN | Donaciones | historial + confirmar/fallida |
| `/admin/contactos` | ADMIN | Contactos | bandeja (leer/eliminar) |
| `/admin/voluntarios` | ADMIN | Voluntarios | bandeja (eliminar) |
| `/admin/datos` | ADMIN o EDITOR | Datos | CRUD de registros |
| `*` | Público | 404 | `noindex` |

## 5. Contrato de API que consume el frontend

Base: `/api` (proxy). En dev: `vite.config.js` redirige `/api` → `http://localhost:8081`. En prod: Vercel reescribe `/api/*` → `https://3-esquinas-backend-production.up.railway.app/api/*`.

### 5.1 Autenticación (`authService`)

| Endpoint | Método | Payload / Respuesta |
|---|---|---|
| `/api/auth/login` | POST | `{email, password}` → `{accessToken, refreshToken, usuarioId, email, nombre, apellido, rol}` |
| `/api/auth/register` | POST | `{email, password, nombre, apellido}` → mismo shape que login |
| `/api/auth/refresh` | POST | `{refreshToken}` → mismo shape que login |
| `/api/auth/logout` | POST | sin payload (revoca refresh token) |

Reglas exigidas al backend:
- **Roles**: `ADMIN` y `EDITOR`. El rol viene en `user.rol` (null = sin backstage, se oculta el acceso en el nav público).
- Los tokens deben ser **JWT**: `accessToken` de corta duración (Bearer) y `refreshToken` de larga duración.
- Al refrescar se reemplaza acces y refresh (rotación); el frontend guarda el refresh en `sessionStorage` (`3eq-refresh`).

### 5.2 Manejo de errores (importante)

`apiClient.js` espera que los errores devuelvan JSON con `{message}` o `{error}`. Todo `response.ok === false` lanza `Error(message)`. El backend debe devolver mensajes legibles para el usuario.

### 5.3 Retry automático en 401

Si un request autenticado responde **401**, el frontend hace **un** reintento llamando a `/api/auth/refresh` y reejecuta la petición original. **No reintenta** en endpoints que contengan `/auth/` (evita recursión). El backend debe: soportar refresh, y no penalizar el doble request.

### 5.4 Dashboard (`dashboardService`)

| Endpoint | Método | Notas |
|---|---|---|
| `/api/dashboard/kpis` | GET | KPIs del panel |
| `/api/dashboard/ingresos` | GET | serie de ingresos (gráfico, usa meses "YYYY-MM") |
| `/api/dashboard/donantes?page&size` | GET | paginado |
| `/api/dashboard/cupones?page&size` | GET | paginado |

### 5.5 Donaciones (`donacionService`)

| Endpoint | Método | Payload / Notas |
|---|---|---|
| `/api/donaciones?page&size` | GET | paginado |
| `/api/donaciones/{id}/confirmar` | PATCH | marcar confirmada |
| `/api/donaciones/{id}/fallida` | PATCH | marcar fallida |
| `/api/donaciones/transferencia` | POST | `{monto, pasarela, concepto, donanteNombre, donanteEmail, donanteTelefono, donanteTipoDocumento, donanteNumeroDocumento}` (datos del donante opcionales) → `{monto, estado, cbu, alias, banco, titular, cuit, concepto}` |
| `/api/donaciones/mercadopago` | POST | mismo payload → `{init_point | sandbox_init_point}` (el frontend redirige) |
| `/api/donaciones/paypal` | POST | mismo payload → `{approval_url}` (el frontend redirige) |

### 5.6 Contactos (`contactService`)

| Endpoint | Método | Payload / Notas |
|---|---|---|
| `/api/contactos` | POST | `{nombre, email, mensaje}` (form de la landing) |
| `/api/contactos?page&size` | GET | paginado |
| `/api/contactos/no-leidos` | GET | → `{count}` |
| `/api/contactos/{id}/leido` | PATCH | marcar leído |
| `/api/contactos/{id}` | DELETE | soft delete |

Filas esperadas: `id, nombre, email, asunto, mensaje, leido, creadoEn`.

### 5.7 Voluntarios (`voluntarioService`)

| Endpoint | Método | Payload / Notas |
|---|---|---|
| `/api/voluntarios` | POST | `{nombre, apellido, dni, telefono, email, fechaNacimiento, direccion, empresa, comoSeEntero}` |
| `/api/voluntarios?page&size` | GET | paginado |
| `/api/voluntarios/total` | GET | contador total |
| `/api/voluntarios/{id}` | DELETE | soft delete |

Filas esperadas: `id, nombre, apellido, dni, telefono, email, comoSeEntero, empresa, creadoEn`. Valores de `comoSeEntero`: `redes_sociales, boca_a_boca, evento, medios, internet, otro`.

### 5.8 Datos (`datosService`)

| Endpoint | Método | Notas |
|---|---|---|
| `/api/datos?page&size` | GET | paginado |
| `/api/datos/categoria/{categoria}` | GET | filtro por categoría |
| `/api/datos/{id}` | GET | detalle |
| `/api/datos` | POST | crear (rol ADMIN/EDITOR) |
| `/api/datos/{id}` | PUT | actualizar |
| `/api/datos/{id}` | DELETE | eliminar |

**Formato de paginación que el frontend tolera**: tanto un array plano como Spring-style `{content, totalPages, totalElements}` (en las bandejas se leen ambos). El endpoint de KPIs similares deben devolver `{count}`-style json para contadores (ver `no-leidos`).

### 5.9 Cabeceras de requests

- `Content-Type: application/json`
- `Authorization: Bearer <accessToken>` cuando hay sesión
- `credentials: 'include'`

## 6. Flujo de autenticación del frontend

1. `login`/`register` → guarda `{accessToken, refreshToken, user}` ; el **refresh token va a `sessionStorage`** (`3eq-refresh`).
2. En cada load, `ProtectedRoute` llama `checkSession()`: si existe refresh guardado, intenta `POST /auth/refresh` para restaurar la sesión sin pedir credenciales.
3. `401` en cualquier request → refresh → retry.
4. `logout` → `POST /auth/logout` y se limpia el estado local (siempre limpia aunque el backend falle).

## 7. Trabajo reciente (todo commiteado y pusheado en `master`)

- **UX/UI (8 hallazgos)**: hero sin autodesvanecimiento, menú hamburguesa mobile, contraste WCAG en textos chicos, carrusel ODS navegable por teclado, CTAs de donación en hero, login oculto del nav público, placeholders en Conocenos, alts descriptivos en videos e imágenes.
- **Sección "Contenido"**: lista vertical de noticias/videos/redes con vista previa del 2º ítem degradada + barra expandible de borde a borde ("Ver más/Ver menos").
- **SEO**: metas estáticas (description, canonical, Open Graph, Twitter Cards, JSON-LD), títulos/descripciones únicos por ruta (`Seo.jsx`), `noindex` en auth/admin/404, `robots.txt` y `sitemap.xml`.
- **Paleta de marca**: unificada en emerald/amber y fuente `--font-sans` vía `@theme`.

## 8. Pendientes / acuerdos con backend

1. **Contrato de API**: confirmar que los endpoints de la sección 5 existen y cumplen respuestas/formato (paginación, errores, pasarelas: Mercado Pago `init_point`, PayPal `approval_url`).
2. **Usuarios seed**: el frontend espera usuarios `ADMIN` creados por backend (el register crea usuarios; definir qué rol se asigna).
3. **CORS**: en prod el frontend (Vercel) llama al backend por reescritura de ruta `/api` (mismo origen virtual), así que no aplica CORS cruzado; en dev se usa proxy Vite hacia `localhost:8081`.
4. **Deploy**: el dominio del sitio todavía no existe. Quedó un placeholder (`https://3esquinas.invalid`) en `index.html`, `sitemap.xml` y `src/config/site.js` con comentarios `TODO DEPLOY` señalados. Se reemplaza al publicar (o vía `VITE_SITE_URL`).
5. **Webhooks/PayPal–MP**: si el flujo de pasarelas requiere confirmación asíncrona, coordinar con el frontend los estados que recibe el panel (`confirmar` / `fallida`).

## 9. Cómo levantar

```bash
npm install
npm run dev      # http://localhost:5173 — proxya /api → http://localhost:8081
npm run build    # genera dist/
npm run lint     # oxlint
```