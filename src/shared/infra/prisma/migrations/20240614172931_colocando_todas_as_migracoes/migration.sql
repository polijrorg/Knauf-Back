-- CreateEnum
CREATE TYPE "Language" AS ENUM ('portuguese', 'english', 'spanish');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('approved', 'notApproved', 'pending');

-- CreateTable
CREATE TABLE "Administrator" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT,

    CONSTRAINT "Administrator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "score" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "language" "Language" NOT NULL DEFAULT E'portuguese',
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "score" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "moduleId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaigns" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "language" "Language" NOT NULL DEFAULT E'portuguese',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT,

    CONSTRAINT "Campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeenCampaigns" (
    "id" TEXT NOT NULL,
    "seen" BOOLEAN NOT NULL DEFAULT false,
    "campaignsId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SeenCampaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "language" "Language" NOT NULL DEFAULT E'portuguese',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "linkVideo" TEXT,
    "linkAudio" TEXT,
    "image" TEXT,
    "score" INTEGER NOT NULL DEFAULT 0,
    "language" "Language" NOT NULL DEFAULT E'portuguese',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seen" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "seen" BOOLEAN NOT NULL DEFAULT false,
    "contentId" TEXT NOT NULL,

    CONSTRAINT "Seen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Forum" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "coments" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT E'pending',
    "usersId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "language" "Language" NOT NULL DEFAULT E'portuguese',

    CONSTRAINT "Forum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleGrades" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "grade" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "ModuleGrades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quizz" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "amountOfQuestions" INTEGER NOT NULL,
    "timeLimit" INTEGER NOT NULL DEFAULT 0,
    "grade" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "language" "Language" NOT NULL DEFAULT E'portuguese',
    "moduleId" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Quizz_pkey" PRIMARY KEY ("id")
);

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
    "timeSpent" INTEGER,
    "record" INTEGER,
    "seen" BOOLEAN NOT NULL DEFAULT false,
    "quizzId" TEXT NOT NULL,

    CONSTRAINT "QuizzGrades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statment" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "language" "Language" NOT NULL DEFAULT E'portuguese',
    "title" TEXT NOT NULL DEFAULT E'Statment title',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT NOT NULL,

    CONSTRAINT "Statment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seen_userId_key" ON "Seen"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Seen_contentId_key" ON "Seen"("contentId");

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaigns" ADD CONSTRAINT "Campaigns_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeenCampaigns" ADD CONSTRAINT "SeenCampaigns_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeenCampaigns" ADD CONSTRAINT "SeenCampaigns_campaignsId_fkey" FOREIGN KEY ("campaignsId") REFERENCES "Campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seen" ADD CONSTRAINT "Seen_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seen" ADD CONSTRAINT "Seen_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forum" ADD CONSTRAINT "Forum_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forum" ADD CONSTRAINT "Forum_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleGrades" ADD CONSTRAINT "ModuleGrades_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleGrades" ADD CONSTRAINT "ModuleGrades_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quizz" ADD CONSTRAINT "Quizz_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizzQuestions" ADD CONSTRAINT "QuizzQuestions_quizzId_fkey" FOREIGN KEY ("quizzId") REFERENCES "Quizz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizzGrades" ADD CONSTRAINT "QuizzGrades_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizzGrades" ADD CONSTRAINT "QuizzGrades_quizzId_fkey" FOREIGN KEY ("quizzId") REFERENCES "Quizz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
