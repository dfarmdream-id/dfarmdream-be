-- CreateTable
CREATE TABLE "ChickenDiseaseLog" (
    "id" TEXT NOT NULL,
    "chickenId" TEXT NOT NULL,
    "chickenDiseaseId" TEXT NOT NULL,
    "status" "ChickenStatus" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChickenDiseaseLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChickenDiseaseLog_id_key" ON "ChickenDiseaseLog"("id");

-- AddForeignKey
ALTER TABLE "ChickenDiseaseLog" ADD CONSTRAINT "ChickenDiseaseLog_chickenId_fkey" FOREIGN KEY ("chickenId") REFERENCES "Chicken"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChickenDiseaseLog" ADD CONSTRAINT "ChickenDiseaseLog_chickenDiseaseId_fkey" FOREIGN KEY ("chickenDiseaseId") REFERENCES "ChickenDisease"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
