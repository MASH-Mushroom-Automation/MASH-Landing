# AI Next-Steps: Sanity Landing Page Integration & Ralph Loop

This prompt is for the next AI agent iteration to continue full Sanity CMS integration for the landing page and to iterate the Ralph loop until PRD completion.

Goal
- Ensure all landing page content is stored in Sanity and consumed by the Next.js app.
- Add mobile app screenshot images to Sanity and wire them into `MobileAppShowcase`.
- Enforce a solid-color-only design system (no gradients) and a consistent light/dark palette.
- Achieve green build/test status: all tests passing, build succeeds, iterate until PRD tasks complete.

Prerequisites
- Developer access to Sanity: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `SANITY_API_WRITE_TOKEN` available in:
  - `studio/.env`
  - project root `.env`
- Node environment set up: `npm install` in root and `studio` (if necessary).

Step-by-step Tasks (for the AI agent)
1. Validate environment files
   - Verify the following files exist and contain expected keys: `studio/.env` and `.env` in repo root.
   - Confirm `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, and `SANITY_API_READ_TOKEN` (or `SANITY_API_WRITE_TOKEN`) are present.

2. Sanity schema
   - Add or update `studio/src/schemaTypes/documents/landingPage.ts` to contain all landing content fields (hero, features, demoVideos, mobileAppScreens, download, FAQ, iotDeviceModel, brandPalette, navigationLinks).
   - Do NOT modify existing e-commerce schemas in `studio/src/schemaTypes/documents/` other than adding this new `landingPage` document.

3. Component wiring
   - Ensure server components fetch landing data via `getLandingPageData()` from `lib/sanity.ts`.
   - For `MobileAppShowcase`, use `mobileAppScreens` array and `getSanityImageUrl()` for screenshot images.

4. Asset uploads
   - Use `scripts/upload-assets.js` or `scripts/upload-3d-model.js` to upload APK, demo videos, screenshots, and Chamber GLB to Sanity.
   - After upload, run the import script `scripts/import-all-landing-content.js` to create/update the `landingPage` document.

5. Tests
   - Add unit tests where missing: at minimum cover `MobileAppShowcase` rendering with Sanity mocks, `lib/sanity.ts` helpers, and `FAQ` rendering with server fallback.
   - Run `npm test`. Capture failures, fix minimal code/tests, and iterate until tests pass.

6. Build
   - Run `npm run build`. Fix TypeScript or Next.js build issues.

7. Verify studio
   - Start Sanity Studio (if tokens available): `cd studio && npm run dev` and confirm `landingPage` document exists and assets are reachable.

8. Repeat Ralph loop
   - If any PRD items in `prd.json` remain incomplete, create tests/fixes and repeat the loop until all PRD stories are `passes: true`.

Prompt Template (use this exact structure for the next agent)
```
You are an autonomous AI agent executing the Sanity Landing Page integration Ralph loop.

Context:
- Repo: MASH-Landing (Next.js 16, React 19, TypeScript)
- Sanity Project ID: gerattrr (use env vars from studio/.env)

Mission:
1. Validate env files exist and have SANITY tokens.
2. Ensure `studio/src/schemaTypes/documents/landingPage.ts` exists and matches landing content requirements.
3. Add missing unit tests for `MobileAppShowcase` and `lib/sanity.ts`.
4. Run `npm test` and fix all failures.
5. Run `npm run build` and fix all build errors.
6. Upload screenshots and assets with provided scripts and import landing content into Sanity.
7. Iterate until `prd.json` stories are all `passes: true`.

Constraints:
- Do not change existing e-commerce schemas.
- Enforce no gradients and use semantic color variables defined in `app/globals.css`.
- Always run tests and build before committing changes.

Deliverables:
- `studio/src/schemaTypes/documents/landingPage.ts` (created/updated)
- Unit tests added/updated: `__tests__/components/MobileAppShowcase.test.tsx`, `__tests__/lib/sanity.test.ts` (as needed)
- Confirmation that `scripts/import-all-landing-content.js` ran successfully and `landingPage` exists in Sanity
- Commit with message summarizing code changes, tests added, and build status

Stop Condition:
- All tests pass and `npm run build` finishes without errors.
```

Notes
- If Sanity write tokens are not available in CI, run only tests and local validation; leave upload/import steps for a developer with write access.
- For color decisions: prefer the existing brand green `22 163 74` and semantic tokens in `app/globals.css`; avoid adding gradient utilities.
