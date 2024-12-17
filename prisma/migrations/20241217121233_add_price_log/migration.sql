-- CreateTable
CREATE TABLE "PriceLog" (
    "id" TEXT NOT NULL,
    "siteId" TEXT,
    "cageId" TEXT,
    "type" "PriceType" NOT NULL,
    "userId" TEXT,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PriceLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PriceLog_id_key" ON "PriceLog"("id");

-- AddForeignKey
ALTER TABLE "PriceLog" ADD CONSTRAINT "PriceLog_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceLog" ADD CONSTRAINT "PriceLog_cageId_fkey" FOREIGN KEY ("cageId") REFERENCES "Cage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceLog" ADD CONSTRAINT "PriceLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
