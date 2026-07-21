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
- MySQL 9.4 con Flyway (9 migraciones: V1-V9)
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
- **Contacto + Donaciones:** Formulario de contacto integrado con CTA de donación (sección unificada)
- **Dark Mode:** Toggle sol/luna en el navbar, persiste en localStorage
- **Footer:** Redes sociales y ubicación

### Sistema de Donaciones (`/donar`)
- **Transferencia bancaria:** Muestra CVU, alias, banco, titular y CUIT
- **MercadoPago:** Redirección al checkout de MercadoPago (sandbox)
- **PayPal:** Redirección al checkout de PayPal (sandbox)

### Login y Registro
- Registro con nombre y apellido separados
- Login con JWT (access + refresh tokens)
- Roles: ADMIN, EDITOR, VIEWER
- Redirect según rol: ADMIN → `/admin`, otros → `/`

### Panel de Administración (`/admin`)
- **Dashboard:** KPIs, gráfico de ingresos por mes
- **Donaciones:** Tabla con historial, filtros y paginación
- **Datos:** ABM (alta, baja, modificación) de registros de control
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
| Gmail | Tresesquinasfundacion@gmail.com |

## Seguridad
- JWT stateless (sin sesiones HTTP)
- CORS configurado para Vercel + localhost
- Rate limiting en endpoints de auth
- Headers de seguridad (HSTS, CSP, X-Frame-Options, XSS Protection)
- Password hasheado con BCrypt
- Endpoints públicos: `/api/health`, `/api/auth/login`, `/api/auth/register`, `/api/auth/refresh`, `POST /api/donaciones/**`

## Migraciones de Base de Datos

| Versión | Descripción |
|---------|-------------|
| V1 | Schema base (usuarios, donaciones, refresh_tokens) |
| V2 | Tabla de refresh tokens |
| V3 | Constraints e índices |
| V4 | Índices y foreign keys |
| V5 | Seed data (vacío) |
| V6 | Campo version en donaciones |
| V7 | Fix enum case de roles |
| V8 | Agregar campo apellido a usuarios |
| V9 | Promover admin@3esquinas.org.ar a rol ADMIN |

## Variables de Entorno (Railway - Backend)

| Variable | Descripción |
|----------|-------------|
| `SPRING_DATASOURCE_URL` | URL JDBC de MySQL |
| `SPRING_DATASOURCE_USERNAME` | Usuario MySQL |
| `SPRING_DATASOURCE_PASSWORD` | Contraseña MySQL |
| `JWT_SECRET` | Secreto para firmar JWT |
| `CORS_ORIGINS` | Orígenes permitidos (Vercel + localhost) |
| `PORT` | Puerto del server (asignado por Railway) |

## Pendiente para Producción Real

- [ ] Integrar MercadoPago con credenciales reales (sacar de sandbox)
- [ ] Integrar PayPal con credenciales reales (sacar de sandbox)
- [ ] Configurar datos bancarios reales (CVU, alias, banco, CUIT)
- [ ] Configurar dominio propio (ej: `api.3esquinas.org.ar`)
- [ ] Cambiar contraseña del admin después del primer login
- [ ] Agregar más usuarios con roles EDITOR/VIEWER según necesidad

## Notas de Deploy

- Railway free tier: 512MB RAM, container se reinicia periódicamente
- Backend JVM optimizado: `Xmx192m`, `MaxMetaspaceSize=96m`, G1GC
- Tomcat optimizado: 10 threads máx, 20 max-connections
- Docker multi-stage build (compilación + runtime separados)
- `railway.toml` configurado con healthcheck path `/api/health`
- Vercel: proxy `/api/*` → Railway backend via rewrites

## Changelog

### 2026-07-17
- **feat:** Sección de donaciones integrada dentro de la sección de contacto (landing page unificada)
- **feat:** Botón "Donar" del navbar ahora hace scroll a la sección de contacto
- **docs:** Agregada propuesta de sección formativa (cursos y seminarios) con 3 planes de precios al summary
