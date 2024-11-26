/*
  Warnings:

  - You are about to drop the column `rackId` on the `WarehouseTransaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "WarehouseTransaction" DROP CONSTRAINT "WarehouseTransaction_rackId_fkey";

-- AlterTable
ALTER TABLE "WarehouseTransaction" DROP COLUMN "rackId";

-- CreateTable
CREATE TABLE "WarehouseTransactionItems" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "qty" INTEGER NOT NULL DEFAULT 0,
    "rackId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "warehouseTransactionId" TEXT NOT NULL,

    CONSTRAINT "WarehouseTransactionItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WarehouseTransactionItems" ADD CONSTRAINT "WarehouseTransactionItems_warehouseTransactionId_fkey" FOREIGN KEY ("warehouseTransactionId") REFERENCES "WarehouseTransaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseTransactionItems" ADD CONSTRAINT "WarehouseTransactionItems_rackId_fkey" FOREIGN KEY ("rackId") REFERENCES "CageRack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseTransactionItems" ADD CONSTRAINT "WarehouseTransactionItems_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
