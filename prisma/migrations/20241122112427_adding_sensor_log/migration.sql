-- CreateTable
CREATE TABLE "SensorLog" (
    "id" TEXT NOT NULL,
    "sensorId" TEXT,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "airQuality" DOUBLE PRECISION NOT NULL,
    "amonia" DOUBLE PRECISION NOT NULL,
    "ldrValue" INTEGER NOT NULL,
    "epoch" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SensorLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CctvCamera" (
    "id" TEXT NOT NULL,
    "cageId" TEXT,
    "name" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "description" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CctvCamera_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SensorLog_id_key" ON "SensorLog"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CctvCamera_id_key" ON "CctvCamera"("id");

-- AddForeignKey
ALTER TABLE "SensorLog" ADD CONSTRAINT "SensorLog_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "IotSensor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CctvCamera" ADD CONSTRAINT "CctvCamera_cageId_fkey" FOREIGN KEY ("cageId") REFERENCES "Cage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
