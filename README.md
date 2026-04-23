# Invoice App

A fully responsive invoice management application built with React and Tailwind CSS v4. Users can create, edit, delete, filter, and mark invoices as paid — with all data persisted in `localStorage`.

---

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Architecture Explanation](#architecture-explanation)
- [Trade-offs](#trade-offs)
- [Accessibility Notes](#accessibility-notes)
- [Improvements Beyond Requirements](#improvements-beyond-requirements)

---

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd invoice-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://hng-invoice-app-mu.vercel.app` by default.

### Other Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server with HMR |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

### Environment

No environment variables are required. All data is stored in the browser's `localStorage` under the key `invoice-app-data`.

---

## Architecture Explanation

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Routing | React Router DOM v7 |
| Forms | React Hook Form v7 |
| Icons | React Icons (HeroIcons 2) |
| Date Handling | date-fns, react-datepicker |

### Project Structure

```
src/
├── components/
│   ├── common/         # Reusable UI primitives
│   │   ├── Button.jsx      # Multi-variant button (primary, secondary, danger, dark, item)
│   │   └── Checkbox.jsx    # Accessible custom checkbox
│   ├── form/           # Form building blocks
│   │   ├── InvoiceForm.jsx # Unified create/edit drawer form
│   │   ├── BaseInput.jsx   # Labelled input with error state
│   │   ├── Select.jsx      # Custom styled select dropdown
│   │   └── DatePicker.jsx  # Wrapped react-datepicker
│   ├── invoice/        # Invoice-specific components
│   │   ├── InvoiceCard.jsx   # List item card on Home page
│   │   ├── InvoiceStatus.jsx # Colour-coded status badge
│   │   ├── DeleteModal.jsx   # Confirmation modal before deletion
│   │   └── EmptyState.jsx    # Illustration shown when list is empty
│   └── layout/
│       ├── MainLayout.jsx  # Root layout with sidebar + main content
│       └── Sidebar.jsx     # Responsive nav (top bar on mobile, left sidebar on desktop)
├── context/
│   ├── InvoiceContext.jsx  # Global invoice state via useReducer + localStorage
│   └── ThemeContext.jsx    # Dark/light mode toggle via class on <html>
├── pages/
│   ├── Home.jsx            # Invoice list page with filter
│   └── InvoiceView.jsx     # Single invoice detail view
├── services/
│   └── storage.js          # (Reserved for storage abstraction)
├── utils/
│   ├── formatters.js       # formatDate() and formatCurrency() helpers
│   └── constants.js        # Shared constant values
├── data.json               # Seed data loaded on first boot
├── index.css               # Tailwind v4 @theme design tokens
└── main.jsx                # App entry point with context providers
```

### State Management

State is managed with React's built-in `useReducer` hook inside `InvoiceContext`. There is no external state library (e.g. Redux, Zustand).

```
InvoiceContext
├── State:   invoices[]
└── Actions:
    ├── ADD_INVOICE      → prepends new invoice to state
    ├── UPDATE_INVOICE   → replaces matching invoice by id
    ├── DELETE_INVOICE   → filters out invoice by id
    └── MARK_AS_PAID     → sets invoice status to 'paid'
```

**Persistence strategy:** A `useEffect` watches the `invoices` array and syncs it to `localStorage` on every change. On boot, the reducer's lazy initialiser reads from `localStorage` first; if nothing is found, the seed `data.json` is used.

### Routing

Two routes are defined in `App.jsx`:

| Path | Component | Description |
|---|---|---|
| `/` | `Home` | Invoice list with filter by status |
| `/invoice/:id` | `InvoiceView` | Full invoice detail, edit, delete, mark as paid |

### Responsive Layout Strategy

The app uses a three-tier responsive layout:

| Breakpoint | Sidebar | Action Buttons |
|---|---|---|
| Mobile (`< md`) | Fixed top bar (72px tall) | Fixed bottom action bar (`z-50`) |
| Tablet (`md`) | Fixed top bar (80px tall) | Inline in the status card header |
| Desktop (`lg+`) | Fixed left sidebar (103px wide) | Inline in the status card header |

### Design Tokens

All colours, font sizes, and line heights are defined as CSS custom properties in `index.css` under Tailwind v4's `@theme` block, making them available as utility classes throughout the project (e.g. `text-primary`, `bg-dark-card`, `text-heading-m`).

---

## Trade-offs

### `localStorage` vs. a Backend API
**Chosen:** `localStorage` for all persistence.  
**Why:** Keeps the app entirely client-side with zero backend dependencies, making it trivial to run locally or deploy as a static site.  
**Cost:** Data is device-specific and not shareable. Clearing browser storage resets the app to seed data. A real production app would replace `InvoiceContext` with API calls (e.g. `react-query` + a REST/GraphQL backend).

### `useReducer` vs. Zustand / Redux
**Chosen:** `useReducer` + Context.  
**Why:** The invoice CRUD actions are few and well-defined. Introducing a third-party store would add boilerplate without meaningful benefit at this scale.  
**Cost:** Context re-renders all consumers on every state change. With a larger dataset or more consumers, a selector-based store (Zustand) would be more performant.

### Unified `InvoiceForm` for Create & Edit
**Chosen:** One component handles both "New Invoice" and "Edit Invoice" modes.  
**Why:** Both flows share identical fields, validation, and submission logic. A single component avoids duplication.  
**Cost:** The `useEffect` that resets the form on `isOpen` change adds a small layer of complexity. The component is slightly harder to read at first glance.

### Tailwind CSS v4 (`@theme` / CSS-first config)
**Chosen:** Tailwind v4 with `@theme` in `index.css` instead of a `tailwind.config.js`.  
**Why:** Tailwind v4 removes the JS config file in favour of pure CSS configuration, which is more portable and requires no Node.js config parsing at build time.  
**Cost:** v4 is still relatively new; some third-party plugins and community examples still target v3 syntax, requiring adaptation.

### No TypeScript
**Chosen:** JavaScript with PropTypes for runtime prop validation.  
**Why:** Keeps the project approachable and reduces setup friction for a stage project.  
**Cost:** No compile-time type safety. Migrating to TypeScript would significantly improve maintainability at scale.

---

## Accessibility Notes

- **Semantic HTML** — Headings follow a logical hierarchy (`h2` → `h3` → `h4`). Lists, buttons, and links use the correct native elements rather than styled `<div>`s.
- **`aria-label` attributes** — Interactive icon-only buttons (e.g. the mobile "Go back" close button, the delete trash icon) carry descriptive `aria-label` values for screen readers.
- **Keyboard navigation** — All interactive elements (buttons, links, inputs, selects) are natively focusable. The filter dropdown and form controls are reachable via Tab.
- **Focus management** — The `InvoiceForm` drawer uses `pointer-events-none` + `invisible` when closed so it is removed from the accessibility tree without being torn from the DOM, allowing smooth CSS transitions on open/close.
- **Colour contrast** — Text colours (`#0C0E16` on light, `#FFFFFF` on dark) meet WCAG AA contrast ratios against their respective backgrounds.
- **Dark mode** — Implemented via a `.dark` class toggled on `<html>`, respecting user preference set within the app. The `@custom-variant dark` directive in Tailwind v4 scopes all dark styles cleanly.
- **Status badges** — The `InvoiceStatus` component uses both colour and text label to convey status (not colour alone), supporting users with colour-vision deficiencies.
- **Delete confirmation** — Destructive actions (invoice deletion) are guarded by a modal that requires explicit confirmation, preventing accidental data loss.

---

## Improvements Beyond Requirements

### Responsive Mobile Action Bar
The spec showed action buttons only in the desktop header. This implementation adds a **fixed bottom action bar on mobile** that floats above the content, matching native mobile app conventions and making the primary actions immediately reachable with a thumb.

### Mobile "Go Back" Navigation in the Form Drawer
The edit/create form slides in from the left on mobile. A **"Go back" button** (matching the style of the back button on the invoice detail page) is injected at the top of the drawer on mobile only, giving users a clear and familiar exit point without needing to scroll to the bottom Cancel button.

### Slide-in Drawer Animation
The `InvoiceForm` slides in from the left with a `transform transition-transform` animation and a semi-transparent backdrop, rather than a static modal. This feels more native and gives users spatial context (the form comes from the left sidebar direction).

### Local Persistence with Seed Data Fallback
All invoice data survives page refreshes via `localStorage`. On first load (or after clearing storage), the app bootstraps from a rich `data.json` seed file containing realistic invoice data, so the app is never empty out of the box.

### Design Token System
Rather than hardcoding colour values throughout the project, all design tokens (colours, typography scales, spacing intent) are centralised in `index.css` under Tailwind v4's `@theme`. This makes the design consistent and easy to update globally.

### Dark Mode
A fully implemented dark mode is toggled via a button in the sidebar. The preference is tracked in `ThemeContext` and applied as a class on `<html>`, meaning all components respond to it without prop drilling.

### Empty State Illustration
When the invoice list is empty (or filtered to zero results), an `EmptyState` component renders a friendly illustration and message instead of a blank page.

### ID Auto-Generation
New invoices are assigned a unique two-letter + four-digit ID (e.g. `RT3080`) generated at creation time, matching the format used in the design specification.
