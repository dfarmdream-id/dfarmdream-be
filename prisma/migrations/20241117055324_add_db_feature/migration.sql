-- CreateEnum
CREATE TYPE "ChickenStatus" AS ENUM ('ALIVE', 'DEAD');

-- CreateTable
CREATE TABLE "ChickenCage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "siteId" TEXT,
    "width" INTEGER NOT NULL DEFAULT 0,
    "height" INTEGER NOT NULL DEFAULT 0,
    "capacity" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT DEFAULT 'ACTIVE',

    CONSTRAINT "ChickenCage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChickenCageRack" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cageId" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChickenCageRack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chicken" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "ChickenStatus" DEFAULT 'ALIVE',
    "rackId" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chicken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "identityId" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Investor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentInvestment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentInvestment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChickenCage_id_key" ON "ChickenCage"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ChickenCageRack_id_key" ON "ChickenCageRack"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Chicken_id_key" ON "Chicken"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Investor_id_key" ON "Investor"("id");

-- CreateIndex
CREATE INDEX "Investor_username_identityId_idx" ON "Investor"("username", "identityId");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentInvestment_id_key" ON "DocumentInvestment"("id");

-- AddForeignKey
ALTER TABLE "ChickenCage" ADD CONSTRAINT "ChickenCage_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChickenCageRack" ADD CONSTRAINT "ChickenCageRack_cageId_fkey" FOREIGN KEY ("cageId") REFERENCES "ChickenCage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chicken" ADD CONSTRAINT "Chicken_rackId_fkey" FOREIGN KEY ("rackId") REFERENCES "ChickenCageRack"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investor" ADD CONSTRAINT "Investor_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
