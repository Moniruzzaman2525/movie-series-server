/*
  Warnings:

  - You are about to drop the column `isApproved` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `isApproved` on the `reviews` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "CommentStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "isApproved",
ADD COLUMN     "status" "CommentStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "isApproved",
ADD COLUMN     "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING';
