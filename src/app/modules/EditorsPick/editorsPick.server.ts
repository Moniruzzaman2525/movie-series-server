import prisma from "../../../helpers/prisma"


const createEditorPick = async (payload: any) => {

    console.log(payload)
    await prisma.video.findFirstOrThrow({
        where: {
            id: payload.videoId
        }
    })
    const result = await prisma.editorsPick.create({
        data: {
            videoId: payload.videoId
        }
    })
    return result

}

export const EditorsPickServer = {
    createEditorPick
}
