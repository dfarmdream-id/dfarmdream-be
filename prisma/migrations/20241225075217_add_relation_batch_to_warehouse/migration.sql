-- AlterTable
ALTER TABLE "WarehouseTransaction" ADD COLUMN     "batchId" TEXT;

-- AddForeignKey
ALTER TABLE "WarehouseTransaction" ADD CONSTRAINT "WarehouseTransaction_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
