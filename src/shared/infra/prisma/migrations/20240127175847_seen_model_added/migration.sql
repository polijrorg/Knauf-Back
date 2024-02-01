-- CreateTable
CREATE TABLE "Seen" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seen" BOOLEAN NOT NULL DEFAULT false,
    "contentId" TEXT NOT NULL,

    CONSTRAINT "Seen_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seen_userId_key" ON "Seen"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Seen_contentId_key" ON "Seen"("contentId");

-- AddForeignKey
ALTER TABLE "Seen" ADD CONSTRAINT "Seen_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seen" ADD CONSTRAINT "Seen_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
