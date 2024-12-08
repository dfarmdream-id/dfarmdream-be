/*
  Warnings:

  - Added the required column `code` to the `JournalType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JournalType" ADD COLUMN     "code" INTEGER NOT NULL;
