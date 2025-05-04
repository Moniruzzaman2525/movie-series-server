import httpStatus from 'http-status';
import { uploadToCloudinary } from '../../../utils';
import { Prisma, PrismaClient } from '@prisma/client';

import { calculatePagination} from './content.constans';
import { SearchParams, TPaginationOptions } from './content.interface';
import ApiError from '../../errors/apiError';

const prisma = new PrismaClient();

const createContent = async (req: any) => {
  try {
    const file = req.file;
    const user = req.user
    if (file) {
      const uploadImage = await uploadToCloudinary(file);
      req.body.thumbnailImage = uploadImage.secure_url;
    }

    console.log(req.body)
    const content = await prisma.video.create({
      data: {
        ...req.body,
        userId: user.id
      },
    });
    return content;
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, (err as Error).message);
  }
};

const getAllContent = async (params: SearchParams, options: TPaginationOptions) => {
  try {
    console.log("Search Params:", params);

    const { searchTerm, ...exactMatchFields } = params;
    const { page, limit, sortBy, sortOrder, skip } = calculatePagination(options);

    const conditions: Prisma.VideoWhereInput[] = [];

    //  Ensure searchAble field valid and defined
    const searchableFields: (keyof Prisma.VideoWhereInput)[] = ['title', 'description',
      'director','cast'
    ];

    //* jodi searchTerm and SearchAble field ar value valid hoy thaole ata execute hobe
    if (searchTerm && searchableFields.length > 0) {
      conditions.push({
        OR: searchableFields.map((field) => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
      });
    }

    const numberFields = ['releaseYear', 'views'];
    //*  Exact match fields
    if (Object.keys(exactMatchFields).length > 0) {
      conditions.push({
        AND: Object.entries(exactMatchFields).map(([key, value]) => {
          const isNumberField = numberFields.includes(key);
          if (Array.isArray(value)) {
            return {
              [key]: {
                in: isNumberField ? value.map(Number) : value,
              },
            };
          }
      
          return {
            [key]: {
              equals: isNumberField ? Number(value) : value,
            },
          };
        }),
      });
    }

    const whereConditions: Prisma.VideoWhereInput = conditions.length > 0 ? { AND: conditions } : {};

    const validSortFields = ['createdAt', 'title']; 
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';

    // Final query
    const result = await prisma.video.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: {
        [sortField]: sortOrder === 'asc' ? 'asc' : 'desc',
      },
      include: {
        Comment: {
          where: {
            status: {
              in: ['APPROVED'],
            },
          },
        },
        review: {
          where: {
            status: {
              in: ['APPROVED'],
            },
          },
        },
        VideoTag: {
          select: {
            tag: true,
          },
        },
      },
    });

    const total = await prisma.video.count({
      where: whereConditions,
    });

    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  } catch (err) {
    console.error("Prisma Error:", err);
    const error = err instanceof Error ? err : new Error('Database operation failed');
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};




//* update content

const updateContent = async (id: string, req: any) => {
  const file = req.file;

  if (file) {
    const uploadImage = await uploadToCloudinary(file);
    req.body.thumbnailImage = uploadImage.secure_url;
  }
  try {
    const isExist = await prisma.video.findUnique({
      where: { id },
    });
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Content not found');
    }
    const content = await prisma.video.update({
      where: { id },
      data: req.body,
    });
    return content;
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, (err as Error).message);
  }
};

const getContentById = async (id: string) => {
  try {
    const isExist = await prisma.video.findUnique({
      where: { id },
    });
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Content not found');
    }
    const content = await prisma.video.findUnique({
      where: { id },
      include: {
        Comment: {
          where: {
            status: {
              in: ['APPROVED']
            }
          }
        },
        review: {
          where: {
            status: {
              in: ['APPROVED']
            }
          }
        },
        VideoTag: {
          select: {
            tag: true
          }
        }
      }
    });
    return content;
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, (err as Error).message);
  }
};

const deleteContent = async (id: string) => {
  try {
    const isExist = await prisma.video.findUnique({
      where: { id },
    });
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Content not found');
    }
    const content = await prisma.video.delete({
      where: { id },
    });
    return content;
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, (err as Error).message);
  }
};

const contentGetCategory = async () => {
  try {
    const content = await prisma.video.findMany({
      where: {
        category: {
          equals: "SERIES",
          // mode:"insensitive"
        }
      }
    });

    return content;
  } catch (err) {
    console.log(err);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to fetch videos by category'
    );
  }
};

export const contentService = {
  createContent,
  getAllContent,
  updateContent,
  deleteContent,
  getContentById,
  contentGetCategory,
};
