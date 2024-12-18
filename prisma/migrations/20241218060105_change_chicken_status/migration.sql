-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ChickenStatus" ADD VALUE 'ALIVE_IN_SICK';
ALTER TYPE "ChickenStatus" ADD VALUE 'DEAD_DUE_TO_ILLNESS';

-- AlterTable
ALTER TABLE "DocumentInvestment" ADD COLUMN     "date" TIMESTAMP(3),
ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "Price" ADD COLUMN     "date" TIMESTAMP(3);
