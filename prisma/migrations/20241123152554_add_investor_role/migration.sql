-- CreateTable
CREATE TABLE "InvestorRole" (
    "id" TEXT NOT NULL,
    "investorId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestorRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InvestorRole_id_key" ON "InvestorRole"("id");

-- AddForeignKey
ALTER TABLE "InvestorRole" ADD CONSTRAINT "InvestorRole_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorRole" ADD CONSTRAINT "InvestorRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
