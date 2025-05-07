-- CreateTable
CREATE TABLE "editors_pick" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "editors_pick_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "editors_pick_videoId_key" ON "editors_pick"("videoId");

-- AddForeignKey
ALTER TABLE "editors_pick" ADD CONSTRAINT "editors_pick_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
