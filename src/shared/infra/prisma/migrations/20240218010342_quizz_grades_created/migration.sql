/*
  Warnings:

  - You are about to drop the column `made` on the `Quizz` table. All the data in the column will be lost.
  - You are about to drop the column `timeSpent` on the `Quizz` table. All the data in the column will be lost.
  - You are about to drop the `quizzQuestions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "quizzQuestions" DROP CONSTRAINT "quizzQuestions_quizzId_fkey";

-- AlterTable
ALTER TABLE "Quizz" DROP COLUMN "made",
DROP COLUMN "timeSpent";

-- DropTable
DROP TABLE "quizzQuestions";

-- CreateTable
CREATE TABLE "QuizzQuestions" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answers" JSONB NOT NULL,
    "rightAnswer" TEXT NOT NULL,
    "quizzId" TEXT NOT NULL,

    CONSTRAINT "QuizzQuestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizzGrades" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "timeSpent" INTEGER NOT NULL,
    "record" INTEGER NOT NULL,
    "made" BOOLEAN NOT NULL DEFAULT false,
    "quizzId" TEXT NOT NULL,

    CONSTRAINT "QuizzGrades_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuizzQuestions" ADD CONSTRAINT "QuizzQuestions_quizzId_fkey" FOREIGN KEY ("quizzId") REFERENCES "Quizz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizzGrades" ADD CONSTRAINT "QuizzGrades_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizzGrades" ADD CONSTRAINT "QuizzGrades_quizzId_fkey" FOREIGN KEY ("quizzId") REFERENCES "Quizz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
