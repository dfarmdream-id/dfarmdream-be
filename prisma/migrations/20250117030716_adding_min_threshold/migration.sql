-- AlterTable
ALTER TABLE "IotSensor" ADD COLUMN     "amoniaMinThreshold" DOUBLE PRECISION,
ADD COLUMN     "humidityMinThreshold" DOUBLE PRECISION,
ADD COLUMN     "tempMinThreshold" DOUBLE PRECISION;
