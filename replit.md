# Portuguese Restaurant Management System

## Overview

This is a full-stack web application for managing two Portuguese restaurants - "Restaurante Porto" and "Restaurante Lisboa". The system provides a public-facing website with restaurant information, menus, photo galleries, and reservation capabilities, along with administrative features for content management.

The application showcases authentic Portuguese cuisine with a focus on traditional flavors from Northern Portugal (Porto) and contemporary Lisbon-inspired cuisine (Lisboa). Users can browse restaurant details, view menus organized by categories, make reservations, and explore photo galleries.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom Portuguese restaurant theme colors (wine, beige, olive)
- **Typography**: Custom font stack with Playfair Display (serif), Inter (sans-serif), and Geist Mono
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Framework**: Express.js server with TypeScript
- **API Design**: RESTful API structure with organized route handlers
- **File Uploads**: Multer middleware for image upload handling
- **Storage Abstraction**: Interface-based storage system with in-memory implementation (MemStorage)
- **Request Logging**: Custom middleware for API request logging and timing
- **Error Handling**: Centralized error handling middleware

### Data Storage Solutions
- **Database Schema**: Drizzle ORM with PostgreSQL dialect
- **Tables**: Four main entities - restaurants, menu items, reservations, and gallery photos
- **Current Implementation**: In-memory storage with mock data for development
- **Migration Support**: Drizzle Kit for database schema migrations
- **Connection**: Configured for PostgreSQL via DATABASE_URL environment variable

### Database Schema Design
- **restaurants**: Core restaurant information (name, slug, description, contact details)
- **menu_items**: Menu items categorized by type (starters, mains, desserts, drinks)
- **reservations**: Customer reservation requests with status tracking
- **gallery_photos**: Restaurant photo galleries with metadata

### Authentication and Authorization
- **Current State**: No authentication system implemented
- **Session Management**: Basic session configuration present but not actively used
- **File Access**: Public access to uploaded images via Express static middleware

### API Structure
- **Restaurant Management**: CRUD operations for restaurant data
- **Menu Management**: Category-based menu item management with image upload
- **Reservations**: Creation and status management of customer reservations
- **Gallery Management**: Photo upload and management for restaurant galleries
- **File Uploads**: Dedicated endpoints for image processing with validation

### Development Environment
- **Hot Reload**: Vite development server with HMR support
- **TypeScript**: Full TypeScript setup with path aliases and strict mode
- **Code Quality**: ESBuild for production bundling
- **Development Tools**: Replit-specific plugins and error overlay for development

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL database (@neondatabase/serverless)
- **Drizzle ORM**: Type-safe database operations with PostgreSQL dialect
- **Connection Pooling**: Built-in connection management via Neon serverless driver

### UI and Design Libraries
- **Radix UI**: Comprehensive set of accessible React components
- **Tailwind CSS**: Utility-first CSS framework with custom Portuguese restaurant theme
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Component variant management

### File Upload and Processing
- **Multer**: Node.js middleware for handling multipart/form-data and file uploads
- **File Storage**: Local file system storage with configurable upload directory

### Form and Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: TypeScript-first schema validation library
- **Hookform Resolvers**: Integration between React Hook Form and Zod

### Development and Build Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS post-processing with Tailwind CSS and Autoprefixer

### Google Services Integration
- **Google Maps**: Embedded maps for restaurant location display
- **Maps API**: Configured for showing restaurant locations (requires VITE_GOOGLE_MAPS_API_KEY)

### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation for various entities
- **clsx**: Utility for constructing className strings conditionally