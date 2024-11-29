-- CreateTable
CREATE TABLE "PenerimaanModal" (
    "id" TEXT NOT NULL,
    "tanggal" VARCHAR(100) NOT NULL,
    "investorId" TEXT NOT NULL,
    "nominal" INTEGER NOT NULL DEFAULT 0,
    "siteId" TEXT NOT NULL,
    "cageId" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PenerimaanModal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PenerimaanModal_id_key" ON "PenerimaanModal"("id");

-- AddForeignKey
ALTER TABLE "PenerimaanModal" ADD CONSTRAINT "PenerimaanModal_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenerimaanModal" ADD CONSTRAINT "PenerimaanModal_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenerimaanModal" ADD CONSTRAINT "PenerimaanModal_cageId_fkey" FOREIGN KEY ("cageId") REFERENCES "Cage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
