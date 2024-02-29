/*
  Warnings:

  - You are about to drop the column `questions` on the `Quizz` table. All the data in the column will be lost.
  - You are about to drop the column `made` on the `QuizzGrades` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Quizz" DROP COLUMN "questions";

-- AlterTable
ALTER TABLE "QuizzGrades" DROP COLUMN "made",
ADD COLUMN     "seen" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "timeSpent" DROP NOT NULL,
ALTER COLUMN "record" DROP NOT NULL;
