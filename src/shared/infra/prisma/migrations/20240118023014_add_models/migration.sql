/*
  Warnings:

  - You are about to drop the column `cpf` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Users` table. All the data in the column will be lost.
  - Added the required column `active` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Users_name_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "cpf",
DROP COLUMN "phone",
DROP COLUMN "updated_at",
ADD COLUMN     "active" BOOLEAN NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "score" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Module" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);
