/*
  Warnings:

  - You are about to drop the column `accounts` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sessions` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_accounts_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_sessions_fkey";

-- DropIndex
DROP INDEX "User.accounts_index";

-- DropIndex
DROP INDEX "User.sessions_index";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "accounts",
DROP COLUMN "createdAt",
DROP COLUMN "sessions",
DROP COLUMN "updatedAt";

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

-- AddForeignKey
ALTER TABLE "_User_accounts_many" ADD FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_accounts_many" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_sessions_many" ADD FOREIGN KEY ("A") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_sessions_many" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
