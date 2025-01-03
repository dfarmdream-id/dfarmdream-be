-- CreateTable
CREATE TABLE "SensorLogTenMinutes" (
    "id" TEXT NOT NULL,
    "sensorId" TEXT,
    "type" "SensorType" NOT NULL DEFAULT 'HUMIDITY',
    "averageValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "epoch" BIGINT NOT NULL,
    "interval" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "iotSensorId" TEXT,

    CONSTRAINT "SensorLogTenMinutes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SensorLogDaily" (
    "id" TEXT NOT NULL,
    "sensorId" TEXT,
    "type" "SensorType" NOT NULL DEFAULT 'HUMIDITY',
    "averageValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "epoch" BIGINT NOT NULL,
    "interval" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "iotSensorId" TEXT,

    CONSTRAINT "SensorLogDaily_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SensorLogTenMinutes_id_key" ON "SensorLogTenMinutes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SensorLogDaily_id_key" ON "SensorLogDaily"("id");

-- AddForeignKey
ALTER TABLE "SensorLogTenMinutes" ADD CONSTRAINT "SensorLogTenMinutes_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "SensorDevice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SensorLogDaily" ADD CONSTRAINT "SensorLogDaily_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "SensorDevice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
