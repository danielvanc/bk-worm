-- DropIndex
DROP INDEX "Account.providerAccountId_unique";

-- CreateIndex
CREATE INDEX "Account.providerId_index" ON "Account"("providerId");

-- CreateIndex
CREATE INDEX "Account.providerAccountId_index" ON "Account"("providerAccountId");
