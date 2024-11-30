-- CreateTable
CREATE TABLE "RelayLog" (
    "id" TEXT NOT NULL,
    "sensorId" TEXT,
    "relayNumber" INTEGER NOT NULL,
    "relayDesc" TEXT,
    "status" INTEGER NOT NULL,
    "humidity" DOUBLE PRECISION,
    "temperature" DOUBLE PRECISION,
    "amonia" DOUBLE PRECISION,
    "ldrValue" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RelayLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RelayLog_id_key" ON "RelayLog"("id");

-- AddForeignKey
ALTER TABLE "RelayLog" ADD CONSTRAINT "RelayLog_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "IotSensor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
