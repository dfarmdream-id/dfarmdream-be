-- DropIndex
-- DROP INDEX "SensorLog_sensorId_key";

-- CreateTable
CREATE TABLE "Goods" (
    "id" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TipeBarang" NOT NULL DEFAULT 'PAKAN',
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Goods_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Goods_id_key" ON "Goods"("id");
