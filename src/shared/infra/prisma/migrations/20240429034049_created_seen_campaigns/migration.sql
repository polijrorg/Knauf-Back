-- AlterTable
ALTER TABLE "Campaigns" ADD COLUMN     "score" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "SeenCampaigns" (
    "id" TEXT NOT NULL,
    "seen" BOOLEAN NOT NULL DEFAULT false,
    "campaignsId" TEXT NOT NULL,

    CONSTRAINT "SeenCampaigns_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SeenCampaigns" ADD CONSTRAINT "SeenCampaigns_campaignsId_fkey" FOREIGN KEY ("campaignsId") REFERENCES "Campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
