# CareerNest - Career Development Platform

## Overview

CareerNest is a comprehensive career development platform designed for individuals in South Africa. The application provides personalized career assessments, skills development resources, mentorship connections, job matching services, and community support to help users discover their potential and transform their career journeys. Built as a full-stack web application, it features an intuitive React frontend with modern UI components and an Express.js backend with PostgreSQL database integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side application is built using React with TypeScript, leveraging modern development practices and a component-based architecture. The application uses Vite as the build tool for fast development and optimized production builds. The UI is constructed using shadcn/ui components built on top of Radix UI primitives, providing accessible and customizable interface elements.

The styling system employs Tailwind CSS with a custom design system that defines color palettes, gradients, and spacing optimized for the CareerNest brand. CSS custom properties are used for theming, allowing for consistent styling across components. The application implements client-side routing using React Router for seamless navigation between different platform sections.

State management is handled through React's built-in state hooks and React Query for server state management, providing efficient data fetching, caching, and synchronization. The frontend is structured with clear separation of concerns: pages for route components, components for reusable UI elements, and hooks for shared logic.

### Backend Architecture
The server-side application follows a REST API architecture using Express.js as the web framework. The server is configured with middleware for JSON parsing, URL encoding, request logging, and error handling. The application uses a modular structure with separate files for routing, database configuration, and storage interfaces.

The storage layer implements an interface pattern with both in-memory and database implementations, allowing for flexible data persistence strategies. The current implementation includes a MemStorage class for development and testing, with the infrastructure in place for PostgreSQL database integration using Drizzle ORM.

API routes are organized with a consistent `/api` prefix, and the application includes comprehensive request/response logging for debugging and monitoring. The server handles both API requests and serves the built frontend application in production.

### Database Design
The application uses PostgreSQL as the primary database, configured through Drizzle ORM for type-safe database operations. The schema is defined using Drizzle's schema definition syntax, providing strong typing and validation for database entities.

The current schema includes a users table with fields for authentication and user management. The database configuration supports both development and production environments through environment variables, with connection pooling provided by the Neon serverless driver for optimal performance.

Database migrations are managed through Drizzle Kit, allowing for version-controlled schema changes and safe database updates across environments.

### Authentication & Authorization
While not fully implemented in the current codebase, the application structure indicates plans for user authentication and authorization. The user schema includes username and password fields, suggesting a traditional authentication approach. The storage interface provides methods for user creation and retrieval, establishing the foundation for session management and user state.

### Development & Deployment
The application is configured for development with hot module replacement through Vite's development server. The build process creates optimized bundles for both client and server code, with the client assets served as static files in production.

The development environment includes TypeScript configuration for strict type checking across the entire application, import path aliases for clean module resolution, and PostCSS configuration for Tailwind CSS processing.

## External Dependencies

### UI Framework & Styling
- **Radix UI**: Comprehensive set of accessible UI primitives including dialogs, dropdowns, forms, and navigation components
- **Tailwind CSS**: Utility-first CSS framework for responsive design and consistent styling
- **shadcn/ui**: Pre-built component library providing modern UI components with Tailwind styling
- **Lucide React**: Icon library providing consistent iconography throughout the application

### Database & ORM
- **Neon Database**: Serverless PostgreSQL database platform for scalable data storage
- **Drizzle ORM**: Type-safe ORM for PostgreSQL with schema management and query building
- **Drizzle Kit**: CLI tool for database migrations and schema management

### Development Tools
- **Vite**: Fast build tool and development server with hot module replacement
- **TypeScript**: Static type checking for improved developer experience and code reliability
- **React Query**: Server state management for efficient data fetching and caching
- **React Router**: Client-side routing for single-page application navigation

### Form Management & Validation
- **React Hook Form**: Performant forms library with minimal re-renders
- **Zod**: Schema validation library for runtime type checking and form validation
- **Hookform Resolvers**: Integration between React Hook Form and validation libraries

### Utility Libraries
- **date-fns**: Date manipulation and formatting utilities
- **clsx**: Utility for constructing className strings conditionally
- **class-variance-authority**: Utility for creating type-safe CSS class variants

### Development & Replit Integration
- **Replit Vite Plugins**: Custom plugins for Replit environment integration including error overlays and development tools
- **ESBuild**: Fast JavaScript bundler for server-side code compilation