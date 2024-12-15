-- AlterEnum
ALTER TYPE "TipeBarang" ADD VALUE 'ASSET';

-- AlterTable
ALTER TABLE "JournalHeader" ADD COLUMN     "cageId" TEXT,
ADD COLUMN     "siteId" TEXT;

-- AddForeignKey
ALTER TABLE "JournalHeader" ADD CONSTRAINT "JournalHeader_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalHeader" ADD CONSTRAINT "JournalHeader_cageId_fkey" FOREIGN KEY ("cageId") REFERENCES "Cage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
