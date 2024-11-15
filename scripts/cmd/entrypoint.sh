#!/bin/sh
pnpm dlx ts-node prisma/seed.ts
pnpm db:migrate
node dist/main.js