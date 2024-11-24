-- AlterTable
ALTER TABLE "IotSensor" ADD COLUMN     "currentAirQuality" DOUBLE PRECISION,
ADD COLUMN     "currentAmonia" DOUBLE PRECISION,
ADD COLUMN     "currentHumidty" DOUBLE PRECISION,
ADD COLUMN     "currentThreshold" DOUBLE PRECISION,
ADD COLUMN     "lampStatus" DOUBLE PRECISION,
ALTER COLUMN "amoniaThreshold" DROP NOT NULL;
