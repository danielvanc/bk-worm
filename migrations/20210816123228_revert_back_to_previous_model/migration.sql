/*
  Warnings:

  - You are about to drop the column `userId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[providerId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[providerAccountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[createdAt]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropIndex
DROP INDEX "Account.providerId_providerAccountId_unique";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "userId",
ADD COLUMN     "user" TEXT,
ALTER COLUMN "providerType" DROP NOT NULL,
ALTER COLUMN "providerId" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "providerAccountId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "user" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified";

-- CreateTable
CREATE TABLE "_User_accounts_many" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_User_sessions_many" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_User_accounts_many_AB_unique" ON "_User_accounts_many"("A", "B");

-- CreateIndex
CREATE INDEX "_User_accounts_many_B_index" ON "_User_accounts_many"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_User_sessions_many_AB_unique" ON "_User_sessions_many"("A", "B");

-- CreateIndex
CREATE INDEX "_User_sessions_many_B_index" ON "_User_sessions_many"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Account.providerId_unique" ON "Account"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "Account.providerAccountId_unique" ON "Account"("providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Account.createdAt_unique" ON "Account"("createdAt");

-- CreateIndex
CREATE INDEX "Account.user_index" ON "Account"("user");

-- AddForeignKey
ALTER TABLE "Account" ADD FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_accounts_many" ADD FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_accounts_many" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_sessions_many" ADD FOREIGN KEY ("A") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_sessions_many" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
