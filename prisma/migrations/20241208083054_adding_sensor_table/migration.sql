/*
  Warnings:

  - You are about to drop the column `airQuality` on the `SensorLog` table. All the data in the column will be lost.
  - You are about to drop the column `amonia` on the `SensorLog` table. All the data in the column will be lost.
  - You are about to drop the column `humidity` on the `SensorLog` table. All the data in the column will be lost.
  - You are about to drop the column `ldrValue` on the `SensorLog` table. All the data in the column will be lost.
  - You are about to drop the column `temperature` on the `SensorLog` table. All the data in the column will be lost.
  - You are about to drop the column `telegramVerification` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `akuncoa` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[code]` on the table `IotSensor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sensorId]` on the table `SensorLog` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `code` on the `Coa` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `code` on the `GroupCoa` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SensorType" AS ENUM ('TEMP', 'HUMIDITY', 'GAS', 'LDR');

-- DropForeignKey
ALTER TABLE "SensorLog" DROP CONSTRAINT "SensorLog_sensorId_fkey";

-- AlterTable
ALTER TABLE "CashFlowCategory" ADD COLUMN     "siteId" TEXT;

-- AlterTable
ALTER TABLE "Coa" DROP COLUMN "code",
ADD COLUMN     "code" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "GroupCoa" DROP COLUMN "code",
ADD COLUMN     "code" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SensorLog" DROP COLUMN "airQuality",
DROP COLUMN "amonia",
DROP COLUMN "humidity",
DROP COLUMN "ldrValue",
DROP COLUMN "temperature",
ADD COLUMN     "iotSensorId" TEXT,
ADD COLUMN     "type" "SensorType" NOT NULL DEFAULT 'HUMIDITY',
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "telegramVerification",
ALTER COLUMN "lastSendNotification" SET DATA TYPE TIMESTAMP(3);

-- DropTable
DROP TABLE IF EXISTS "akuncoa";

-- CreateTable
CREATE TABLE "SensorDevice" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "SensorType" NOT NULL,
    "lastestValue" DOUBLE PRECISION NOT NULL,
    "lastUpdatedAt" BIGINT NOT NULL,

    CONSTRAINT "SensorDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TelegramMesasgeLog" (
    "id" TEXT NOT NULL,
    "sensorId" TEXT,
    "userId" TEXT,
    "message" TEXT,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "airQuality" DOUBLE PRECISION NOT NULL,
    "amonia" DOUBLE PRECISION NOT NULL,
    "ldrValue" INTEGER NOT NULL,
    "epoch" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TelegramMesasgeLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SensorDevice_id_key" ON "SensorDevice"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SensorDevice_code_key" ON "SensorDevice"("code");

-- CreateIndex
CREATE UNIQUE INDEX "TelegramMesasgeLog_id_key" ON "TelegramMesasgeLog"("id");

-- CreateIndex
CREATE UNIQUE INDEX "IotSensor_code_key" ON "IotSensor"("code");

-- CreateIndex
CREATE UNIQUE INDEX "SensorLog_sensorId_key" ON "SensorLog"("sensorId");

-- AddForeignKey
ALTER TABLE "CashFlowCategory" ADD CONSTRAINT "CashFlowCategory_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IotSensor" ADD CONSTRAINT "IotSensor_code_fkey" FOREIGN KEY ("code") REFERENCES "SensorDevice"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SensorLog" ADD CONSTRAINT "SensorLog_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "SensorDevice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TelegramMesasgeLog" ADD CONSTRAINT "TelegramMesasgeLog_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "IotSensor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
