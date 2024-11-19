-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "ChickenStatus" AS ENUM ('ALIVE', 'DEAD');

-- CreateEnum
CREATE TYPE "CashFlowType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "PriceType" AS ENUM ('CHICKEN', 'EGG');

-- CreateEnum
CREATE TYPE "PriceStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('EGG', 'CHICKEN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "username" TEXT NOT NULL,
    "fullName" TEXT,
    "password" TEXT NOT NULL,
    "identityId" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "status" "UserStatus" DEFAULT 'INACTIVE',
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "positionId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "coverId" TEXT,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT,
    "public" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mime" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'S3',

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoleUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Site" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "provinceId" TEXT,
    "cityId" TEXT,
    "districtId" TEXT,
    "subDistrictId" TEXT,
    "address" TEXT,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Province" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "provinceId" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "District" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cityId" TEXT NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubDistrict" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "districtId" TEXT NOT NULL,

    CONSTRAINT "SubDistrict_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "siteId" TEXT,
    "width" INTEGER NOT NULL DEFAULT 0,
    "height" INTEGER NOT NULL DEFAULT 0,
    "capacity" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT DEFAULT 'ACTIVE',

    CONSTRAINT "Cage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CageRack" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cageId" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CageRack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chicken" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "ChickenStatus" DEFAULT 'ALIVE',
    "rackId" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chicken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investor" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL DEFAULT '',
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "identityId" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Investor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentInvestment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "investorId" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentInvestment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashFlow" (
    "id" TEXT NOT NULL,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" "CashFlowType" NOT NULL,
    "siteId" TEXT NOT NULL,
    "cageId" TEXT,
    "remark" TEXT,
    "cashFlowCategoryId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CashFlow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashFlowCategory" (
    "id" TEXT NOT NULL,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CashFlowCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "PriceType" NOT NULL,
    "status" "PriceStatus" DEFAULT 'ACTIVE',
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "rackId" TEXT NOT NULL,
    "cageId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "qty" INTEGER NOT NULL DEFAULT 0,
    "type" "TransactionType" NOT NULL,
    "createdById" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "User_email_username_identityId_idx" ON "User"("email", "username", "identityId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSite_id_key" ON "UserSite"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_id_key" ON "Blog"("id");

-- CreateIndex
CREATE UNIQUE INDEX "File_id_key" ON "File"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Faq_id_key" ON "Faq"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Role_id_key" ON "Role"("id");

-- CreateIndex
CREATE UNIQUE INDEX "RolePermission_id_key" ON "RolePermission"("id");

-- CreateIndex
CREATE UNIQUE INDEX "RoleUser_id_key" ON "RoleUser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_id_key" ON "Permission"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Site_id_key" ON "Site"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Position_id_key" ON "Position"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Cage_id_key" ON "Cage"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CageRack_id_key" ON "CageRack"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Chicken_id_key" ON "Chicken"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Investor_id_key" ON "Investor"("id");

-- CreateIndex
CREATE INDEX "Investor_username_identityId_idx" ON "Investor"("username", "identityId");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentInvestment_id_key" ON "DocumentInvestment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CashFlow_id_key" ON "CashFlow"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSite" ADD CONSTRAINT "UserSite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSite" ADD CONSTRAINT "UserSite_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_coverId_fkey" FOREIGN KEY ("coverId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faq" ADD CONSTRAINT "Faq_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleUser" ADD CONSTRAINT "RoleUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_subDistrictId_fkey" FOREIGN KEY ("subDistrictId") REFERENCES "SubDistrict"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubDistrict" ADD CONSTRAINT "SubDistrict_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cage" ADD CONSTRAINT "Cage_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CageRack" ADD CONSTRAINT "CageRack_cageId_fkey" FOREIGN KEY ("cageId") REFERENCES "Cage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chicken" ADD CONSTRAINT "Chicken_rackId_fkey" FOREIGN KEY ("rackId") REFERENCES "CageRack"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investor" ADD CONSTRAINT "Investor_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentInvestment" ADD CONSTRAINT "DocumentInvestment_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashFlow" ADD CONSTRAINT "CashFlow_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashFlow" ADD CONSTRAINT "CashFlow_cageId_fkey" FOREIGN KEY ("cageId") REFERENCES "Cage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashFlow" ADD CONSTRAINT "CashFlow_cashFlowCategoryId_fkey" FOREIGN KEY ("cashFlowCategoryId") REFERENCES "CashFlowCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashFlow" ADD CONSTRAINT "CashFlow_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_rackId_fkey" FOREIGN KEY ("rackId") REFERENCES "CageRack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_cageId_fkey" FOREIGN KEY ("cageId") REFERENCES "Cage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
