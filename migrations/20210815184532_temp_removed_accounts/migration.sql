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

-- DropTable
DROP TABLE "_User_accounts_many";

-- DropTable
DROP TABLE "_User_sessions_many";
