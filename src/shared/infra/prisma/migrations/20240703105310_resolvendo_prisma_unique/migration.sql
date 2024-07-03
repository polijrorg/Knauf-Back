/*
  Warnings:

  - A unique constraint covering the columns `[userId,contentId]` on the table `Seen` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Seen_contentId_key";

-- DropIndex
DROP INDEX "Seen_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Seen_userId_contentId_key" ON "Seen"("userId", "contentId");
