Next.js with TypeScript and ESLint
Starter code for a clean Next.js + TypeScript + ESLint project.

Get started

# Install dependencies

yarn install

# Enable husky

yarn husky install

# Start dev server

yarn dev
Features
ESLint and Prettier are integrated with VSCode to fix and format code on save (you need eslint and prettier VSCode plugins)
lint-staged: linting will only happen on staged files, not all file
Latest Husky
TypeScript types are checked before each commit

# Example when commit code

          		FEATURE: "update feature 1.1",
    			INIT: "init feature 1.1",
    			BUILD: "build feature 1.1",
    			CHORE: "chore feature 1.1",
    			CI: "update feature 1.1",
    			DCS: "update feature 1.1",
    			FEAT: "update feature 1.1",
    			FIX: "update feature 1.1",
    			MIGRATION: "update feature 1.1",
    			PERF: "update feature 1.1",
    			REFACTOR: "update feature 1.1",
    			REVERT: "update feature 1.1",
    			STYLE: "update feature 1.1",
    			TEST: "update feature 1.1",
    			TRANSLATION: "update feature 1.1",
    			SECURITY: "update feature 1.1",
    			CHANGESET: "update feature 1.1",
