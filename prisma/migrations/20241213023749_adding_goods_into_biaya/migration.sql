-- AlterTable
ALTER TABLE "Biaya" ADD COLUMN     "goodsId" TEXT;

-- AddForeignKey
ALTER TABLE "Biaya" ADD CONSTRAINT "Biaya_goodsId_fkey" FOREIGN KEY ("goodsId") REFERENCES "Goods"("id") ON DELETE SET NULL ON UPDATE CASCADE;
