-- CreateEnum
CREATE TYPE "WarehouseTransactionCategoryEnum" AS ENUM ('EGG', 'CHICKEN');

-- AlterTable
ALTER TABLE "WarehouseTransaction" ADD COLUMN     "category" "WarehouseTransactionCategoryEnum" DEFAULT 'EGG',
ADD COLUMN     "priceId" TEXT;

-- AddForeignKey
ALTER TABLE "WarehouseTransaction" ADD CONSTRAINT "WarehouseTransaction_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "Price"("id") ON DELETE SET NULL ON UPDATE CASCADE;
