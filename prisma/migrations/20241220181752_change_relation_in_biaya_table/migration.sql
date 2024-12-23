/*
  Warnings:

  - You are about to drop the column `goodsId` on the `Biaya` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Biaya" DROP CONSTRAINT "Biaya_goodsId_fkey";

-- AlterTable
ALTER TABLE "Biaya" DROP COLUMN "goodsId",
ADD COLUMN     "persediaanPakanObatId" TEXT;

-- AddForeignKey
ALTER TABLE "Biaya" ADD CONSTRAINT "Biaya_persediaanPakanObatId_fkey" FOREIGN KEY ("persediaanPakanObatId") REFERENCES "PersediaanPakanObat"("id") ON DELETE SET NULL ON UPDATE CASCADE;
