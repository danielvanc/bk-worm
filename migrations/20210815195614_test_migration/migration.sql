/*
  Warnings:

  - You are about to drop the column `user` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_User_accounts_many` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_User_sessions_many` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[providerId,providerAccountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identifier,token]` on the table `VerificationRequest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Made the column `providerType` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `providerId` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `providerAccountId` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Made the column `expires` on table `Session` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sessionToken` on table `Session` required. This step will fail if there are existing NULL values in that column.
  - Made the column `accessToken` on table `Session` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Session` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Session` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `VerificationRequest` table without a default value. This is not possible if the table is not empty.
  - Made the column `identifier` on table `VerificationRequest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `token` on table `VerificationRequest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `expires` on table `VerificationRequest` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_user_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_user_fkey";

-- DropForeignKey
ALTER TABLE "_User_accounts_many" DROP CONSTRAINT "_User_accounts_many_A_fkey";

-- DropForeignKey
ALTER TABLE "_User_accounts_many" DROP CONSTRAINT "_User_accounts_many_B_fkey";

-- DropForeignKey
ALTER TABLE "_User_sessions_many" DROP CONSTRAINT "_User_sessions_many_A_fkey";

-- DropForeignKey
ALTER TABLE "_User_sessions_many" DROP CONSTRAINT "_User_sessions_many_B_fkey";

-- DropIndex
DROP INDEX "Account.accessToken_unique";

-- DropIndex
DROP INDEX "Account.providerAccountId_unique";

-- DropIndex
DROP INDEX "Account.providerId_unique";

-- DropIndex
DROP INDEX "Account.refreshToken_unique";

-- DropIndex
DROP INDEX "Account.user_index";

-- DropIndex
DROP INDEX "Session.user_index";

-- DropIndex
DROP INDEX "VerificationRequest.identifier_unique";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "user",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "providerType" SET NOT NULL,
ALTER COLUMN "providerId" SET NOT NULL,
ALTER COLUMN "providerAccountId" SET NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "user",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "expires" SET NOT NULL,
ALTER COLUMN "sessionToken" SET NOT NULL,
ALTER COLUMN "accessToken" SET NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "age",
DROP COLUMN "createdAt",
DROP COLUMN "location",
DROP COLUMN "password",
DROP COLUMN "title",
DROP COLUMN "updatedAt",
ADD COLUMN     "emailVerified" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "VerificationRequest" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "identifier" SET NOT NULL,
ALTER COLUMN "token" SET NOT NULL,
ALTER COLUMN "expires" SET NOT NULL;

-- DropTable
DROP TABLE "_User_accounts_many";

-- DropTable
DROP TABLE "_User_sessions_many";

-- CreateIndex
CREATE UNIQUE INDEX "Account.providerId_providerAccountId_unique" ON "Account"("providerId", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationRequest.identifier_token_unique" ON "VerificationRequest"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Account" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
