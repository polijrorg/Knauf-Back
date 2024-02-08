/*
  Warnings:

  - You are about to drop the column `created_at` on the `Seen` table. All the data in the column will be lost.
  - You are about to drop the column `seen2` on the `Seen` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Seen" DROP CONSTRAINT "Seen_contentId_fkey";

-- DropForeignKey
ALTER TABLE "Seen" DROP CONSTRAINT "Seen_userId_fkey";

-- AlterTable
ALTER TABLE "Seen" DROP COLUMN "created_at",
DROP COLUMN "seen2",
ADD COLUMN     "seen" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Seen" ADD CONSTRAINT "Seen_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seen" ADD CONSTRAINT "Seen_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
