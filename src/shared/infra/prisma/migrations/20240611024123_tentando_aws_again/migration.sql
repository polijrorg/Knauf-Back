/*
  Warnings:

  - You are about to drop the column `image` on the `Statment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Administrator" ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Campaigns" ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Module" ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Quizz" ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Statment" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "image" DROP NOT NULL;
