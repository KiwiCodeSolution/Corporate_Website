# CodeViz Research Context

> **Note**: This file contains research context from CodeViz. Most recent contexts are at the bottom.

---

## Research Query

all

*Session: 8a3ba4f841ba49c775c18272619f6ff3 | Generated: 04.07.2025, 17:24:00*

### Analysis Summary

# Codebase Analysis Report: Corporate Website

This report provides a comprehensive overview of the "Corporate Website" codebase, built using Next.js. It details the high-level architecture, mid-level component interactions, and key low-level implementation specifics, adhering to a hierarchical structure.

## High-Level Architecture

The **Corporate Website** is a Next.js application designed for a multi-language corporate presence. It leverages Next.js's file-system based routing, server components, and client components for efficient rendering and data fetching. The application is structured to separate concerns, with distinct directories for pages, UI components, static assets, data, and utilities. Internationalization is a core feature, handled through Next.js's `[locale]` routing and dedicated i18n configurations.

*   **Purpose**: To serve as the official online presence for a corporate entity, showcasing services, portfolio, news, and company information in multiple languages.
*   **Internal Parts**:
    *   **Application Core**: Handled by [Next.js](next.config.ts) configuration and the main [application directory](src/app/).
    *   **User Interface**: Composed of reusable [React components](src/components/).
    *   **Static Assets**: Managed in the [public directory](public/).
    *   **Data Management**: Static data stored in [JSON files](src/data/).
    *   **Styling**: Global and component-specific [CSS files](src/styles/).
    *   **Internationalization**: Configuration and utilities in [i18n](src/i18n/).
    *   **Utilities & Hooks**: Common functions and custom React hooks in [utils](src/utils/) and [hooks](src/hooks/).
*   **External Relationships**:
    *   Serves content to web browsers.
    *   Potentially interacts with external APIs (though not explicitly defined in the provided structure, an [API configuration](src/configs/API.ts) exists).
    *   Uses various npm packages defined in [package.json](package.json).

## Mid-Level Components and Interactions

### Application Routing and Pages (`src/app`)

The [src/app](src/app/) directory is the heart of Next.js routing. It utilizes the `[locale]` dynamic segment for internationalization, allowing different language versions of pages.

*   **Purpose**: Defines the application's routes and page layouts.
*   **Internal Parts**:
    *   **Root Layout**: [layout.tsx](src/app/[locale]/layout.tsx) defines the main structure, including HTML, body, and global providers.
    *   **Page Content**: [page.tsx](src/app/[locale]/page.tsx) serves as the entry point for the home page.
    *   **Error Handling**: [error.tsx](src/app/[locale]/error.tsx) for client-side errors.
    *   **Loading States**: [loading.tsx](src/app/[locale]/loading.tsx) for displaying loading indicators.
    *   **Not Found Page**: [not-found.tsx](src/app/[locale]/not-found.tsx) for 404 errors.
    *   **Fonts**: [fonts.ts](src/app/[locale]/fonts.ts) for font definitions.
    *   **Specific Routes**: Directories like [about](src/app/[locale]/about/), [news](src/app/[locale]/news/), and [portfolio](src/app/[locale]/portfolio/) contain their respective page components.
    *   **API Routes**: [src/app/api](src/app/api/) for backend API endpoints.
*   **External Relationships**:
    *   Receives requests from the browser based on URL paths.
    *   Renders UI components from [src/components](src/components/).
    *   Uses internationalization utilities from [src/i18n](src/i18n/).

### Reusable UI Components (`src/components`)

The [src/components](src/components/) directory houses a wide array of reusable React components, categorized for better organization.

*   **Purpose**: Provides modular and reusable UI elements for building pages.
*   **Internal Parts**:
    *   **Layout & Navigation**:
        *   [Header.tsx](src/components/Header.tsx): Application header, likely containing navigation.
        *   [Footer.tsx](src/components/Footer.tsx): Application footer.
        *   [Nav.tsx](src/components/Nav.tsx): Main navigation component.
        *   [BurgerMenu.tsx](src/components/BurgerMenu.tsx): Mobile navigation toggle.
        *   [LocaleToggle.tsx](src/components/LocaleToggle.tsx): Language switcher.
        *   [ThemeToggle.tsx](src/components/ThemeToggle.tsx): Dark/light mode switcher.
    *   **Content Sections**:
        *   [sections/](src/components/sections/): Contains larger, page-section components.
        *   [OurPrinciplesSectionComponent.tsx](src/components/OurPrinciplesSectionComponent.tsx): Displays company principles.
        *   [InnovativeServicesPage.tsx](src/components/InnovativeServicesPage.tsx): Section for innovative services.
        *   [HowWeWorkCarrouselComponent.tsx](src/components/HowWeWorkCarrouselComponent.tsx): Carousel for "how we work" section.
    *   **Cards & Items**:
        *   [NewsCard.tsx](src/components/NewsCard.tsx): Displays individual news articles.
        *   [PortfolioCard.tsx](src/components/PortfolioCard.tsx): Displays individual portfolio items.
        *   [AboutCard.tsx](src/components/AboutCard.tsx): Card for "about us" section.
        *   [OurServicesCard.tsx](src/components/OurServicesCard.tsx): Card for services offered.
        *   [TestimonialsCard.tsx](src/components/TestimonialsCard.tsx): Displays customer testimonials.
    *   **Forms & Modals**:
        *   [forms/](src/components/forms/): Contains form-related components.
        *   [PortfolioModal.tsx](src/components/PortfolioModal.tsx): Modal for displaying portfolio case details.
        *   [FAQModalFooter.tsx](src/components/FAQModalFooter.tsx): Footer for FAQ modal.
        *   [ContactFormSubmitErrorNotification.tsx](src/components/ContactFormSubmitErrorNotification.tsx): Notification for contact form submission errors.
        *   [ContactFormSubmitSuccessNotification.tsx](src/components/ContactFormSubmitSuccessNotification.tsx): Notification for contact form submission success.
    *   **UI Elements**:
        *   [ui/](src/components/ui/): Generic UI elements.
        *   [Title.tsx](src/components/Title.tsx): Reusable title component.
        *   [LearnMoreLink.tsx](src/components/LearnMoreLink.tsx): "Learn More" link component.
        *   [Loader.tsx](src/components/Loader.tsx): Loading spinner.
*   **External Relationships**:
    *   Receive `props` from parent components (pages or other components).
    *   Utilize custom hooks from [src/hooks](src/hooks/).
    *   Apply styles from [src/styles](src/styles/).
    *   Fetch data from [src/data](src/data/) or potentially API routes.

### Static Assets (`public`)

The [public](public/) directory serves static assets directly.

*   **Purpose**: Stores images, documents, and internationalization JSON files that are served directly by Next.js.
*   **Internal Parts**:
    *   [images/](public/images/): Contains various images used throughout the website, categorized by section (e.g., [news](public/images/news/), [portfolio](public/images/portfolio/), [principles](public/images/principles/), [services](public/images/services/)).
    *   [files/](public/files/): Contains downloadable files, e.g., [integration.pdf](public/files/integration.pdf).
    *   [locales/](public/locales/): Contains JSON files for internationalization, e.g., [en.json](public/locales/en.json), [ua.json](public/locales/ua.json).
*   **External Relationships**:
    *   Accessed directly by the browser via URLs (e.g., `/images/bg_hero.png`).
    *   [locales/](public/locales/) files are loaded by the i18n system.

### Data Management (`src/data`)

The [src/data](src/data/) directory holds static JSON data used across the application.

*   **Purpose**: Provides structured data for various sections of the website.
*   **Internal Parts**:
    *   [cases.json](src/data/cases.json): Likely contains data for portfolio cases.
    *   [company-stats.json](src/data/company-stats.json): Contains company statistics.
    *   [news.json](src/data/news.json): Contains data for news articles.
*   **External Relationships**:
    *   Data is imported and used by React components (e.g., [NewsCard.tsx](src/components/NewsCard.tsx) using [news.json](src/data/news.json)).

### Internationalization (`src/i18n`)

The [src/i18n](src/i18n/) directory configures and manages the application's internationalization.

*   **Purpose**: Enables the website to display content in multiple languages.
*   **Internal Parts**:
    *   [navigation.ts](src/i18n/navigation.ts): Defines navigation routes for different locales.
    *   [request.ts](src/i18n/request.ts): Likely handles locale-specific requests.
    *   [routing.ts](src/i18n/routing.ts): Manages routing logic related to locales.
*   **External Relationships**:
    *   Works in conjunction with the `[locale]` segment in [src/app](src/app/).
    *   Loads translation files from [public/locales](public/locales/).
    *   Integrated with [middleware.ts](src/middleware.ts) for locale detection.

### Custom Hooks (`src/hooks`)

The [src/hooks](src/hooks/) directory contains reusable custom React hooks.

*   **Purpose**: Encapsulates reusable stateful logic for components.
*   **Internal Parts**:
    *   [useEscapeClose.ts](src/hooks/useEscapeClose.ts): Hook for closing elements on Escape key press.
    *   [usePopStateClose.ts](src/hooks/usePopStateClose.ts): Hook for closing elements on browser history pop state.
    *   [useScrollBlock.ts](src/hooks/useScrollBlock.ts): Hook to block body scrolling.
    *   [useScrollBlockV2.ts](src/hooks/useScrollBlockV2.ts): An updated version of the scroll block hook.
    *   [useWindowWidth.ts](src/hooks/useWindowWidth.ts): Hook to get the current window width.
*   **External Relationships**:
    *   Used by various [React components](src/components/) to manage UI behavior.

### Utilities (`src/utils`)

The [src/utils](src/utils/) directory provides general utility functions.

*   **Purpose**: Contains helper functions and schemas used across the application.
*   **Internal Parts**:
    *   [api.ts](src/utils/api.ts): Utility functions for API interactions.
    *   [constants.ts](src/utils/constants.ts): Defines application-wide constants.
    *   [helpers.ts](src/utils/helpers.ts): General helper functions.
    *   [local-storage-API.ts](src/utils/local-storage-API.ts): Utilities for interacting with local storage.
    *   [schemas/](src/utils/schemas/): Contains validation schemas (e.g., for forms).
*   **External Relationships**:
    *   Functions are imported and used by components, pages, and other utilities.

### Configuration (`src/configs`)

The [src/configs](src/configs/) directory stores application-specific configurations.

*   **Purpose**: Centralizes configuration settings.
*   **Internal Parts**:
    *   [animationConfig.ts](src/configs/animationConfig.ts): Configuration for animations.
    *   [API.ts](src/configs/API.ts): API endpoint configurations.
*   **External Relationships**:
    *   Configuration values are imported and used by components and utility functions.

### Styling (`src/styles`)

The [src/styles](src/styles/) directory contains the application's CSS files.

*   **Purpose**: Defines the visual appearance of the website.
*   **Internal Parts**:
    *   [globals.css](src/styles/globals.css): Global CSS styles.
    *   [bgGradients.css](src/styles/bgGradients.css): Background gradient styles.
    *   [how-we-work.css](src/styles/how-we-work.css): Styles specific to the "how we work" section.
    *   [loader.css](src/styles/loader.css): Styles for the loader component.
    *   [news.css](src/styles/news.css): Styles for news-related components.
    *   [portfolio.css](src/styles/portfolio.css): Styles for portfolio-related components.
    *   [principles.css](src/styles/principles.css): Styles for the principles section.
    *   [services-page.css](src/styles/services-page.css): Styles for the services page.
*   **External Relationships**:
    *   CSS files are imported into [layout.tsx](src/app/[locale]/layout.tsx) or specific components.

## Low-Level Implementation Specifics

### Next.js Configuration

The [next.config.ts](next.config.ts) file is the primary configuration for the Next.js application, handling aspects like image optimization, internationalization domains, and build settings.

### Middleware

The [middleware.ts](src/middleware.ts) file is used for running code before a request is completed, specifically for handling internationalization routing and locale detection.

### Package Management

The [package.json](package.json) file lists all project dependencies (e.g., `react`, `next`, `typescript`, `framer-motion`, `i18next`) and defines scripts for development, building, and linting. [package-lock.json](package-lock.json) ensures consistent dependency installations.

### Linting and Formatting

The project uses [ESLint](eslint.config.mjs) for code linting and [Prettier](.prettierrc.json) for code formatting, ensuring code quality and consistency.

### TypeScript Configuration

The [tsconfig.json](tsconfig.json) file configures the TypeScript compiler settings for the project.

