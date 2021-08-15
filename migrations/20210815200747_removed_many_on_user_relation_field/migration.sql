/*
  Warnings:

  - You are about to drop the `_User_accounts_many` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_User_sessions_many` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_User_accounts_many" DROP CONSTRAINT "_User_accounts_many_A_fkey";

-- DropForeignKey
ALTER TABLE "_User_accounts_many" DROP CONSTRAINT "_User_accounts_many_B_fkey";

-- DropForeignKey
ALTER TABLE "_User_sessions_many" DROP CONSTRAINT "_User_sessions_many_A_fkey";

-- DropForeignKey
ALTER TABLE "_User_sessions_many" DROP CONSTRAINT "_User_sessions_many_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accounts" TEXT,
ADD COLUMN     "sessions" TEXT;

-- DropTable
DROP TABLE "_User_accounts_many";

-- DropTable
DROP TABLE "_User_sessions_many";

-- CreateIndex
CREATE INDEX "User.accounts_index" ON "User"("accounts");

-- CreateIndex
CREATE INDEX "User.sessions_index" ON "User"("sessions");

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("accounts") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("sessions") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;
