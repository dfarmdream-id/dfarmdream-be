-- CreateTable
CREATE TABLE "IotSensor" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "cageId" TEXT,
    "tempThreshold" DOUBLE PRECISION NOT NULL,
    "humidityThreshold" DOUBLE PRECISION NOT NULL,
    "amoniaThreshold" DOUBLE PRECISION NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IotSensor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IotSensor_id_key" ON "IotSensor"("id");

-- AddForeignKey
ALTER TABLE "IotSensor" ADD CONSTRAINT "IotSensor_cageId_fkey" FOREIGN KEY ("cageId") REFERENCES "Cage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
