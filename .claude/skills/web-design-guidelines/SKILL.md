---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices".
license: MIT (ver LICENSE)
metadata:
  author: vercel
  version: "1.0.0"
  argument-hint: <file-or-pattern>
  modificado: "Lê as regras de uma cópia local fixada em vez de baixar a cada uso (ver ATTRIBUTION.md)"
---

# Web Interface Guidelines

Review files for compliance with Web Interface Guidelines.

## How It Works

1. Read the guidelines from `references/command.md` (local, pinned copy)
2. Read the specified files (or prompt user for files/pattern)
3. Check against all rules in the guidelines
4. Output findings in the terse `file:line` format

## Guidelines Source

The rules live in `references/command.md`, a pinned copy of
`https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`
(commit `e3d624b`, 2026-08-17). Do **not** fetch the remote file during a review: a local copy keeps
reviews reproducible and avoids loading instructions from the internet at run time.

To refresh the copy, follow `docs/EVOLUIR-TEMPLATE.md` (only when a human asks).

## Usage

When a user provides a file or pattern argument:
1. Read `references/command.md`
2. Read the specified files
3. Apply all rules from the guidelines
4. Output findings using the format specified in the guidelines

If no files specified, ask the user which files to review.
