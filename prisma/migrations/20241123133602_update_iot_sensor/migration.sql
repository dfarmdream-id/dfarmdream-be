/*
  Warnings:

  - You are about to drop the column `currentThreshold` on the `IotSensor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "IotSensor" DROP COLUMN "currentThreshold",
ADD COLUMN     "currentTemperature" DOUBLE PRECISION;
