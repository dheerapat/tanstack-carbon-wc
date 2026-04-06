# Project Nutrix — Frontend Handbook

> A living guide for structure, conventions, and styling in the Nutrix frontend.
> Stack: React 19 · TanStack Router · Carbon Design System · Vite · TypeScript

---

## Table of Contents

1. [Project Structure](#1-project-structure)
2. [Routing Conventions](#2-routing-conventions)
3. [Component Guidelines](#3-component-guidelines)
4. [Styling Philosophy](#4-styling-philosophy)
5. [Data & Features](#5-data--features)
6. [TypeScript Conventions](#6-typescript-conventions)
7. [Naming Conventions](#7-naming-conventions)
8. [Do's and Don'ts](#8-dos-and-donts)

---

## 1. Project Structure

```
src/
├── components/       # Shared, reusable UI components
├── features/         # Domain logic: data, types, filtering, formatting
├── routes/           # File-based pages (TanStack Router)
│   ├── __root.tsx    # Root layout (Navbar, Outlet)
│   ├── index.tsx     # Home page "/"
│   ├── appointment/
│   │   └── route.tsx
│   ├── patient/
│   │   ├── route.tsx      # Layout shell (just renders <Outlet />)
│   │   ├── index.tsx      # Search form — "/patient"
│   │   ├── result.tsx     # Search results — "/patient/result"
│   │   └── detail.tsx     # Patient detail — "/patient/detail"
│   └── style/             # Route-scoped SCSS
│       └── patient.scss
├── types/            # Global TypeScript declarations (e.g. Carbon WC types)
├── styles.scss       # Global styles and Carbon theme setup
└── main.tsx          # App entry point
```

### Rules

- **`components/`** holds only generic, reusable pieces. A component here must not import from a specific route or domain feature.
- **`features/`** holds domain logic — types, data, filtering functions, formatters. No JSX here.
- **`routes/`** is owned by TanStack Router. Each file maps 1:1 to a URL segment. Keep route files thin: fetch/validate data, compose layout, delegate logic to `features/`.
- **`routes/style/`** holds SCSS scoped to a route group. One file per route group (e.g. `patient.scss` covers all `/patient/*` routes).

---

## 2. Routing Conventions

This project uses **TanStack Router file-based routing**. `routeTree.gen.ts` is auto-generated — never edit it manually.

### Route file types

| File         | Purpose                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------- |
| `route.tsx`  | Layout shell for a route group. Renders `<Outlet />`. Add shared UI here (breadcrumbs, tabs). |
| `index.tsx`  | The default child of a group (e.g. `/patient/` maps to `patient/index.tsx`).                  |
| `[page].tsx` | A named child route (e.g. `result.tsx` → `/patient/result`).                                  |

### Search params

Validate all search params in the route definition using `validateSearch`. Never read raw `window.location.search`.

```tsx
export const Route = createFileRoute("/patient/result")({
  validateSearch: normalizePatientSearch, // always sanitize here
  component: RouteComponent,
});
```

The validator lives in `features/` so it can be shared and tested independently of the route.

### Navigation

Always use TanStack Router's `navigate` or `<Link>` — never `window.location.href` or raw `<a>` tags for internal links.

```tsx
// ✅ Internal navigation
const navigate = Route.useNavigate();
navigate({ to: "/patient/result", search });

// ✅ Building hrefs (e.g. for Carbon link components)
const href = router.buildLocation({
  to: "/patient/detail",
  search: { hn },
}).href;
```

---

## 3. Component Guidelines

### Shared components (`src/components/`)

Shared components must be:

- **Generic** — no domain knowledge (no patient-specific logic inside `Table.tsx`)
- **Prop-driven** — all behaviour comes from props
- **Composable** — accept a `rowAction` slot rather than hard-coding actions

```tsx
// ✅ Good — generic, composable
<Table table={patientTable} rowAction={(row) => <cds-link href={...}>View</cds-link>} />

// ❌ Bad — domain logic baked into a shared component
<PatientTable patients={results} />  // don't couple data shape to a shared component
```

### Carbon Web Components

Import Carbon WC components **inside the shared component that uses them** (e.g. `Table.tsx` imports `data-table`). This co-locates the registration with the component that renders it, so routes don't need to know which custom elements a component depends on. Only import Carbon WC at the route level for elements used directly in route JSX (e.g. forms, tiles, date pickers).

```tsx
// ✅ Inside src/components/Table.tsx
import "@carbon/web-components/es/components/data-table/index.js";

// ✅ Inside a route file (for elements used directly in that route)
import "@carbon/web-components/es/components/date-picker/index.js";
```

When you need a Carbon WC element in JSX, its type must be declared in `src/types/carbon.d.ts`.

### Refs and Web Component attributes

Some Carbon WC attributes cannot be set via JSX props (e.g. `prefix` on `cds-header-name`). Use a `ref` + `useEffect` for these cases:

```tsx
const ref = useRef<HTMLElement>(null);
useEffect(() => {
  ref.current?.setAttribute("prefix", "My Org - ");
}, []);
```

---

## 4. Styling Philosophy

> **Use Carbon tokens and utilities first. Write custom CSS only when Carbon has no equivalent.**

### The hierarchy

1. **Carbon layout** — use `cds-grid` / `cds-column` for all multi-column layouts
2. **Carbon spacing tokens** — use `var(--cds-spacing-*)` instead of hardcoded `rem` values
3. **Carbon type tokens** — use `@include type-style('label-01')` instead of manual `font-size` / `font-weight`
4. **Carbon color tokens** — use `var(--cds-text-primary)`, `var(--cds-layer)`, etc.
5. **Custom CSS** — only as a last resort, and scoped to `routes/style/`

### Carbon spacing scale reference

| Token              | Value  | Common use      |
| ------------------ | ------ | --------------- |
| `--cds-spacing-03` | 0.5rem | Tight gaps      |
| `--cds-spacing-05` | 1rem   | Default gap     |
| `--cds-spacing-07` | 2rem   | Section padding |
| `--cds-spacing-09` | 3rem   | Page margins    |
| `--cds-spacing-10` | 4rem   | Large padding   |

### Carbon type styles reference

| Token                   | Use                    |
| ----------------------- | ---------------------- |
| `body-short-01`         | Default body text      |
| `label-01`              | Field labels, metadata |
| `heading-02`            | Section headings       |
| `productive-heading-03` | Page titles            |

### SCSS structure

Global styles belong in `src/styles.scss`. This file sets up the Carbon theme and resets — keep it minimal.

```scss
// src/styles.scss — only global concerns
@use "@carbon/styles/scss/reset";
@use "@carbon/styles/scss/theme" as *;
@use "@carbon/styles/scss/themes";
@use "@carbon/styles/scss/grid";

:root {
  @include theme(themes.$g10);
  font-family: "IBM Plex Sans Thai", "Google Sans", sans-serif;
}
```

Route-scoped styles live in `src/routes/style/[group].scss` and are imported only by routes within that group.

### What to avoid

```scss
// ❌ Hardcoded values
padding: 3rem 4.25rem;
font-size: 0.875rem;
font-weight: 600;
gap: 1.5rem;

// ✅ Carbon tokens
padding: var(--cds-spacing-09) var(--cds-spacing-10);
@include type-style("body-short-01");
gap: var(--cds-spacing-05);
```

---

## 5. Data & Features

All domain logic lives in `src/features/`. A feature file owns:

- **Types** — the data shapes for that domain
- **Static data / mock data** — arrays of records (until an API exists)
- **Pure functions** — filtering, formatting, normalization

```
features/
└── patientSearch.ts
    ├── type Patient
    ├── type PatientSearchParams
    ├── patients[]              ← mock data
    ├── normalizePatientSearch  ← sanitizes raw search input
    ├── hasPatientSearch        ← guard: returns false if all fields empty
    ├── filterPatients          ← applies search params to data
    ├── formatSex               ← presentation formatter
    └── createPatientTableRows  ← maps Patient[] → table row format
```

### Rules

- Feature functions must be **pure** — no side effects, no imports from `routes/` or `components/`.
- Formatters (like `formatSex`) belong in `features/`, not inline in JSX.
- When a real API replaces mock data, only the feature file changes — routes stay the same.

### Adding a new domain

1. Create `src/features/[domain].ts`
2. Define types first
3. Export pure functions for filtering, formatting, and row-mapping
4. Import from the relevant route files

---

## 6. TypeScript Conventions

### Carbon Web Component types

All `cds-*` JSX elements must be declared in `src/types/carbon.d.ts`. Use the shared `CarbonEl` alias:

```ts
type CarbonEl = HTMLAttributes<HTMLElement> & Record<string, unknown>;

// Add new elements here as you use them
"cds-my-new-component": CarbonEl;
```

### Strict mode

`tsconfig.json` enables strict TypeScript. Don't suppress errors with `any` — use proper types or `unknown` with a type guard.

### Path aliases

Use `#/` for imports within `src/`:

```ts
// ✅
import { Table } from "#/components/Table";
import { filterPatients } from "#/features/patientSearch";

// ❌
import { Table } from "../../components/Table";
```

---

## 7. Naming Conventions

| Thing         | Convention                     | Example                                    |
| ------------- | ------------------------------ | ------------------------------------------ |
| Route files   | lowercase, matches URL segment | `result.tsx`, `route.tsx`                  |
| Components    | PascalCase                     | `Navbar.tsx`, `Table.tsx`                  |
| Feature files | camelCase, domain-first        | `patientSearch.ts`                         |
| SCSS files    | camelCase, domain-first        | `patient.scss`                             |
| Types         | PascalCase                     | `Patient`, `PatientSearchParams`           |
| Functions     | camelCase, verb-first          | `filterPatients`, `formatSex`              |
| CSS classes   | BEM with domain prefix         | `.patient-form__grid`, `.navbar-user-meta` |

---

## 8. Do's and Don'ts

### Routing

| ✅ Do                                                        | ❌ Don't                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------- |
| Use `validateSearch` on every route that reads search params | Read `window.location.search` directly                        |
| Use `navigate()` or `<Link>` for internal links              | Use `<a href>` or `window.location.href` for SPA navigation   |
| Keep route files thin — logic in `features/`                 | Put filtering or formatting logic inline in a route component |

### Styling

| ✅ Do                                                     | ❌ Don't                                       |
| --------------------------------------------------------- | ---------------------------------------------- |
| Use `var(--cds-spacing-*)` for all spacing                | Hardcode `rem` or `px` values                  |
| Use `var(--cds-text-*)` and `var(--cds-layer)` for colors | Use hardcoded hex colors                       |
| Use `cds-grid` / `cds-column` for layout                  | Write custom grid CSS                          |
| Use `cds-stack` for vertical spacing                      | Add `gap` / `margin` manually between siblings |
| Scope custom CSS to `routes/style/`                       | Put route-specific styles in `styles.scss`     |

### Components

| ✅ Do                                          | ❌ Don't                                             |
| ---------------------------------------------- | ---------------------------------------------------- |
| Import Carbon WC inside shared components that render them | Duplicate Carbon WC imports across every route that uses a component |
| Keep `src/components/` generic and prop-driven             | Put domain logic or data access in shared components                 |
| Declare new `cds-*` elements in `carbon.d.ts`  | Use `// @ts-ignore` on Carbon elements               |

### Data

| ✅ Do                                       | ❌ Don't                                           |
| ------------------------------------------- | -------------------------------------------------- |
| Keep all domain logic in `src/features/`    | Inline filtering or formatting logic in JSX        |
| Write pure functions                        | Import from routes or components in a feature file |
| Normalize input early (in `validateSearch`) | Let raw strings propagate through components       |
