-- DropForeignKey
ALTER TABLE "Forum" DROP CONSTRAINT "Forum_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "Forum" DROP CONSTRAINT "Forum_usersId_fkey";

-- AddForeignKey
ALTER TABLE "Forum" ADD CONSTRAINT "Forum_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forum" ADD CONSTRAINT "Forum_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;
