-- AlterTable
ALTER TABLE "Biaya" ADD COLUMN     "batchId" TEXT;

-- AddForeignKey
ALTER TABLE "Biaya" ADD CONSTRAINT "Biaya_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
