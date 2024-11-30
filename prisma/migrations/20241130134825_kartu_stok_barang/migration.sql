-- CreateTable
CREATE TABLE "KartuStokBarang" (
    "id" TEXT NOT NULL,
    "tanggal" TEXT NOT NULL,
    "barangId" TEXT NOT NULL,
    "qtyAsal" INTEGER NOT NULL,
    "qtyIn" INTEGER NOT NULL,
    "qtyOut" INTEGER NOT NULL,
    "qtyAkhir" INTEGER NOT NULL,
    "karyawanId" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "cageId" TEXT NOT NULL,
    "keterangan" TEXT,
    "status" INTEGER DEFAULT 1,
    "harga" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KartuStokBarang_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KartuStokBarang_id_key" ON "KartuStokBarang"("id");

-- AddForeignKey
ALTER TABLE "KartuStokBarang" ADD CONSTRAINT "KartuStokBarang_barangId_fkey" FOREIGN KEY ("barangId") REFERENCES "PersediaanPakanObat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KartuStokBarang" ADD CONSTRAINT "KartuStokBarang_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KartuStokBarang" ADD CONSTRAINT "KartuStokBarang_cageId_fkey" FOREIGN KEY ("cageId") REFERENCES "Cage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KartuStokBarang" ADD CONSTRAINT "KartuStokBarang_karyawanId_fkey" FOREIGN KEY ("karyawanId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
