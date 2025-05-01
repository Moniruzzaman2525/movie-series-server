/*
  Warnings:

  - Added the required column `category` to the `video` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `genre` on the `video` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('MOVIE', 'SERIES');

-- CreateEnum
CREATE TYPE "GenreOption" AS ENUM ('ACTION', 'ADVENTURE', 'ANIMATION', 'COMEDY', 'DRAMA', 'HORROR', 'MYSTERY', 'ROMANCE', 'SCIENCE_FICTION', 'THRILLER', 'FANTASY', 'DOCUMENTARY', 'CRIME', 'HISTORICAL', 'MUSIC', 'WAR', 'WESTERN', 'FAMILY', 'BIOGRAPHY', 'SPORT', 'MUSICAL', 'SUPERHERO', 'PSYCHOLOGICAL', 'SLICE_OF_LIFE', 'TRAGEDY', 'POLITICAL', 'SATIRE');

-- AlterTable
ALTER TABLE "video" ADD COLUMN     "category" "Category" NOT NULL,
DROP COLUMN "genre",
ADD COLUMN     "genre" "GenreOption" NOT NULL;
