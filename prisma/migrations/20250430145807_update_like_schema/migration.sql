-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_videoId_fkey";

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
