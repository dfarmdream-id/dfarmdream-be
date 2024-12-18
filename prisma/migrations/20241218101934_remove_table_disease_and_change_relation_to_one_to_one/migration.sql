/*
  Warnings:

  - You are about to drop the `ChickenDiseaseLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChickenDiseaseLog" DROP CONSTRAINT "ChickenDiseaseLog_chickenDiseaseId_fkey";

-- DropForeignKey
ALTER TABLE "ChickenDiseaseLog" DROP CONSTRAINT "ChickenDiseaseLog_chickenId_fkey";

-- AlterTable
ALTER TABLE "Chicken" ADD COLUMN     "diseaseId" TEXT;

-- DropTable
DROP TABLE "ChickenDiseaseLog";

-- AddForeignKey
ALTER TABLE "Chicken" ADD CONSTRAINT "Chicken_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "ChickenDisease"("id") ON DELETE SET NULL ON UPDATE CASCADE;
