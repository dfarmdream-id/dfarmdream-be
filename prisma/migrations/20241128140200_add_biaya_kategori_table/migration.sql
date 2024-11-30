/*
  Warnings:

  - You are about to drop the `biaya` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "biaya";

-- CreateTable
CREATE TABLE "KategoriBiaya" (
    "id" TEXT NOT NULL,
    "namaKategori" TEXT NOT NULL,
    "kodeAkun" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KategoriBiaya_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Biaya" (
    "id" TEXT NOT NULL,
    "kategoriId" TEXT NOT NULL,
    "tanggal" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "cageId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "keterangan" TEXT,
    "status" INTEGER NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Biaya_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KategoriBiaya_id_key" ON "KategoriBiaya"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Biaya_id_key" ON "Biaya"("id");

-- AddForeignKey
ALTER TABLE "Biaya" ADD CONSTRAINT "Biaya_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "KategoriBiaya"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Biaya" ADD CONSTRAINT "Biaya_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Biaya" ADD CONSTRAINT "Biaya_cageId_fkey" FOREIGN KEY ("cageId") REFERENCES "Cage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Biaya" ADD CONSTRAINT "Biaya_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
