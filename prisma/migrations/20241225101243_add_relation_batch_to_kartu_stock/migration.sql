-- AlterTable
ALTER TABLE "KartuStokBarang" ADD COLUMN     "batchId" TEXT;

-- AddForeignKey
ALTER TABLE "KartuStokBarang" ADD CONSTRAINT "KartuStokBarang_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
