/*
  Warnings:

  - You are about to drop the column `seen` on the `Seen` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Seen" DROP COLUMN "seen",
ADD COLUMN     "seen2" BOOLEAN NOT NULL DEFAULT false;
