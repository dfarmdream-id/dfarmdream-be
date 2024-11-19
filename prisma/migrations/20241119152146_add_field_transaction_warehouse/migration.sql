/*
  Warnings:

  - Added the required column `cageId` to the `WarehouseTransaction` table without a default value. This is not possible if the table is not empty.
  - The required column `code` was added to the `WarehouseTransaction` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `rackId` to the `WarehouseTransaction` table without a default value. This is not possible if the table is not empty.
  - Made the column `siteId` on table `WarehouseTransaction` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "WarehouseTransaction" DROP CONSTRAINT "WarehouseTransaction_siteId_fkey";

-- AlterTable
ALTER TABLE "WarehouseTransaction" ADD COLUMN     "cageId" TEXT NOT NULL,
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "rackId" TEXT NOT NULL,
ALTER COLUMN "siteId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "WarehouseTransaction" ADD CONSTRAINT "WarehouseTransaction_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseTransaction" ADD CONSTRAINT "WarehouseTransaction_cageId_fkey" FOREIGN KEY ("cageId") REFERENCES "Cage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseTransaction" ADD CONSTRAINT "WarehouseTransaction_rackId_fkey" FOREIGN KEY ("rackId") REFERENCES "CageRack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
