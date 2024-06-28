-- DropForeignKey
ALTER TABLE "Coments" DROP CONSTRAINT "Coments_forumId_fkey";

-- DropForeignKey
ALTER TABLE "Coments" DROP CONSTRAINT "Coments_usersId_fkey";

-- AlterTable
ALTER TABLE "Coments" ALTER COLUMN "usersId" DROP NOT NULL,
ALTER COLUMN "forumId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Coments" ADD CONSTRAINT "Coments_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coments" ADD CONSTRAINT "Coments_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("id") ON DELETE SET NULL ON UPDATE CASCADE;
