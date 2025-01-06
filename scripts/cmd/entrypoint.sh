#!/bin/sh
pnpm dlx ts-node prisma/seed.ts
pnpm db:migrate
TZ=Asia/Jakarta node dist/main.js