-- CreateTable
CREATE TABLE "ModuleGrades" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "grade" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "ModuleGrades_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ModuleGrades" ADD CONSTRAINT "ModuleGrades_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleGrades" ADD CONSTRAINT "ModuleGrades_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
