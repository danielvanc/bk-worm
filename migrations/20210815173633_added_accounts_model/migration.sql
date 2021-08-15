-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "providerType" TEXT,
    "providerId" TEXT,
    "providerAccountId" TEXT,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "accessTokenExpires" TIMESTAMP(3),
    "user" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account.refreshToken_unique" ON "Account"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "Account.accessToken_unique" ON "Account"("accessToken");

-- CreateIndex
CREATE INDEX "Account.user_index" ON "Account"("user");

-- AddForeignKey
ALTER TABLE "Account" ADD FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
