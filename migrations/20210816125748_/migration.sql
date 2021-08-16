/*
  Warnings:

  - You are about to drop the column `user` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the `_User_accounts_many` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_User_sessions_many` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[providerId,providerAccountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Made the column `providerType` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `providerId` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `providerAccountId` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user` on table `Session` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_user_fkey";

-- DropForeignKey
ALTER TABLE "_User_accounts_many" DROP CONSTRAINT "_User_accounts_many_A_fkey";

-- DropForeignKey
ALTER TABLE "_User_accounts_many" DROP CONSTRAINT "_User_accounts_many_B_fkey";

-- DropForeignKey
ALTER TABLE "_User_sessions_many" DROP CONSTRAINT "_User_sessions_many_A_fkey";

-- DropForeignKey
ALTER TABLE "_User_sessions_many" DROP CONSTRAINT "_User_sessions_many_B_fkey";

-- DropIndex
DROP INDEX "Account.createdAt_unique";

-- DropIndex
DROP INDEX "Account.providerAccountId_unique";

-- DropIndex
DROP INDEX "Account.providerId_unique";

-- DropIndex
DROP INDEX "Account.user_index";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "user",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "providerType" SET NOT NULL,
ALTER COLUMN "providerId" SET NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "providerAccountId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "user" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerified" TIMESTAMP(3);

-- DropTable
DROP TABLE "_User_accounts_many";

-- DropTable
DROP TABLE "_User_sessions_many";

-- CreateIndex
CREATE UNIQUE INDEX "Account.providerId_providerAccountId_unique" ON "Account"("providerId", "providerAccountId");

-- AddForeignKey
ALTER TABLE "Account" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
