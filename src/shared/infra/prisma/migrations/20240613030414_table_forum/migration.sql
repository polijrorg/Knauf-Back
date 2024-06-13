-- CreateEnum
CREATE TYPE "Status" AS ENUM ('approved', 'notApproved', 'pending');

-- CreateTable
CREATE TABLE "Forum" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "coments" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT E'pending',
    "usersId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "language" "Language" NOT NULL DEFAULT E'portuguese',

    CONSTRAINT "Forum_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Forum" ADD CONSTRAINT "Forum_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forum" ADD CONSTRAINT "Forum_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
