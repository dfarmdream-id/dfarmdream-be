-- CreateEnum
CREATE TYPE "TipeBarang" AS ENUM ('PAKAN', 'OBAT');

-- CreateTable
CREATE TABLE "PersediaanPakanObat" (
    "id" TEXT NOT NULL,
    "namaBarang" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "harga" INTEGER NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL DEFAULT 0,
    "siteId" TEXT NOT NULL,
    "cageId" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "tipeBarang" "TipeBarang" NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PersediaanPakanObat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PersediaanPakanObat_id_key" ON "PersediaanPakanObat"("id");

-- AddForeignKey
ALTER TABLE "PersediaanPakanObat" ADD CONSTRAINT "PersediaanPakanObat_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersediaanPakanObat" ADD CONSTRAINT "PersediaanPakanObat_cageId_fkey" FOREIGN KEY ("cageId") REFERENCES "Cage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
