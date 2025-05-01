/*
  Warnings:

  - You are about to drop the column `reviewId` on the `comments` table. All the data in the column will be lost.
  - Added the required column `videoId` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_reviewId_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "reviewId",
ADD COLUMN     "videoId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
