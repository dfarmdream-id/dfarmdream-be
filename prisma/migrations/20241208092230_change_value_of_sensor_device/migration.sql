/*
  Warnings:

  - Added the required column `updatedAt` to the `SensorDevice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SensorDevice" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "lastestValue" DROP NOT NULL,
ALTER COLUMN "lastestValue" SET DEFAULT 0,
ALTER COLUMN "lastUpdatedAt" DROP NOT NULL,
ALTER COLUMN "lastUpdatedAt" SET DEFAULT 0;
