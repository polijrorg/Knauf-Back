/*
  Warnings:

  - Added the required column `userId` to the `SeenCampaigns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SeenCampaigns" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SeenCampaigns" ADD CONSTRAINT "SeenCampaigns_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
