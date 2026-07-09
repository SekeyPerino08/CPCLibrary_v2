# CPClibrary_v2 - Smart Library Management System

## Backend (Express + Prisma)
- [x] Inspect existing repo structure (backend/frontend present, backend partially stubbed)
- [x] Update Prisma schema to add production models (Notifications, Policy, QrToken, etc.)
- [x] Fix Prisma schema relation errors until `prisma generate` succeeds
- [x] Implement Express server bootstrap (middleware, routing, error handling)
- [x] Implement Prisma client singleton
- [ ] Implement JWT auth + RBAC middleware enhancements
- [ ] Implement Auth controllers/routes (register/login/me)
- [ ] Implement Physical Books controllers/routes (CRUD + search)
- [ ] Implement Borrow request workflow (pending/approve/reject)
- [ ] Implement QR generation + single-use QR scanning/validation
- [ ] Implement Return workflow (librarian initiate + borrower scan)
- [ ] Implement Reservation queue workflow (join/claim/expiration + notifications)
- [ ] Implement Borrowing policy endpoints + ActivityLog recording
- [ ] Implement E-Books controllers/routes + bookmarks + conditional download
- [ ] Implement Notifications creation + listing/mark read
- [ ] Implement Reports endpoints (PDF/Excel basic viable)
- [ ] Add OpenAPI/Swagger docs endpoint
- [ ] Seed script (users, books, ebooks, policies) + sample data

## Frontend (Next.js App Router + Tailwind + PWA)
- [ ] Add PWA config (manifest + service worker)
- [ ] Implement auth UI + protected routes
- [ ] Implement role-based layouts (Student/Faculty/Librarian)
- [ ] Implement Physical book browsing/search + details
- [ ] Implement Borrow request UI (select up to 3; faculty period)
- [ ] Implement Librarian request table + approve/reject + QR modal
- [ ] Implement QR scanner component (BarcodeDetector + html5-qrcode fallback)
- [ ] Implement E-book browser + PDF viewer + bookmarks + resume
- [ ] Implement dashboards + notifications pages
- [ ] Implement reports download UI

## Validation / Testing
- [ ] Run backend: npm i, prisma migrate dev, seed, start
- [ ] Run frontend: npm i, build, start
- [ ] Smoke-test core workflows: borrow approval->scan, return->scan, reservation queue join/claim

## Frontend auth-protected routes milestone (new)
- [x] Add frontend auth helpers (token storage + API client)
- [x] Add `/login` page (login form)
- [x] Add `/me` page (fetch current user)
- [x] Add protected route middleware (redirect to /login)
- [x] Update `/` to redirect to dashboard shell or show role-based UI
