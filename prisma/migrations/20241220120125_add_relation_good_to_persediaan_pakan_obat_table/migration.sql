/*
  Warnings:

  - You are about to drop the column `namaBarang` on the `PersediaanPakanObat` table. All the data in the column will be lost.
  - You are about to drop the column `tipeBarang` on the `PersediaanPakanObat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PersediaanPakanObat" DROP COLUMN "namaBarang",
DROP COLUMN "tipeBarang",
ADD COLUMN     "goodsId" TEXT;

-- AddForeignKey
ALTER TABLE "PersediaanPakanObat" ADD CONSTRAINT "PersediaanPakanObat_goodsId_fkey" FOREIGN KEY ("goodsId") REFERENCES "Goods"("id") ON DELETE SET NULL ON UPDATE CASCADE;
