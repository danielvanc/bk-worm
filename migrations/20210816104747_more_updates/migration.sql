/*
  Warnings:

  - A unique constraint covering the columns `[providerId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[providerAccountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[createdAt]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[createdAt]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Account.providerId_unique" ON "Account"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "Account.providerAccountId_unique" ON "Account"("providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Account.createdAt_unique" ON "Account"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Session.createdAt_unique" ON "Session"("createdAt");
