-- AlterTable
ALTER TABLE "JournalHeader" ADD COLUMN     "batchId" TEXT;

-- AddForeignKey
ALTER TABLE "JournalHeader" ADD CONSTRAINT "JournalHeader_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
