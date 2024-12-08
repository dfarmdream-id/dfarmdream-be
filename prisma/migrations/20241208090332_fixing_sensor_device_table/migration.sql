-- DropForeignKey
ALTER TABLE "IotSensor" DROP CONSTRAINT "IotSensor_code_fkey";

-- AlterTable
ALTER TABLE "SensorDevice" ADD COLUMN     "deviceId" TEXT;

-- AddForeignKey
ALTER TABLE "SensorDevice" ADD CONSTRAINT "SensorDevice_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "IotSensor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
