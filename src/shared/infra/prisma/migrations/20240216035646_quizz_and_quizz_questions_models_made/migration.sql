-- CreateTable
CREATE TABLE "Quizz" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "questions" TEXT NOT NULL,
    "amountOfQuestions" INTEGER NOT NULL,
    "timeSpent" DOUBLE PRECISION NOT NULL,
    "made" BOOLEAN NOT NULL,
    "moduleId" TEXT NOT NULL,

    CONSTRAINT "Quizz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quizzQuestions" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answers" JSONB NOT NULL,
    "rightAnswer" TEXT NOT NULL,
    "quizzId" TEXT NOT NULL,

    CONSTRAINT "quizzQuestions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Quizz" ADD CONSTRAINT "Quizz_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quizzQuestions" ADD CONSTRAINT "quizzQuestions_quizzId_fkey" FOREIGN KEY ("quizzId") REFERENCES "Quizz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
