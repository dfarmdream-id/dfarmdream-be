/*
  Warnings:

  - Added the required column `groupId` to the `Coa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coa" ADD COLUMN     "groupId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Coa" ADD CONSTRAINT "Coa_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "GroupCoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
