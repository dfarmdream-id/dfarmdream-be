/*
  Warnings:

  - You are about to drop the column `url` on the `DocumentInvestment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DocumentInvestment" DROP COLUMN "url",
ADD COLUMN     "amount" INTEGER DEFAULT 0,
ADD COLUMN     "cageId" TEXT,
ADD COLUMN     "fileId" TEXT;

-- AddForeignKey
ALTER TABLE "DocumentInvestment" ADD CONSTRAINT "DocumentInvestment_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentInvestment" ADD CONSTRAINT "DocumentInvestment_cageId_fkey" FOREIGN KEY ("cageId") REFERENCES "Cage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
