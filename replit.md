# AUTO GAMMA - Premium Auto Detailing Website

## Overview

AUTO GAMMA is a full-stack multi-page automotive website for a premium auto detailing and garage business. The application showcases a dark, metallic automotive theme with bold animations, featuring services like auto detailing, PPF (Paint Protection Film), ceramic coating, and warranty registration. Built with React, Express, and PostgreSQL, the site emphasizes visual impact with parallax effects, smooth transitions, and a premium user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- **React 18** with TypeScript for component-based UI development
- **Vite** as the build tool and development server, configured for optimal hot-module replacement
- **Wouter** for lightweight client-side routing instead of React Router

**Styling Approach**
- **Tailwind CSS v4** (using @tailwindcss/vite) for utility-first styling
- **shadcn/ui** component library (New York style variant) with Radix UI primitives
- Custom CSS variables for theming (dark mode by default with premium red/black aesthetic)
- Custom fonts: Orbitron (headings), Montserrat, and Rajdhani (body text)

**Animation & Visual Effects**
- **Framer Motion** for page transitions, scroll animations, and interactive elements
- Custom animations including parallax scrolling, tire rotation effects, and smoke particles
- GSAP-style smooth transitions for premium feel

**State Management**
- **TanStack Query (React Query)** for server state management and data fetching
- Local component state with React hooks
- No global state management library (Redux/Zustand) currently implemented

**Form Handling**
- **React Hook Form** with **Zod** validation via @hookform/resolvers
- Form schemas defined using drizzle-zod for type safety

### Backend Architecture

**Server Framework**
- **Express.js** running on Node.js with TypeScript
- HTTP server with middleware for JSON parsing and URL encoding
- Custom logging middleware tracking request duration and response status
- Static file serving for production builds

**Development vs Production**
- Development: Vite middleware integration with HMR over WebSocket
- Production: Pre-built static assets served from `dist/public`
- Environment-based configuration (NODE_ENV)

**Routing Structure**
- API routes prefixed with `/api` (to be implemented in `server/routes.ts`)
- SPA fallback routing for client-side navigation
- Centralized route registration pattern

**Storage Layer**
- Abstract storage interface (`IStorage`) for database operations
- In-memory storage implementation (`MemStorage`) as development placeholder
- Designed for easy swap to PostgreSQL implementation via Drizzle ORM

### Data Storage Solutions

**Database**
- **PostgreSQL** configured as the production database
- Connection via `DATABASE_URL` environment variable
- Schema migrations managed in `./migrations` directory

**ORM & Schema**
- **Drizzle ORM** for type-safe database queries
- **drizzle-zod** for automatic Zod schema generation from database tables
- Schema definition in `shared/schema.ts` for shared type safety between client/server
- Current schema includes `users` table with UUID primary keys

**Session Management**
- **connect-pg-simple** available for PostgreSQL-backed session storage
- **express-session** for session middleware
- Provisions for memorystore as alternative session storage

### External Dependencies

**UI Component Libraries**
- **Radix UI** - Comprehensive set of accessible, unstyled component primitives (accordion, dialog, dropdown, select, tooltip, etc.)
- **Embla Carousel** - Touch-friendly carousel/slider component
- **cmdk** - Command palette/menu interface
- **class-variance-authority** - Utility for creating type-safe component variants
- **Lucide React** - Icon library

**Utility Libraries**
- **clsx** & **tailwind-merge** - Conditional className utilities
- **date-fns** - Date manipulation and formatting
- **nanoid** - Unique ID generation

**Development Tools**
- **Replit-specific plugins**: Runtime error overlay, cartographer (for Replit workspace integration), dev banner
- Custom Vite plugin for meta image URL updates based on deployment domain
- **esbuild** for server-side bundling in production builds

**Build & Deployment**
- Custom build script bundling allowlisted dependencies to reduce syscalls
- Server dependencies selectively bundled vs externalized for optimal cold start performance
- TypeScript compilation with path aliases (@/, @shared/, @assets/)

**Available but Unused**
The project includes several libraries that may be used for future features:
- Authentication: passport, passport-local, jsonwebtoken
- File uploads: multer
- Email: nodemailer  
- Payments: stripe
- AI: @google/generative-ai, openai
- WebSockets: ws
- Data export: xlsx
- Rate limiting: express-rate-limit