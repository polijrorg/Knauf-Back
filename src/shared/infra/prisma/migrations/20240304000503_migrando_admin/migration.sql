-- AlterTable
ALTER TABLE "Statment" ALTER COLUMN "title" SET DEFAULT E'Statment title';

-- CreateTable
CREATE TABLE "Administrator" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Administrator_pkey" PRIMARY KEY ("id")
);
