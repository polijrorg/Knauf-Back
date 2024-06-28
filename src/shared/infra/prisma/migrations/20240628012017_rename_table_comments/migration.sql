/*
  Warnings:

  - You are about to drop the `Coments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Coments" DROP CONSTRAINT "Coments_forumId_fkey";

-- DropForeignKey
ALTER TABLE "Coments" DROP CONSTRAINT "Coments_usersId_fkey";

-- DropTable
DROP TABLE "Coments";

-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL,
    "usersId" TEXT,
    "text" TEXT NOT NULL,
    "forumId" TEXT,
    "status" "Status" NOT NULL DEFAULT E'pending',

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("id") ON DELETE SET NULL ON UPDATE CASCADE;
