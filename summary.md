# 3 Esquinas — Resumen de Despliegue

## URLs de Producción

| Servicio | URL |
|----------|-----|
| Frontend (Vercel) | https://3-esquinas-frontend.vercel.app |
| Backend (Railway) | https://3-esquinas-backend-production.up.railway.app |
| Login | https://3-esquinas-frontend.vercel.app/login |
| Registro | https://3-esquinas-frontend.vercel.app/register |
| Donaciones | https://3-esquinas-frontend.vercel.app/donar |

## Credenciales

| Campo | Valor |
|-------|-------|
| Email | admin@3esquinas.org.ar |
| Contraseña | Admin123 |
| Rol | ADMIN |

## Stack Tecnológico

### Frontend
- React 19 + Vite 8 + Tailwind CSS v4
- React Router v7 (SPA con rutas protegidas)
- Desplegado en **Vercel** (auto-deploy desde GitHub)
- Repo: https://github.com/FacundoChacon/3-esquinas-frontend (rama `master`)

### Backend
- Java 21 + Spring Boot 3.4.4 + Spring Security (JWT)
- MySQL 9.4 con Flyway (11 migraciones: V1-V11)
- Desplegado en **Railway** (auto-deploy desde GitHub)
- Repo: https://github.com/FacundoChacon/3-esquinas-backend (rama `main`)

### Base de Datos
- MySQL 9.4 en Railway (servicio `imaginative-charm`)
- Host interno: `mysql.railway.internal:3306`
- Base: `railway`
- Flyway gestiona esquema automáticamente

## Funcionalidades

### Página Pública (Landing)
- **Inicio:** Hero con presentación de la ONG
- **Institucional:** Sección "Quiénes somos"
- **ODS:** 17 tarjetas flip con animación 3D de los Objetivos de Desarrollo Sostenible
- **Contacto:** Formulario que envía mensajes reales al backend (`POST /api/contactos`)
- **Dark Mode:** Toggle sol/luna en el navbar, persiste en localStorage
- **Footer:** Redes sociales y ubicación (componente compartido con Conocenos)

### Sistema de Donaciones (`/donar`)
- **Transferencia bancaria:** Muestra CVU, alias, banco, titular y CUIT
- **MercadoPago:** Redirección al checkout de MercadoPago (sandbox)
- **PayPal:** Redirección al checkout de PayPal (sandbox)
- **Dark Mode:** Completo (navbar, formulario, cards, inputs, confirmación)

### Login y Registro
- Registro con nombre y apellido separados
- Login con JWT (access + refresh tokens)
- **Persistencia de sesión:** `sessionStorage` (sobrevive reload, no persiste entre pestañas)
- Roles: ADMIN, EDITOR, VIEWER
- Redirect según rol: ADMIN → `/admin`, otros → `/`

### Panel de Administración (`/admin`)
- **Dashboard:** KPIs, gráfico de ingresos por mes
- **Donaciones:** Tabla con historial, filtros y paginación
- **Datos:** ABM (alta, baja, modificación) de registros de control
- **Contactos:** Listado de mensajes, marcar leído, eliminar (soft delete)
- **Dark Mode:** Integrado en todo el panel
- **Sidebar:** Navegación responsive (colapsa en móvil)
- **Logout:** Redirige a la landing page

### Sección Formativa (Cursos y Seminarios) — Propuesta Futura
Sección adicional para ofrecer cursos y seminarios online. Presupuesto por apartado, 3 planes:

| Plan | Precio (ARS) | Cuotas | Funcionalidades |
|------|--------------|--------|-----------------|
| **Básico** | $450.000 | 2 sin interés ($225.000) | Catálogo de cursos, filtros, inscripción, panel admin (CRUD cursos, ver inscriptos) |
| **Intermedio** *(Recomendado)* | $850.000 | 4 sin interés ($212.500) | + Dashboard alumno, evaluaciones (quizzes), progreso por curso, gestión de cupos |
| **Completo** | $1.350.000 | 6 sin interés ($225.000) | + Certificados PDF, roles instructor, contenido multimedia (videos embebidos), materiales descargables, notificaciones |

**Nota:** Se reutiliza la infraestructura existente (auth, JWT, CORS, deploy, panel admin). Los 3 planes incluyen integración con el sistema actual.

## Redes Sociales

| Plataforma | Usuario / Cuenta |
|------------|------------------|
| X (Twitter) | [@3esqfundacion](https://x.com/3esqfundacion) |
| Instagram | [@Tresesquinasfundacion](https://instagram.com/Tresesquinasfundacion) |
| YouTube | [Fundación Tres Esquinas](https://youtube.com/@FundacionTresEsquinas) |
| Gmail | tresesquinasfundacion@gmail.com |

## Seguridad

### Backend
- JWT stateless (sin sesiones HTTP)
- **Refresh tokens hasheados con SHA-256** antes de guardar en DB (si la DB es comprometida, los tokens no son usables)
- CORS configurado para Vercel + localhost
- Rate limiting en auth, donaciones, webhooks y **formulario de contacto público**
- Headers de seguridad (HSTS, CSP, X-Frame-Options DENY, XSS Protection, Referrer-Policy)
- Password hasheado con BCrypt (12 rounds)
- **XSS sanitization** en formulario de contacto (strip HTML de todos los inputs)
- Webhook signature verification (HMAC-SHA256 para MP, API verification para PayPal)
- Refresh token rotation en login (tokens viejos revocados)
- Pessimistic locking en refresh token lookup (previene race conditions)
- Optimistic locking en donaciones (`@Version`)
- Error messages no filtran stack traces (`include-stacktrace: never`)
- Validación de JWT_SECRET mínimo 32 caracteres (256 bits)
- **Forwarded headers** configurados para proxy de Railway

### Frontend
- Persistencia de sesión en `sessionStorage` (no `localStorage`)
- Auth state limpiado al desmontar `ProtectedRoute` (evita setState en componente unmount)
- API client con merge correcto de headers (no sobreescribe Authorization)
- Mutex en refresh token para prevenir requests concurrentes
- PayPal/MercadoPago redirect guards (previene `window.location.href = "undefined"`)

## API Endpoints

### Públicos (sin auth)
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/health` | Healthcheck |
| POST | `/api/auth/login` | Iniciar sesión |
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/refresh` | Refrescar token |
| POST | `/api/donaciones/**` | Crear donación (transferencia/MP/PayPal) |
| POST | `/api/contactos` | Enviar mensaje de contacto |

### Protegidos (requieren JWT)
| Método | Ruta | Roles | Descripción |
|--------|------|-------|-------------|
| POST | `/api/auth/logout` | Cualquier auth | Cerrar sesión |
| GET | `/api/dashboard/**` | ADMIN, EDITOR, VIEWER | Datos del dashboard |
| GET | `/api/donaciones` | ADMIN, EDITOR | Listar donaciones |
| PATCH | `/api/donaciones/{id}/confirmar` | ADMIN | Confirmar donación |
| GET/POST/PUT/DELETE | `/api/datos/**` | ADMIN, EDITOR | ABM datos de control |
| GET | `/api/contactos` | ADMIN | Listar mensajes de contacto |
| GET | `/api/contactos/no-leidos` | ADMIN | Contar no leídos |
| PATCH | `/api/contactos/{id}/leido` | ADMIN | Marcar como leído |
| DELETE | `/api/contactos/{id}` | ADMIN | Eliminar mensaje (soft delete) |

## Migraciones de Base de Datos

| Versión | Descripción |
|---------|-------------|
| V1 | Schema base (usuarios, donantes, donaciones, auditoria_log, datos_control) |
| V2 | Tabla de refresh tokens con índices |
| V3 | Constraints e índices (unique email en donantes) |
| V4 | Índices y foreign keys |
| V5 | Seed data (vacío) |
| V6 | Campo version en donaciones (optimistic locking) |
| V7 | Fix enum case de roles (ENUM → VARCHAR) |
| V8 | Agregar campo apellido a usuarios |
| V9 | Promover admin@3esquinas.org.ar a rol ADMIN |
| V10 | Tabla contactos (formulario de contacto público) |
| V11 | Agregar columna actualizado_en a contactos |

## Variables de Entorno (Railway - Backend)

| Variable | Descripción |
|----------|-------------|
| `SPRING_DATASOURCE_URL` | URL JDBC de MySQL |
| `SPRING_DATASOURCE_USERNAME` | Usuario MySQL |
| `SPRING_DATASOURCE_PASSWORD` | Contraseña MySQL |
| `JWT_SECRET` | Secreto para firmar JWT (mínimo 32 caracteres) |
| `CORS_ORIGINS` | Orígenes permitidos (Vercel + localhost) |
| `PORT` | Puerto del server (asignado por Railway) |
| `MP_ACCESS_TOKEN` | Token de MercadoPago |
| `MP_WEBHOOK_SECRET` | Secreto HMAC-SHA256 para webhooks MP |
| `PAYPAL_CLIENT_ID` | Client ID de PayPal |
| `PAYPAL_CLIENT_SECRET` | Client Secret de PayPal |
| `TRANSFERENCIA_CVU` | CVU para transferencias bancarias |
| `TRANSFERENCIA_ALIAS` | Alias para transferencias |

## Pendiente para Producción Real

- [ ] Integrar MercadoPago con credenciales reales (sacar de sandbox)
- [ ] Integrar PayPal con credenciales reales (sacar de sandbox)
- [ ] Configurar datos bancarios reales (CVU, alias, banco, CUIT)
- [ ] Configurar dominio propio (ej: `api.3esquinas.org.ar`)
- [ ] Cambiar contraseña del admin después del primer login
- [ ] Agregar más usuarios con roles EDITOR/VIEWER según necesidad
- [ ] Migrar rate limiting a Redis para soporte multi-instancia

## Notas de Deploy

- Railway free tier: 512MB RAM, container se reinicia periódicamente
- Backend JVM: `Xms64m`, `Xmx192m`, `MaxMetaspaceSize=96m`, G1GC
- Tomcat: 10 threads máx, 20 max-connections, accept-count 10
- HikariCP: 5 conexiones máximo, 1 idle mínimo
- Docker multi-stage build (compilación + runtime separados)
- `railway.toml` configurado con healthcheck path `/api/health`, timeout 300s
- Vercel: proxy `/api/*` → Railway backend via rewrites
- **Cuidado al modificar migraciones de Flyway:** si una migración ya fue aplicada, cambiarla causa checksum mismatch. Usar migración nueva (V+n) para correcciones.

## Changelog

### 2026-07-26 — Auditoría de Frontend + Backend

#### Frontend — Code Review (6 rondas)

**Ronda 1 — Bugs críticos:**
- **fix:** PayPal/MercadoPago redirect guards en DonatePage (previene redirect a `undefined`)
- **fix:** DonatePage dark mode completo (navbar, formulario, cards, inputs, confirmación)
- **fix:** Cambiado `payPal` → `paypal` (casing consistente)
- **fix:** DatosTable paginación no pierde filtro de categoría al cambiar de página
- **fix:** ProtectedRoute cleanup con `AbortController` al desmontar
- **fix:** apiService merge correcto de headers de auth (no sobreescribe `Authorization`)
- **fix:** LandingPage memory leak en listener `timeupdate` del video (cleanup al desmontar)
- **feat:** LandingPage formulario de contacto ahora envía `POST /api/contactos` real

**Ronda 2 — Auth y seguridad:**
- **feat:** `sessionStorage` para persistir sesión (sobrevive reload, no entre pestañas)
- **feat:** Mutex con `useRef` para prevenir race conditions en refresh token
- **feat:** Context values memorizados con `useMemo` (AuthContext, DarkModeContext)
- **fix:** Eliminado `tokenUtils.js` (código muerto)

**Ronda 3 — Deduplicación de código:**
- **refactor:** Nuevo `apiClient.js` unificado (elimina 3 copias de `apiRequest`)
- **refactor:** Nuevo `formatters.js` compartido (`formatCurrency`, `formatDate`, `formatMonth`)
- **refactor:** Nuevo `validations.js` compartido (`validateField` con regex mejorado)
- **refactor:** Nuevo `Footer.jsx` compartido (Landing + Conocenos)
- **fix:** Eliminado `@import "tailwindcss"` duplicado de 5 archivos CSS

**Ronda 4 — Modularización LandingPage:**
- **refactor:** LandingPage descompuesta en 6 componentes: `HeroSection`, `AboutSection`, `OdsSection`, `ContactSection`, `LandingNavbar`, `Footer`
- **refactor:** Datos extraídos a `heroData.js` y `odsData.js`

**Ronda 5 — Optimización:**
- **refactor:** `CATEGORIAS` extraído como constante en DatosTable
- **fix:** IncomeChart ahora muestra errores reales (antes silenciaba con `.catch(() => {})`)
- **fix:** Eliminados `@types/react` y `@types/react-dom` innecesarios en package.json

**Bug fixes post-auditoría:**
- **fix:** ODS carousel arrows cortadas por `overflow-hidden` en el wrapper
- **fix:** Sticky navbar rota por `overflow-x: hidden` en `html` y `body`
- **fix:** Dark mode completo en DonatePage (128 líneas de estilos dark)

#### Backend — Feature + Auditoría de Seguridad

**Feature: Formulario de contacto (`/api/contactos`):**
- **feat:** `V10__create_contactos.sql` — tabla contactos con índices
- **feat:** `Contacto.java` — entity JPA con soft delete
- **feat:** `ContactoRepository.java` — consultas Spring Data
- **feat:** `ContactoRequest.java` / `ContactoResponse.java` — DTOs con validación Jakarta
- **feat:** `ContactoService.java` — lógica de negocio
- **feat:** `ContactoController.java` — 5 endpoints REST
- **feat:** `SecurityConfig.java` — POST público, resto requiere ADMIN
- **fix:** `V11__add_actualizado_en_to_contactos.sql` — columna faltante que causaba crash al startup

**Auditoría de seguridad (14 fixes):**
- **security:** Refresh tokens hasheados con SHA-256 antes de guardar en DB (`RefreshToken.hashToken()`)
- **security:** Rate limiting agregado a `POST /api/contactos` (10 req/min)
- **security:** XSS sanitization en formulario de contacto (strip HTML)
- **security:** X-Forwarded-For spoofing mitigado (ya no se confía del header raw)
- **performance:** PayPal access token cacheado en memoria con TTL (evita OAuth en cada request)
- **performance:** N+1 queries resueltos en `findByEstado`/`findByPasarela` (LEFT JOIN FETCH + countQuery explícito)
- **fix:** `RefreshTokenRepository.findByTokenHash` ahora tiene `@Query` explícito (causaba crash al startup sin él)
- **fix:** `ContactoResponse` ahora incluye `actualizadoEn`
- **fix:** Email duplicado ahora dice "Ya existe una cuenta con ese email"
- **fix:** `AuditoriaService.registrar()` ahora tiene `@Transactional`
- **fix:** `GlobalExceptionHandler` maneja `HttpMediaTypeNotSupportedException` (415)
- **fix:** `ContactoService.eliminar()` verifica si ya fue eliminado
- **fix:** `ContactoService.crear()` sanitiza inputs con `stripHtml()`
- **config:** JVM `Xmx192m`, Tomcat 10 threads, HikariCP 5 conexiones (optimizado para Railway 512MB)

### 2026-07-25
- **fix:** Normalizado gmail a minúsculas (`Tresesquinasfundacion@gmail.com` → `tresesquinasfundacion@gmail.com`) en LandingPage, ConocenosPage y summary.md

### 2026-07-17
- **feat:** Sección de donaciones integrada dentro de la sección de contacto (landing page unificada)
- **feat:** Botón "Donar" del navbar ahora hace scroll a la sección de contacto
- **docs:** Agregada propuesta de sección formativa (cursos y seminarios) con 3 planes de precios al summary
