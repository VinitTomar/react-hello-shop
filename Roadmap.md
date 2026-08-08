# ReactMart — React + TypeScript Learning Roadmap

A project-based curriculum building an e-commerce store from scratch.
Each module adds a feature to the app and teaches a specific concept.
Every lesson is checked out from its own branch: `git checkout v0.3-routing` jumps to any lesson. See the README's [How to Learn From This Repo](./README.md#how-to-learn-from-this-repo) section for the full try-then-check workflow.

This is a living roadmap — v0.1 through v0.15 are complete, and more phases are planned.

## Tech Stack

| Layer                      | Tool                               |
| -------------------------- | ---------------------------------- |
| Scaffolding                | Vite + React + TypeScript (strict) |
| Routing                    | React Router v6                    |
| Client State (Cart)        | Zustand                            |
| Client State (Auth/Orders) | Redux Toolkit                      |
| Server State               | TanStack Query (React Query v5)    |
| Forms                      | React Hook Form + Zod              |
| Testing                    | Vitest + React Testing Library     |
| API Mocking                | MSW (Mock Service Worker)          |
| Styling                    | Tailwind CSS                       |

---

## Phase 1 — Foundation

### v0.1 — Project Setup

**Feature:** Vite scaffold, folder structure, ESLint + Prettier, Tailwind, path aliases
**Concept:** tsconfig strict mode, path aliases (`@/`), project hygiene
**Branch:** `v0.1-Project-Setup`

**Milestones**

- [x] Scaffold with `npm create vite@latest` (React + TypeScript template)
- [x] Configure `tsconfig.json` strict mode
- [x] Set up ESLint with TypeScript-aware rules + Prettier
- [x] Install and configure Tailwind CSS
- [x] Verify dev server runs with hot reload
- [x] Add `@/` path alias in `vite.config.ts` and `tsconfig.json`

**Reading**

- [Vite Getting Started](https://vite.dev/guide/)
- [TypeScript Strict Mode reference](https://www.typescriptlang.org/tsconfig#strict)
- [Tailwind CSS + Vite setup](https://tailwindcss.com/docs/installation/using-vite)

### v0.2 — Component Architecture

**Feature:** Header, ProductCard, ProductGrid components
**Concept:** Typed props, discriminated unions for variants, component composition
**Branch:** `v0.2-Component-Architecture` · **Spec:** [specs/v0.2-component-architecture.md](specs/v0.2-component-architecture.md) · **Compare:** `git diff v0.1-Project-Setup v0.2-Component-Architecture`

**Milestones**

- [x] Define `Product` TypeScript interface
- [x] Build `ProductCard` with typed props
- [x] Add variant support via discriminated union (`compact | full`)
- [x] Build `ProductGrid` that renders a list of `ProductCard`s
- [x] Build `Header` component with placeholder navigation links
- [x] Compose all components in `App.tsx`

**Reading**

- [React TypeScript Cheatsheet — Typed Props](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example/)
- [TypeScript Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)
- [Component Composition (React docs)](https://react.dev/learn/passing-props-to-a-component)

---

## Phase 2 — Routing

### v0.3 — React Router v6

**Feature:** Home (product listing), Product Detail, Cart, and 404 pages
**Concept:** Routes, useParams, useNavigate, Outlet, nested routes
**Branch:** `v0.3-routing` · **Spec:** [specs/v0.3-react-router.md](specs/v0.3-react-router.md) · **Compare:** `git diff v0.2-Component-Architecture v0.3-routing`

**Milestones**

- [x] Install React Router v6 and wrap app in `<BrowserRouter>`
- [x] Define route tree with `<Routes>` / `<Route>`
- [x] Create `Home` page (product listing)
- [x] Create `ProductDetail` page using `useParams`
- [x] Create `Cart` page
- [x] Create `NotFound` 404 page
- [x] Add `<Link>` navigation in Header
- [x] Implement `useNavigate` for programmatic redirect

**Reading**

- [React Router v6 — Main Concepts](https://reactrouter.com/en/main/start/concepts)
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)
- [useParams](https://reactrouter.com/en/main/hooks/use-params) · [useNavigate](https://reactrouter.com/en/main/hooks/use-navigate) · [Outlet](https://reactrouter.com/en/main/components/outlet)

---

## Phase 3 — Forms

### v0.4 — Forms & Validation

**Feature:** Search bar + filter sidebar (category, price range)
**Concept:** React Hook Form + Zod, typed form state, validation schemas
**Branch:** `v0.4-forms` · **Spec:** [specs/v0.4-forms-validation.md](specs/v0.4-forms-validation.md) · **Compare:** `git diff v0.3-routing v0.4-forms`

**Milestones**

- [x] Install React Hook Form and Zod
- [x] Define Zod schema for the search/filter form
- [x] Wire RHF with `zodResolver`
- [x] Build search bar input with inline validation error
- [x] Build category filter (checkbox group)
- [x] Build price range filter (min/max inputs)

**Reading**

- [React Hook Form — Get Started](https://react-hook-form.com/get-started)
- [Zod Documentation](https://zod.dev/)
- [RHF + Zod (Schema Validation)](https://react-hook-form.com/get-started#SchemaValidation)

---

## Phase 4 — Custom Hooks

### v0.5 — Custom Hooks with TypeScript

**Feature:** useDebounce (for search), useLocalStorage, useWindowSize
**Concept:** Custom hooks, TypeScript generics in hooks
**Branch:** `v0.5-custom-hooks` · **Spec:** [specs/v0.5-custom-hooks.md](specs/v0.5-custom-hooks.md) · **Compare:** `git diff v0.4-forms v0.5-custom-hooks`

**Milestones**

- [x] Implement `useDebounce<T>` with a generic type parameter
- [x] Wire `useDebounce` to the search input (300 ms delay)
- [x] Implement `useLocalStorage<T>` with JSON serialization
- [x] Implement `useWindowSize` returning `{ width, height }`
- [x] Write `renderHook` + Vitest tests for each hook

**Reading**

- [Reusing Logic with Custom Hooks (React docs)](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [renderHook (RTL)](https://testing-library.com/docs/react-testing-library/api/#renderhook)

---

## Phase 5 — State Management

### v0.6 — Zustand

**Feature:** Cart (add / remove / update quantity / clear)
**Concept:** Zustand typed store, persist middleware, devtools integration
**Branch:** `v0.6-state-mgmt-zustand` · **Spec:** [specs/v0.6-zustand.md](specs/v0.6-zustand.md) · **Compare:** `git diff v0.5-custom-hooks v0.6-state-mgmt-zustand`

**Milestones**

- [x] Install Zustand
- [x] Define `CartItem` and `CartStore` TypeScript interfaces
- [x] Implement store with `create<CartStore>()` (add / remove / updateQuantity / clear)
- [x] Add `persist` middleware (localStorage)
- [x] Add Zustand DevTools middleware
- [x] Connect `ProductCard` "Add to Cart" button to store
- [x] Render cart badge in Header from store
- [x] Render full cart contents on the Cart page

**Reading**

- [Zustand — Getting Started](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [Zustand with TypeScript](https://zustand.docs.pmnd.rs/guides/typescript)
- [Zustand persist middleware](https://zustand.docs.pmnd.rs/integrations/persisting-store-data)

### v0.7 — Context API

**Feature:** Auth state (login/logout) + dark/light theme toggle
**Concept:** Typed context, createContext with generics, context optimization (splitting contexts)
**Branch:** `v0.7-state-mgmt-context-api.md` (yes, the branch name really has a stray `.md`) · **Spec:** [specs/v0.7-context-api.md](specs/v0.7-context-api.md) · **Compare:** `git diff v0.6-state-mgmt-zustand v0.7-state-mgmt-context-api.md`

**Milestones**

- [x] Create `AuthContext` with `User | null`, `login`, and `logout` typed actions
- [x] Create `AuthProvider` wrapping the app
- [x] Implement `useAuth` custom hook
- [x] Create `ThemeContext` for `"light" | "dark"` toggle
- [x] Persist theme preference to `localStorage`
- [x] Add theme toggle button in Header
- [x] Apply Tailwind `dark:` classes throughout components

**Reading**

- [createContext (React docs)](https://react.dev/reference/react/createContext)
- [Typed Context with TypeScript (RTS Cheatsheet)](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/)
- [Splitting Context providers for performance](https://react.dev/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions)

### v0.8 — Redux Toolkit

**Feature:** User profile + order history
**Concept:** createSlice, createAsyncThunk, RTK DevTools — and when to use RTK vs Zustand
**Branch:** `v0.8-state-mgmt-redux` · **Spec:** [specs/v0.8-redux-toolkit.md](specs/v0.8-redux-toolkit.md) · **Compare:** `git diff v0.7-state-mgmt-context-api.md v0.8-state-mgmt-redux`

**Milestones**

- [x] Install Redux Toolkit and `react-redux`
- [x] Configure the Redux store with `configureStore`
- [x] Create `userSlice` with `createSlice` (user profile state)
- [x] Create `ordersSlice` with `createAsyncThunk` (fetch order history)
- [x] Connect components with `useSelector` and typed `useDispatch`
- [x] Verify Redux DevTools browser extension works
- [x] Note in code/docs when to reach for RTK vs Zustand

**Reading**

- [Redux Toolkit — Getting Started](https://redux-toolkit.js.org/introduction/getting-started)
- [RTK Usage with TypeScript](https://redux-toolkit.js.org/usage/usage-with-typescript)
- [createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk)

---

## Phase 6 — Server State

### v0.9 — TanStack Query

**Feature:** Fetch products + product detail from a mock API (MSW)
**Concept:** useQuery, query keys, stale time, loading/error states, MSW setup
**Branch:** `v0.9-tanstack-query` · **Spec:** [specs/v0.9-tanstack-query.md](specs/v0.9-tanstack-query.md) · **Compare:** `git diff v0.8-state-mgmt-redux v0.9-tanstack-query`

**Milestones**

- [x] Install TanStack Query v5 and MSW
- [x] Set up MSW handlers for `GET /products` and `GET /products/:id`
- [x] Configure `QueryClient` and wrap app in `<QueryClientProvider>`
- [x] Replace in-component fetch with `useQuery` for product listing
- [x] Replace in-component fetch with `useQuery` for product detail
- [x] Handle loading, error, and success states in UI
- [x] Configure `staleTime` and observe caching behavior

**Reading**

- [TanStack Query — Overview](https://tanstack.com/query/latest/docs/framework/react/overview)
- [TanStack Query + TypeScript](https://tanstack.com/query/latest/docs/framework/react/typescript)
- [MSW — Getting Started](https://mswjs.io/docs/getting-started)

### v0.10 — Advanced Query Patterns

**Feature:** Wishlist with optimistic add/remove + infinite scroll on product listing
**Concept:** useMutation, optimistic updates, useInfiniteQuery, query invalidation
**Branch:** `v0.10-advanced-query-patterns` · **Spec:** [specs/v0.10-advanced-query-patterns.md](specs/v0.10-advanced-query-patterns.md) · **Compare:** `git diff v0.9-tanstack-query v0.10-advanced-query-patterns`

**Milestones**

- [x] Implement `useMutation` for adding a wishlist item
- [x] Implement `useMutation` for removing a wishlist item
- [x] Add optimistic updates (`onMutate`) with rollback on error (`onError`)
- [x] Invalidate and refetch queries after mutation (`queryClient.invalidateQueries`)
- [x] Replace product listing pagination with `useInfiniteQuery`
- [x] Implement "Load More" button calling `fetchNextPage`

**Reading**

- [useMutation](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)
- [Optimistic Updates](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)
- [useInfiniteQuery](https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries)

---

## Phase 7 — Performance

### v0.11 — Performance Optimization

**Feature:** Optimize product grid rendering for large datasets
**Concept:** React.memo, useMemo, useCallback, profiling with React DevTools
**Branch:** `v0.11-performance-optimization` · **Spec:** [specs/v0.11-performance-optimization.md](specs/v0.11-performance-optimization.md) · **Compare:** `git diff v0.10-advanced-query-patterns v0.11-performance-optimization`

**Milestones**

- [x] Profile product grid with React DevTools Profiler (baseline)
- [x] Wrap `ProductCard` in `React.memo` and verify re-render reduction
- [x] Memoize expensive derived values with `useMemo`
- [x] Stabilize callback props with `useCallback`
- [x] Re-profile and compare flame graphs before vs after

**Reading**

- [React.memo](https://react.dev/reference/react/memo)
- [useMemo](https://react.dev/reference/react/useMemo)
- [useCallback](https://react.dev/reference/react/useCallback)
- [React DevTools Profiler](https://react.dev/learn/react-developer-tools)

### v0.12 — Code Splitting

**Feature:** Lazy-load Product Detail page + Admin dashboard route
**Concept:** React.lazy, Suspense, route-based code splitting, dynamic imports
**Branch:** `v0.12-code-splitting` · **Spec:** [specs/v0.12-code-splitting.md](specs/v0.12-code-splitting.md) · **Compare:** `git diff v0.11-performance-optimization v0.12-code-splitting`

**Milestones**

- [x] Wrap `ProductDetail` import with `React.lazy`
- [x] Add `<Suspense fallback={<Spinner />}>` around lazy routes
- [x] Create stub `AdminDashboard` route and lazy-load it
- [x] Run `vite build` and verify split chunks in output
- [x] Measure bundle size reduction with `npx vite-bundle-visualizer`

**Reading**

- [React.lazy](https://react.dev/reference/react/lazy)
- [Suspense](https://react.dev/reference/react/Suspense)
- [Vite Dynamic Import / Code Splitting](https://vite.dev/guide/features.html#dynamic-import)

---

## Phase 8 — Advanced TypeScript

### v0.13 — Advanced TypeScript Patterns

**Feature:** Generic SortableTable component for order history
**Concept:** Generic components, conditional types, mapped types, template literal types, `satisfies` operator
**Branch:** `v0.13-advanced-typescript` · **Spec:** [specs/v0.13-advanced-typescript.md](specs/v0.13-advanced-typescript.md) · **Compare:** `git diff v0.12-code-splitting v0.13-advanced-typescript`

**Milestones**

- [x] Design `SortableTable<T>` generic component interface
- [x] Implement typed column definitions with accessor functions
- [x] Use mapped types to derive sortable/filterable keys from the row shape
- [x] Apply conditional types for optional column features (e.g., selectable rows)
- [x] Use template literal types for sort keys (`"name_asc" | "name_desc"`)
- [x] Validate config objects with the `satisfies` operator

**Reading**

- [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
- [`satisfies` operator (TS 4.9)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator)

---

## Phase 9 — Testing

### v0.14 — Unit Testing

**Feature:** Test suite for ProductCard, cart store, useDebounce hook
**Concept:** Vitest + RTL: render, screen queries, userEvent, renderHook for custom hooks
**Branch:** `v0.14-unit-testing` · **Spec:** [specs/v0.14-unit-testing.md](specs/v0.14-unit-testing.md) · **Compare:** `git diff v0.13-advanced-typescript v0.14-unit-testing`

**Milestones**

- [x] Configure Vitest and React Testing Library
- [x] Write render + query tests for `ProductCard`
- [x] Write `userEvent` interaction tests (add to cart click)
- [x] Write pure unit tests for Zustand cart store state transitions
- [x] Write `renderHook` tests for `useDebounce`

**Reading**

- [Vitest — Getting Started](https://vitest.dev/guide/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [userEvent](https://testing-library.com/docs/user-event/intro/)
- [renderHook](https://testing-library.com/docs/react-testing-library/api/#renderhook)

### v0.15 — Integration Testing + Final Feature

**Feature:** Multi-step checkout flow (cart → shipping → payment → confirmation) + integration tests
**Concept:** Integration testing with RTL, MSW for API mocking in tests, accessibility testing
**Branch:** `v0.15-integration-testing` · **Spec:** [specs/v0.15-integration-testing.md](specs/v0.15-integration-testing.md) · **Compare:** `git diff v0.14-unit-testing v0.15-integration-testing`

**Milestones**

- [x] Plan the 4-step checkout flow (Cart → Shipping → Payment → Confirmation)
- [x] Build `ShippingForm` step with RHF + Zod validation
- [x] Build `PaymentForm` step
- [x] Build `OrderConfirmation` step
- [x] Set up MSW handlers for checkout API endpoints
- [x] Write integration tests driving the full checkout flow end-to-end
- [x] Add `axe-core` accessibility checks to integration tests

**Reading**

- [RTL — Integration Testing Example](https://testing-library.com/docs/react-testing-library/example-intro/)
- [MSW in Tests](https://mswjs.io/docs/integrations/browser)
- [vitest-axe (accessibility assertions)](https://github.com/nickvdyck/vitest-axe)

---

## Quick Reference

```bash
# Jump to a specific lesson
git checkout v0.5-custom-hooks

# See what changed in a lesson
git diff v0.4-forms v0.5-custom-hooks

# Return to latest
git checkout main
```
