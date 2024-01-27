-- CreateTable
CREATE TABLE "Statment" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Statment_pkey" PRIMARY KEY ("id")
);
