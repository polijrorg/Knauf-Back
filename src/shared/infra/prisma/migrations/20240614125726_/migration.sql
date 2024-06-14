-- AlterTable
ALTER TABLE "Administrator" ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Campaigns" ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Module" ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Quizz" ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "image" DROP NOT NULL;
