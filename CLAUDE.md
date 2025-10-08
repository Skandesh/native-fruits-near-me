# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Native Fruits** is a comprehensive platform for discovering native fruits growing naturally in different regions and seasons. The application helps users explore what fruits are in season in their area, learn about their nutritional benefits, and find recipes using traditional fruits. The current implementation is a multi-page React application with SEO optimization for regional fruit guides.

## Technology Stack

- **Frontend**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.1 with multi-page application support
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS 3.4.11 with custom design system
- **Fonts**: Inter (sans-serif) and Playfair Display (serif)
- **Analytics**: PostHog integration
- **Content**: Markdown-based CMS with automated processing

## Development Commands

```bash
# Start development server (includes preprocessing)
npm run dev

# Production build (includes preprocessing)
npm run build

# Development build (includes preprocessing)
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm run preview

# Generate markdown data from content files
npm run generate-markdown

# Generate HTML entry points for SEO pages
npm run generate-html-entries
```

## Build Process Architecture

This project uses a **multi-step build pipeline** that must be followed in order:

1. **Content Creation**: Markdown files in `src/content/seo/` (city walking tour guides)
2. **Markdown Processing**: `npm run generate-markdown` converts markdown to TypeScript data (`src/utils/markdownData.ts`)
3. **HTML Entry Generation**: `npm run generate-html-entries` creates SEO-optimized HTML files in project root
4. **Vite Build**: Builds the React application with proper static page generation

The `dev` and `build` scripts automatically run all steps in sequence.

## SEO Page Generation System

The application generates 7 SEO-optimized regional fruit guides:
- North America (`/north-america-seasonal-fruits`)
- Mediterranean Europe (`/mediterranean-europe-fruits`)
- Southeast Asia (`/southeast-asia-tropical-fruits`)
- South America (`/south-america-exotic-fruits`)
- Africa (`/africa-native-fruits`)
- Australia & Oceania (`/australia-oceania-fruits`)
- India (`/india-native-fruits`)

Each page includes:
- Page-specific meta tags and Open Graph data
- Structured data (JSON-LD) for search engines
- Canonical URLs and social media optimization
- Static HTML generation for proper SEO

### Adding New SEO Pages

1. Create new `.md` file in `src/content/seo/`
2. Run `npm run generate-markdown` to process markdown
3. Update `vite.config.ts` rollupOptions.input to include new HTML entry
4. Update `vite.config.ts` sitemap dynamicRoutes
5. Run `npm run generate-html-entries` to create HTML entry point
6. Build and test the new page

## Project Structure

```
src/
├── components/
│   ├── ui/             # shadcn/ui components (do not modify directly)
│   ├── Hero.tsx        # Landing page hero section
│   ├── Features.tsx    # Feature showcase
│   ├── SeasonalCalendar.tsx # Interactive seasonal fruit calendar
│   ├── FruitFinder.tsx # Fruit search and filter system
│   ├── FruitRecipes.tsx # Recipe database component
│   ├── MarkdownSEOPage.tsx # Dynamic SEO page renderer
│   └── SEOLayout.tsx   # SEO page layout wrapper
├── pages/              # Route components
│   ├── Index.tsx       # Main landing page
│   └── NotFound.tsx    # 404 page
├── content/seo/        # Markdown content for SEO pages
├── lib/                # Utility libraries
├── utils/              # Utility functions
├── hooks/              # Custom React hooks
└── assets/             # Static assets

scripts/                # Build automation
├── generateMarkdownData.cjs   # Markdown to TypeScript conversion
└── generateHTMLEntries.cjs    # HTML entry point generation
```

## Import Aliases

Configure in `vite.config.ts` and `components.json`:
- `@/components` → `src/components`
- `@/lib` → `src/lib`
- `@/hooks` → `src/hooks`
- `@/components/ui` → `src/components/ui`

## Coding Standards

### Component Patterns
- Use functional components with TypeScript interfaces
- Follow the existing component structure with proper typing
- Use `cn()` utility from `@/lib/utils` for conditional Tailwind classes
- Maintain mobile-first responsive design

### Styling Guidelines
- Use Tailwind CSS classes with the custom design system
- Typography: `font-serif` (Playfair Display) for headings, default font (Inter) for body
- Colors: Use CSS custom properties defined in tailwind.config.ts
- Consistent spacing following Tailwind's scale

### Custom Hooks
- `useIsMobile()`: Mobile breakpoint detection (< 768px) with SSR handling
- `useToast()`: Toast notification system

## Vite Multi-Page Configuration

The app uses Vite's multi-page application support:
- Each SEO page has its own HTML entry point generated during build
- Static HTML files are served directly for proper SEO
- React Router handles client-side navigation
- Build outputs to `dist/` with proper asset optimization

## Content Management

SEO content is managed through markdown files in `src/content/seo/`:
- Frontmatter defines metadata (title, description, keywords)
- Content is processed and converted to TypeScript data
- HTML templates automatically include proper meta tags
- Supports adding new cities by creating new markdown files

## Development Workflow

1. Edit markdown files or React components
2. Run `npm run dev` (automatically processes content and starts dev server)
3. Test at `http://localhost:8080`
4. For production testing: `npm run build && npm run preview`
5. Verify SEO pages render with proper meta tags

## Production Deployment

- Build outputs to `dist/` directory
- Static HTML files served directly for SEO pages
- Production hostname: `https://rediscover.city`
- Automatic sitemap generation for all walking tour guides
- Optimized assets with proper caching headers