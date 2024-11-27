-- AlterTable
ALTER TABLE "DocumentInvestment" ADD COLUMN     "cageId" TEXT,
ADD COLUMN     "fileId" TEXT,
ALTER COLUMN "url" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "DocumentInvestment" ADD CONSTRAINT "DocumentInvestment_cageId_fkey" FOREIGN KEY ("cageId") REFERENCES "Cage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentInvestment" ADD CONSTRAINT "DocumentInvestment_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
