-- AlterTable
ALTER TABLE "Position" ADD COLUMN     "checkinTime" TIME,
ADD COLUMN     "checkoutTime" TIME;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "photoProfile" TEXT;

-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "tanggal" DATE,
    "jamMasuk" TIME,
    "jamKeluar" TIME,
    "timestampMasuk" TIMESTAMP,
    "timestampKeluar" TIMESTAMP,
    "status" INTEGER DEFAULT 0,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "akuncoa" (
    "kodeakun" TEXT NOT NULL,
    "namaakun" TEXT NOT NULL,
    "kodegroup" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "isneraca" INTEGER NOT NULL,
    "islabatahan" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "akuncoa_pkey" PRIMARY KEY ("kodeakun")
);

-- CreateTable
CREATE TABLE "biaya" (
    "kodekategoribiaya" TEXT NOT NULL,
    "kodebiaya" TEXT NOT NULL,
    "biaya" MONEY NOT NULL,
    "tanggal" TIMESTAMP NOT NULL,
    "idlokasi" TEXT NOT NULL,
    "idkandang" TEXT NOT NULL,
    "idkaryawan" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "biaya_pkey" PRIMARY KEY ("kodekategoribiaya")
);

-- CreateTable
CREATE TABLE "groupakun" (
    "kodegroup" INTEGER NOT NULL,
    "namagroup" TEXT NOT NULL,
    "statusgroup" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "groupakun_pkey" PRIMARY KEY ("kodegroup")
);

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_id_key" ON "Attendance"("id");

-- CreateIndex
CREATE UNIQUE INDEX "akuncoa_kodeakun_key" ON "akuncoa"("kodeakun");

-- CreateIndex
CREATE UNIQUE INDEX "groupakun_kodegroup_key" ON "groupakun"("kodegroup");
