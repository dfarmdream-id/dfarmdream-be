-- DropIndex
DROP INDEX "SensorLog_sensorId_key";

-- AlterTable
ALTER TABLE "JournalHeader" ALTER COLUMN "code" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "WarehouseTransaction" ADD COLUMN     "CashierDeliveryAt" TIMESTAMPTZ;
