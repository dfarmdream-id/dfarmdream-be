/*
  Warnings:

  - You are about to drop the `groupakun` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "groupakun";

-- CreateTable
CREATE TABLE "Coa" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "isBalanceSheet" BOOLEAN NOT NULL,
    "isRetainedEarnings" BOOLEAN NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupCoa" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupCoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JournalTemplate" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JournalTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JournalTemplateDetail" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JournalTemplateDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JurnalType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JurnalType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JournalHeader" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "journalTypeId" TEXT,
    "jurnalTypeId" TEXT NOT NULL,
    "debtTotal" INTEGER NOT NULL,
    "creditTotal" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JournalHeader_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coa_id_key" ON "Coa"("id");

-- CreateIndex
CREATE UNIQUE INDEX "GroupCoa_id_key" ON "GroupCoa"("id");

-- CreateIndex
CREATE UNIQUE INDEX "JournalTemplate_id_key" ON "JournalTemplate"("id");

-- CreateIndex
CREATE UNIQUE INDEX "JournalTemplateDetail_id_key" ON "JournalTemplateDetail"("id");

-- CreateIndex
CREATE UNIQUE INDEX "JurnalType_id_key" ON "JurnalType"("id");

-- CreateIndex
CREATE UNIQUE INDEX "JournalHeader_id_key" ON "JournalHeader"("id");

-- AddForeignKey
ALTER TABLE "JournalHeader" ADD CONSTRAINT "JournalHeader_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalHeader" ADD CONSTRAINT "JournalHeader_jurnalTypeId_fkey" FOREIGN KEY ("jurnalTypeId") REFERENCES "JurnalType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
