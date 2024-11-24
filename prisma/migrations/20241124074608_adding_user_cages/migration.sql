-- CreateTable
CREATE TABLE "UserCage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cageId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserCage_id_key" ON "UserCage"("id");

-- AddForeignKey
ALTER TABLE "UserCage" ADD CONSTRAINT "UserCage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCage" ADD CONSTRAINT "UserCage_cageId_fkey" FOREIGN KEY ("cageId") REFERENCES "Cage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
