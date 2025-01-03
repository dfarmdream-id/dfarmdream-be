-- AlterTable
ALTER TABLE "WarehouseTransaction" ADD COLUMN     "qtyCrack" INTEGER DEFAULT 0;

-- AddForeignKey
ALTER TABLE "TelegramMesasgeLog" ADD CONSTRAINT "TelegramMesasgeLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;