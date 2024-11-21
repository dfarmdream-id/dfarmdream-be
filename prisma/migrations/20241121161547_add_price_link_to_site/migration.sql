-- AlterTable
ALTER TABLE "Price" ADD COLUMN     "siteId" TEXT;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;
