/*
  Warnings:

  - You are about to drop the column `coments` on the `Forum` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Forum" DROP COLUMN "coments";

-- CreateTable
CREATE TABLE "Coments" (
    "id" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "forumId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT E'pending',

    CONSTRAINT "Coments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Coments" ADD CONSTRAINT "Coments_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coments" ADD CONSTRAINT "Coments_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
