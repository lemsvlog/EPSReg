# VIZKOR V2 — Full Reviewer Branch

This folder is the safe V2 test app for the existing EPSReg/VIZKOR project.

## Open
Use `/v2/` (or `/v2/index.html`) on a branch/deployment preview.

## What V2 currently unifies
- `noun.js`: categorized Book 1 + Book 2 vocabulary, English, Tagalog, page and book metadata
- `verb.js`: verb master list including present/past/future forms
- `adjective.js`: adjective master list including present/past/future forms
- `adverb.html`: parsable adverb entries
- `greetings.html`: parsable greeting/expression entries
- `sentence.html`: parsable sentence entries
- `keyword.js`: parsable EPS keyword entries

V2 deduplicates the merged learning bank by Korean + English.

## Features
- Responsive VIZKOR dashboard
- Book 1 / Book 2 vocabulary filter
- POS filters
- Korean search, English search and Tagalog search
- Korean browser TTS (`ko-KR`)
- Flashcards
- Verb/adjective conjugation display when available
- Four-choice quiz
- Listening quiz
- Native Korean numbers
- Sino-Korean numbers
- Time practice
- Counter practice
- Automatic wrong-answer bank
- Favorites
- Local accuracy/mastery tracking
- Dark mode
- Original-module links for side-by-side checking

## Safety
The existing root site is untouched. V2 lives only under `/v2/` on the V2 branch until it is reviewed and deliberately merged.

## Next production layer
For real student accounts across devices, Google sign-in, teacher-admin editing, and cloud-synced scores, add a backend (Firebase/Supabase or equivalent). Browser-only localStorage is intentionally not presented as secure authentication.
