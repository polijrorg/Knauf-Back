/*
  Warnings:

  - Added the required column `image` to the `Statment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Statment" ADD COLUMN     "image" TEXT NOT NULL;
