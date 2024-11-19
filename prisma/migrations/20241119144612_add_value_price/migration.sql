-- AlterEnum
ALTER TYPE "ChickenStatus" ADD VALUE 'SPENT';

-- AlterTable
ALTER TABLE "Price" ADD COLUMN     "value" INTEGER NOT NULL DEFAULT 0;
