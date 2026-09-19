# Agent Instructions - MASH Landing Page

Welcome to the MASH Landing Page repository.

## Project Guidelines
- Framework: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4
- Build command: `npm run build` (runs `next build --webpack` for Node 24 support)
- Test command: `npx jest` (all 41 test suites must pass)
- No emojis anywhere in code, comments, or UI text
- No gradients; use solid semantic tokens from CSS variables
- Use `@/components/ui/button` and `@/components/ui/card` exclusively

<!-- antislop:start -->
## antislop
For UI, copy, people, mobile layout, or code comments work, read `DESIGN.md` for direction, `antislop.md` (core) as the filter, and then the skill for the task:
- UI / visual: `.agents/skills/antislop-ui/SKILL.md`
- Copy & text: `.agents/skills/antislop-copywriting/SKILL.md`
- People: `.agents/skills/antislop-human/SKILL.md`
- Mobile / responsive: `.agents/skills/antislop-layoutmobile/SKILL.md`
- Code comments: `.agents/skills/antislop-code/SKILL.md`
Before starting, ask the user when antislop applies: during the work, or after it is done.
<!-- antislop:end -->
