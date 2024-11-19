-- CreateEnum
CREATE TYPE "WarehouseTransactionType" AS ENUM ('IN', 'OUT');

-- CreateTable
CREATE TABLE "WarehouseTransaction" (
    "id" TEXT NOT NULL,
    "siteId" TEXT,
    "qty" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "type" "WarehouseTransactionType" NOT NULL DEFAULT 'IN',
    "createdById" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WarehouseTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WarehouseTransaction_id_key" ON "WarehouseTransaction"("id");

-- AddForeignKey
ALTER TABLE "WarehouseTransaction" ADD CONSTRAINT "WarehouseTransaction_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseTransaction" ADD CONSTRAINT "WarehouseTransaction_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
