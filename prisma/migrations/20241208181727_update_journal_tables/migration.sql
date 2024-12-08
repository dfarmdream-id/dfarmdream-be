/*
  Warnings:

  - You are about to drop the column `journalTypeId` on the `JournalHeader` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `JournalTemplateDetail` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `JournalTemplateDetail` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Coa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `JournalTemplate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `JournalHeader` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jurnalTypeId` to the `JournalTemplate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coaCode` to the `JournalTemplateDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jurnalTemplateCode` to the `JournalTemplateDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeLedger` to the `JournalTemplateDetail` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LedgerEnum" AS ENUM ('DEBIT', 'CREDIT');

-- AlterTable
ALTER TABLE "CashFlowCategory" ADD COLUMN     "siteId" TEXT;

-- AlterTable
ALTER TABLE "JournalHeader" DROP COLUMN "journalTypeId",
ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "JournalTemplate" ADD COLUMN     "jurnalTypeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "JournalTemplateDetail" DROP COLUMN "code",
DROP COLUMN "name",
ADD COLUMN     "coaCode" TEXT NOT NULL,
ADD COLUMN     "jurnalTemplateCode" TEXT NOT NULL,
ADD COLUMN     "typeLedger" "LedgerEnum" NOT NULL;

-- CreateTable
CREATE TABLE "JournalDetail" (
    "id" TEXT NOT NULL,
    "journalHeaderId" TEXT NOT NULL,
    "coaCode" TEXT NOT NULL,
    "debit" INTEGER NOT NULL,
    "credit" INTEGER NOT NULL,
    "note" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JournalDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JournalDetail_id_key" ON "JournalDetail"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Coa_code_key" ON "Coa"("code");

-- CreateIndex
CREATE UNIQUE INDEX "JournalTemplate_code_key" ON "JournalTemplate"("code");

-- AddForeignKey
ALTER TABLE "CashFlowCategory" ADD CONSTRAINT "CashFlowCategory_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalTemplate" ADD CONSTRAINT "JournalTemplate_jurnalTypeId_fkey" FOREIGN KEY ("jurnalTypeId") REFERENCES "JournalType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalTemplateDetail" ADD CONSTRAINT "JournalTemplateDetail_jurnalTemplateCode_fkey" FOREIGN KEY ("jurnalTemplateCode") REFERENCES "JournalTemplate"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalTemplateDetail" ADD CONSTRAINT "JournalTemplateDetail_coaCode_fkey" FOREIGN KEY ("coaCode") REFERENCES "Coa"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalDetail" ADD CONSTRAINT "JournalDetail_journalHeaderId_fkey" FOREIGN KEY ("journalHeaderId") REFERENCES "JournalHeader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalDetail" ADD CONSTRAINT "JournalDetail_coaCode_fkey" FOREIGN KEY ("coaCode") REFERENCES "Coa"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
