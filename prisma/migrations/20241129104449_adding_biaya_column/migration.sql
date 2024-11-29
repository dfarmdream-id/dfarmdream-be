/*
  Warnings:

  - Added the required column `biaya` to the `Biaya` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Biaya" ADD COLUMN     "biaya" INTEGER NOT NULL;
