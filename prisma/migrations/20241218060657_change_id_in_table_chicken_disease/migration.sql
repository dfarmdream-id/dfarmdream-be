/*
  Warnings:

  - The primary key for the `ChickenDisease` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `ChickenDisease` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ChickenDisease" DROP CONSTRAINT "ChickenDisease_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ChickenDisease_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ChickenDisease_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "ChickenDisease_id_key" ON "ChickenDisease"("id");
