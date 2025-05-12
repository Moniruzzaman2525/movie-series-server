import { ReviewStatus } from "@prisma/client";
import prisma from "../../../helpers/prisma";

const getAllTags = async () => {
    const result = await prisma.tag.findMany();
    return result
}

const createTag = async (payload: any) => {
    const result = await prisma.tag.createMany({
        data: payload.tags,
        skipDuplicates: true
    });
    return result
}


const assignTagsToReview = async (payload: any) => {
   const video = await prisma.video.findFirstOrThrow({
       where: {
           id: payload.videoId
       }
   });

    const data = payload.tagId.map((tagId: string) => ({ videoId: video.id, tagId }));

    const result = await prisma.videoTag.createMany({
        data,
        skipDuplicates: true
    })

    return result

}

export const TagServices = {
    getAllTags,
    createTag,
    assignTagsToReview
}
