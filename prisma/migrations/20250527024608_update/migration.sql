/*
  Warnings:

  - Changed the type of `streamingPlatform` on the `video` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StreamingPlatform" AS ENUM ('NETFLIX', 'DISNEY', 'HBO', 'AMAZON', 'APPLE', 'YOUTUBE', 'SPOTIFY');

-- AlterTable
ALTER TABLE "video" DROP COLUMN "streamingPlatform",
ADD COLUMN     "streamingPlatform" "StreamingPlatform" NOT NULL;

-- DropEnum
DROP TYPE "StreamingPlatformEnum";
