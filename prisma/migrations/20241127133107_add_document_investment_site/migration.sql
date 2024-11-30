-- AlterTable
ALTER TABLE "DocumentInvestment" ADD COLUMN     "siteId" TEXT;

-- AddForeignKey
ALTER TABLE "DocumentInvestment" ADD CONSTRAINT "DocumentInvestment_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;
