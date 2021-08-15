/*
  Warnings:

  - A unique constraint covering the columns `[providerId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[providerAccountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "expires" TIMESTAMP(3),
    "sessionToken" TEXT,
    "accessToken" TEXT,
    "user" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session.sessionToken_unique" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Session.accessToken_unique" ON "Session"("accessToken");

-- CreateIndex
CREATE INDEX "Session.user_index" ON "Session"("user");

-- CreateIndex
CREATE UNIQUE INDEX "Account.providerId_unique" ON "Account"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "Account.providerAccountId_unique" ON "Account"("providerAccountId");

-- AddForeignKey
ALTER TABLE "Session" ADD FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
