/*
  Warnings:

  - A unique constraint covering the columns `[providerId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[providerAccountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Account.providerAccountId_index";

-- DropIndex
DROP INDEX "Account.providerId_index";

-- CreateIndex
CREATE UNIQUE INDEX "Account.providerId_unique" ON "Account"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "Account.providerAccountId_unique" ON "Account"("providerAccountId");
