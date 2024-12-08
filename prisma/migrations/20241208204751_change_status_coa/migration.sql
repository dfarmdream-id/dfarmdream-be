/*
  Warnings:

  - Changed the type of `status` on the `GroupCoa` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
-- DROP INDEX "SensorLog_sensorId_key";

-- AlterTable
ALTER TABLE "GroupCoa" DROP COLUMN "status",
ADD COLUMN     "status" INTEGER NOT NULL;
