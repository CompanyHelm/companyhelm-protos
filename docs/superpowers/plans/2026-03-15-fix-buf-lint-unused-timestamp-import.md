# Fix Buf Lint Unused Timestamp Import Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the `companyhelm-protos` build by removing the unused `google/protobuf/timestamp.proto` import that breaks `buf lint`.

**Architecture:** Reproduce the failing lint locally, confirm which proto declares the unused import, and apply the smallest possible contract-only fix in the offending file. Verify with the existing repo verification commands and inspect `companyhelm-common` e2e coverage to confirm no cross-repo updates are needed.

**Tech Stack:** Protobuf, Buf, Node.js, npm, GitHub Actions

---

### Task 1: Reproduce the Buf Lint Failure

**Files:**
- Modify: `package-lock.json` only if dependency installation changes tracked metadata

- [ ] **Step 1: Install repo dependencies**

Run: `npm ci`
Expected: PASS and local `buf` binary becomes available through npm scripts.

- [ ] **Step 2: Run the failing lint command**

Run: `npm run buf:lint`
Expected: FAIL with an unused import error for `google/protobuf/timestamp.proto`.

### Task 2: Apply the Minimal Proto Fix

**Files:**
- Modify: `proto/companyhelm/agent/v1/questions.proto`

- [ ] **Step 1: Write the minimal implementation**

Remove the unused `google/protobuf/timestamp.proto` import from `questions.proto` and leave the rest of the declaration surface unchanged.

- [ ] **Step 2: Re-run the targeted lint command**

Run: `npm run buf:lint`
Expected: PASS.

### Task 3: Verify, Review Adjacent Tests, and Ship

**Files:**
- Inspect: `companyhelm-common` e2e coverage only; no modifications expected

- [ ] **Step 1: Run package verification**

Run: `npm run verify`
Expected: PASS.

- [ ] **Step 2: Check `companyhelm-common` for e2e impact**

Inspect the shared e2e scripts and confirm this proto-only lint fix does not require test updates.

- [ ] **Step 3: Commit, push, and open a PR**

Create a short-lived fix branch, push it, open a PR against `main`, and wait for checks to pass.
