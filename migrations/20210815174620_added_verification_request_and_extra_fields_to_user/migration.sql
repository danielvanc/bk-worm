-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "image" TEXT;

-- CreateTable
CREATE TABLE "VerificationRequest" (
    "id" TEXT NOT NULL,
    "identifier" TEXT,
    "token" TEXT,
    "expires" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "VerificationRequest.identifier_unique" ON "VerificationRequest"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationRequest.token_unique" ON "VerificationRequest"("token");

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
