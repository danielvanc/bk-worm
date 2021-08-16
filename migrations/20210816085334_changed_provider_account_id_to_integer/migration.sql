/*
  Warnings:

  - You are about to drop the column `userId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `VerificationRequest` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `VerificationRequest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[refreshToken]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accessToken]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identifier]` on the table `VerificationRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropIndex
DROP INDEX "Account.providerId_providerAccountId_unique";

-- DropIndex
DROP INDEX "VerificationRequest.identifier_token_unique";

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
ALTER TABLE "Session" DROP COLUMN "userId",
ADD COLUMN     "user" TEXT,
ALTER COLUMN "expires" DROP NOT NULL,
ALTER COLUMN "sessionToken" DROP NOT NULL,
ALTER COLUMN "accessToken" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
ADD COLUMN     "accounts" TEXT,
ADD COLUMN     "age" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3),
ADD COLUMN     "location" TEXT,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "sessions" TEXT,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "VerificationRequest" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "identifier" DROP NOT NULL,
ALTER COLUMN "token" DROP NOT NULL,
ALTER COLUMN "expires" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account.refreshToken_unique" ON "Account"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "Account.accessToken_unique" ON "Account"("accessToken");

-- CreateIndex
CREATE INDEX "Account.user_index" ON "Account"("user");

-- CreateIndex
CREATE INDEX "Session.user_index" ON "Session"("user");

-- CreateIndex
CREATE INDEX "User.accounts_index" ON "User"("accounts");

-- CreateIndex
CREATE INDEX "User.sessions_index" ON "User"("sessions");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationRequest.identifier_unique" ON "VerificationRequest"("identifier");

-- AddForeignKey
ALTER TABLE "Account" ADD FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("accounts") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("sessions") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;
