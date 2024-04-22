/*
  Warnings:

  - The `language` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Language" AS ENUM ('portuguese', 'english', 'spanish');

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "language",
ADD COLUMN     "language" "Language" NOT NULL DEFAULT E'portuguese';
