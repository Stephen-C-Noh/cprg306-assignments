# Week 9 Assignment Feedback — Firebase Auth

## 1. AuthContext.js — `useEffect` dependency array (`[user]` → `[]`)

**File:** `contexts/AuthContext.js`, line 37

**Problem:** The dependency array is `[user]`, which means every time `user` changes, the effect re-runs. This creates a new `onAuthStateChanged` listener each time auth state changes — a listener leak. The old listener is cleaned up via `unsubscribe()`, but only after a new one is already attached.

**Fix:** Use `[]` so the listener is set up once on mount and torn down once on unmount.

---

## 2. Landing Page — no `try/catch` on handlers

**File:** `app/week-9/page.js`, lines 21–36

**Problem:** All three async handlers (`handleSignIn`, `handleGoogleSignIn`, `handleSignOut`) `await` Firebase operations but have no `try/catch`. If Firebase throws (e.g., popup closed, network error, OAuth misconfiguration), the error becomes an **unhandled promise rejection** — no user feedback, possible silent failure.

**Fix:** Wrap each `await` in a `try/catch` block to handle errors gracefully.

---

## 3. Landing Page — `useEffect` missing `router` in deps

**File:** `app/week-9/page.js`, line 18

**Problem:** The effect uses `router.push(...)` but `router` is not listed as a dependency. The correct declaration is `[user, router]`. While `router` is stable in practice, omitting it is technically incorrect and triggers lint warnings (exhaustive-deps rule).

---

## 4. Shopping List Page — `firebaseSignOut` called inline with no `try/catch`

**File:** `app/week-9/shopping-list/page.js`, line 74

**Problem:** The sign-out button calls `() => firebaseSignOut()` directly in the `onClick` prop. This is an inline async call with no error handling. If sign-out fails, it's a silent unhandled rejection.

**Fix:** Extract it into a dedicated `handleSignOut` async function with `try/catch`, and reference that in `onClick`.

---

## 5. Shopping List Page — `useEffect` missing `router` in deps

**File:** `app/week-9/shopping-list/page.js`, line 19

**Problem:** Same issue as #3 — `router.push(...)` is used inside the effect but `router` is missing from the dependency array `[user]`. Should be `[user, router]`.

---

## Summary

| # | File | Line | Issue |
|---|------|------|-------|
| 1 | `AuthContext.js` | 37 | `[user]` → `[]` to prevent listener leak |
| 2 | `week-9/page.js` | 21–36 | Add `try/catch` to all 3 async handlers |
| 3 | `week-9/page.js` | 18 | Add `router` to `useEffect` deps |
| 4 | `week-9/shopping-list/page.js` | 74 | Extract sign-out to handler with `try/catch` |
| 5 | `week-9/shopping-list/page.js` | 19 | Add `router` to `useEffect` deps |
